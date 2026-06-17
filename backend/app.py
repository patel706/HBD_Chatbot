import streamlit as st
import sqlite3
import os

from chat.state import init_state
from chat.router import detect_intent
from chat.login import login_ui
from chat.show import show_businesses
from chat.update import update_flow
from chat.ui import bot, user, next_prompt, business_card

from text_to_sql import generate_sql
from fast_result import fast_answer
from search_online import search_online_and_save

# -------------------------------------------------
# INIT
# -------------------------------------------------

init_state()

st.set_page_config(
    page_title="HBD Local Business AI",
    layout="wide"
)

st.title("🤖 HBD Local Business AI")

# -------------------------------------------------
# LOGIN
# -------------------------------------------------

if not st.session_state.authenticated:
    if login_ui():
        st.session_state.chat_history.append(
            bot(
                "✅ **Login successful!**\n\n"
                f"I found **{len(st.session_state.businesses)} business(es)** linked to your number.\n\n"
                + next_prompt()
            )
        )
    st.stop()

# -------------------------------------------------
# RENDER CHAT HISTORY
# -------------------------------------------------

for msg in st.session_state.chat_history:
    with st.chat_message(msg["role"]):
        st.markdown(msg["content"], unsafe_allow_html=True)

# -------------------------------------------------
# CHAT INPUT
# -------------------------------------------------

user_input = st.chat_input("Type here...")

if not user_input:
    st.stop()

# store user message
st.session_state.chat_history.append(user(user_input))

# -------------------------------------------------
# SUGGESTION FLOW (HIGHEST PRIORITY)
# -------------------------------------------------

if st.session_state.mode == "suggestions":
    idx = user_input.strip()

    if idx.isdigit():
        idx = int(idx) - 1
        suggestions = st.session_state.pending_suggestions

        if 0 <= idx < len(suggestions):
            field = suggestions[idx]["field"]

            if field in ["website", "category"]:
                st.session_state.mode = "update"
                st.session_state.update_field = field
                st.session_state.chat_history.append(
                    bot(f"✏️ Please enter the new **{field}**")
                )
                st.rerun()

    st.session_state.chat_history.append(
        bot("❌ Please choose a valid option from the suggestions above.")
    )
    st.rerun()

# -------------------------------------------------
# UPDATE FLOW
# -------------------------------------------------

if st.session_state.mode == "update":
    msg = update_flow(user_input)
    if msg:
        st.session_state.chat_history.append(msg)

    st.rerun()

# -------------------------------------------------
# INTENT DETECTION
# -------------------------------------------------

intent = detect_intent(user_input)

# -------------------------------------------------
# INTENT ROUTING
# -------------------------------------------------

if intent == "SHOW":
    show_businesses()

elif intent == "UPDATE":
    st.session_state.mode = "update"
    st.session_state.update_field = None
    st.session_state.chat_history.append(
        bot(
            "🛠️ **Update Business Details**\n\n"
            "1️⃣ Name\n"
            "2️⃣ Address\n"
            "3️⃣ Phone\n"
            "4️⃣ Website\n"
            "5️⃣ Category\n"
            "6️⃣ Area\n\n"
            "👉 Type **1–6**"
        )
    )

elif intent == "SEARCH":
    try:
        sql = generate_sql(user_input)

        conn = sqlite3.connect(os.path.join(os.path.dirname(os.path.abspath(__file__)), "google_map_data.db"))
        cur = conn.cursor()
        cur.execute(sql)

        rows = cur.fetchall()
        cols = [c[0] for c in cur.description]
        conn.close()

        if not rows:
            try:
                online_results = search_online_and_save(user_input)
            except Exception as e:
                st.session_state.chat_history.append(
                    bot(f"⚠️ Online search failed: {e}\n\n" + next_prompt())
                )
                st.rerun()

            if not online_results:
                st.session_state.chat_history.append(
                    bot("❌ No local or online results found.\n\n" + next_prompt())
                )
            else:
                reply = "🌐 **No local results found. Here’s what I found online:**\n\n"

                for r in online_results:
                    reply += business_card(r)

                reply +=  next_prompt()
                st.session_state.chat_history.append(bot(reply))
        else:
            reply = "## 🔍 Search Results\n\n"
            for r in rows:
                record = dict(zip(cols, r))
                reply += business_card(record)

            reply += "\n---\n" + next_prompt()
            st.session_state.chat_history.append(bot(reply))

    except Exception as e:
        st.session_state.chat_history.append(
            bot(f"⚠️ Search failed: {e}")
        )

elif intent == "GENERAL":
    answer = fast_answer(user_input)
    st.session_state.chat_history.append(
        bot(answer + "\n\n" + next_prompt())
    )

else:
    st.session_state.chat_history.append(
        bot("🤔 I didn’t quite get that.\n\n" + next_prompt())
    )

st.rerun()

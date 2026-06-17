import streamlit as st
from chat.ui import business_card, next_prompt, bot
from chat.suggestions import analyze_business

def show_businesses():
    business = st.session_state.businesses[0]

    reply = "## 🪪 Your Business\n\n"
    reply += business_card(business)

    suggestions = analyze_business(business)

    if suggestions:
        reply += "\n---\n### ⚠️ Suggestions to improve your business\n\n"

        for i, s in enumerate(suggestions, start=1):
            reply += (
                f"**{i}. {s['title']}**\n\n"
                f"{s['reason']}\n\n"
                f"👉 Type **{i}** to **{s['action']}**\n\n"
            )

        # 🔥 ENTER SUGGESTION MODE
        st.session_state.pending_suggestions = suggestions
        st.session_state.mode = "suggestions"

    else:
        # ✅ Only show menu if NO suggestions
        reply += "\n---\n" + next_prompt()

    st.session_state.chat_history.append(bot(reply))

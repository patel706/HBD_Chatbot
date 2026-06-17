import streamlit as st
from business_update import update_business
from business_by_phone import get_businesses_by_phone
from chat.ui import business_card, next_prompt, bot
from chat.suggestions import analyze_business

FIELDS = {
    "1": "name",
    "2": "address",
    "3": "phone_number",
    "4": "website",
    "5": "category",
    "6": "area",
}

def update_flow(user_input):
    # STEP 1: select field
    if not st.session_state.update_field:
        field = FIELDS.get(user_input.strip())

        if not field:
            return bot(
                "❌ Please choose a valid option:\n\n"
                "1️⃣ Name\n"
                "2️⃣ Address\n"
                "3️⃣ Phone\n"
                "4️⃣ Website\n"
                "5️⃣ Category\n"
                "6️⃣ Area"
            )

        st.session_state.update_field = field
        return bot(f"✏️ Please enter the new **{field.replace('_', ' ')}**")

    # STEP 2: save value
    update_business(
        st.session_state.businesses[0]["id"],
        {st.session_state.update_field: user_input}
    )

    # Refresh data
    st.session_state.businesses = get_businesses_by_phone(
        st.session_state.phone
    )
    business = st.session_state.businesses[0]

    # Reset state
    st.session_state.update_field = None
    st.session_state.mode = None

    # STEP 3: respond with updated business
    reply = "✅ **Update successful!**\n\n"
    reply += "## 🪪 Updated Business Details\n\n"
    reply += business_card(business)

    # STEP 4: re-analyze suggestions
    suggestions = analyze_business(business)
    if suggestions:
        reply += "\n---\n### ⚠️ Remaining suggestions\n\n"
        for i, s in enumerate(suggestions, start=1):
            reply += (
                f"**{i}. {s['title']}**\n\n"
                f"{s['reason']}\n\n"
                f"👉 Type **{i}** to **{s['action']}**\n\n"
            )
        st.session_state.pending_suggestions = suggestions
        st.session_state.mode = "suggestions"
    else:
        reply += "\n---\n" + next_prompt()

    return bot(reply)  # 🔥 ALWAYS RETURN

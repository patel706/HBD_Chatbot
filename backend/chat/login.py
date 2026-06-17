import streamlit as st
from business_by_phone import get_businesses_by_phone

def login_ui():
    st.subheader("📞 Login to continue")

    phone = st.text_input("Enter your phone number")

    if st.button("Continue"):
        phone = phone.strip()

        if len(phone) < 6:
            st.error("Invalid phone number")
            return False

        businesses = get_businesses_by_phone(phone)

        if not businesses:
            st.error("No businesses found")
            return False

        # ✅ LOGIN SUCCESS
        st.session_state.authenticated = True
        st.session_state.in_chat = True   # 🔥 ENTER CHATBOT
        st.session_state.phone = phone
        st.session_state.businesses = businesses

        return True

    return False

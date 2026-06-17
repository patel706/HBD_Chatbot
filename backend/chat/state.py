import streamlit as st

def init_state():
    defaults = {
        "authenticated": False,
        "in_chat": False,
        "phone": None,
        "businesses": [],
        "mode": None,
        "update_field": None,
        "chat_history": [],
        "pending_suggestions": []  # 🔥 NEW
    }

    for k, v in defaults.items():
        if k not in st.session_state:
            st.session_state[k] = v

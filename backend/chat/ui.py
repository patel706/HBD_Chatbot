import streamlit as st

def business_card(b):
    return f"""
<div style="background:#0b1220;border:1px solid #1e293b;
border-radius:14px;padding:16px;margin-bottom:14px;">
<h4>🏢 {b.get('name')}</h4>
<p>📍 {b.get('address')}</p>
<p>📞 <b>{b.get('phone_number')}</b></p>
<p>⭐ <b>{b.get('reviews_average')}</b>
 ({b.get('reviews_count')} reviews)</p>
<p>🌐 <a href="{b.get('website')}" target="_blank">
 {b.get('website') or 'N/A'}</a></p>
</div>
"""

def next_prompt():
    return (
        "### 🤖 What would you like to do next?\n\n"
        "1️⃣ **Show my businesses**\n"
        "2️⃣ **Update my business**\n\n"
        "💡 *You can also just type anything to search*\n"
        "_Example: best biryani in chirala_"
    )


def bot(msg):
    return {"role": "assistant", "content": msg}

def user(msg):
    return {"role": "user", "content": msg}

# bot_detector.py

import re

def is_bot(text: str) -> bool:
    if not text:
        return True

    text = text.strip()

    # ✅ Allow numeric commands like 1, 2, 3
    if text.isdigit() and len(text) <= 2:
        return False

    # ❌ Block scripts / injections
    suspicious_patterns = [
        r"<script",
        r"</script>",
        r"drop\s+table",
        r"delete\s+from",
        r"insert\s+into",
        r"update\s+.*\s+set",
        r"--",
        r";--",
        r";",
    ]

    for pattern in suspicious_patterns:
        if re.search(pattern, text, re.IGNORECASE):
            return True

    return False


if __name__ == "__main__":
    while True:
        text = input("Enter text: ")
        print("BOT" if is_bot(text) else "HUMAN")

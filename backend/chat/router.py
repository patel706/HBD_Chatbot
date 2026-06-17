from sql_detector import needs_sql

def detect_intent(text: str) -> str:
    t = text.strip().lower()

    # -------------------------------------------------
    # 1️⃣ STRICT NUMBER COMMANDS
    # -------------------------------------------------
    if t == "1":
        return "SHOW"
    if t == "2":
        return "UPDATE"

    # -------------------------------------------------
    # 4️⃣ SEARCH (DATABASE)
    # -------------------------------------------------
    if needs_sql(text):
        return "SEARCH"

    # -------------------------------------------------
    # 5️⃣ GENERAL KNOWLEDGE
    # -------------------------------------------------
    return "GENERAL"

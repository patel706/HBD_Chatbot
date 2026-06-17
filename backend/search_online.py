# search_online.py

import json
import pandas as pd
from typing import List, Dict

from llm_client import call_llm
from models import MODEL

EXCEL_FILE = "missing_data_from_db.xlsx"

REQUIRED_FIELDS = {
    "name": "",
    "address": "",
    "website": "",
    "phone_number": "",
    "reviews_count": 0,
    "reviews_average": 0.0,
    "category": "",
    # "subcategory": "",
    "city": "",
    "state": "",
    "area": ""
}


def _normalize_results(raw: List[Dict]) -> List[Dict]:
    normalized = []

    for item in raw:
        record = {}

        for field, default in REQUIRED_FIELDS.items():
            value = item.get(field, default)

            if field == "reviews_count":
                try:
                    value = int(value)
                except:
                    value = 0

            if field == "reviews_average":
                try:
                    value = float(value)
                except:
                    value = 0.0

            record[field] = value

        normalized.append(record)

    return normalized


def search_online_and_save(query: str) -> List[Dict]:
    if not query or not query.strip():
        raise ValueError("Search query cannot be empty")

    prompt = f"""
Return a STRICT JSON array of local businesses for: "{query}"

Each object must contain ONLY these fields:
name, address, website, phone_number, reviews_count, reviews_average, category, city, state, area

Rules:
- Be extremely concise.
- Output ONLY valid, strict JSON.
- No markdown formatting.
- Absolutely NO conversational text or explanations.
"""

    message = call_llm(
        messages=[{"role": "user", "content": prompt}],
        model=MODEL
    )

    content = message.get("content", "").strip()
    
    # Sanitize content: remove markdown code block markers if present
    if content.startswith("```"):
        # Remove first line if it starts with ``` (and potentially ```json)
        lines = content.splitlines()
        if len(lines) > 2:
            # Join all lines except the first and last
            content = "\n".join(lines[1:-1]).strip()
        else:
            # Handle single line ```content```
            content = content.replace("```json", "").replace("```", "").strip()

    try:
        raw_results = json.loads(content)
    except json.JSONDecodeError:
        print(f"DEBUG: Failed to parse JSON. Content was: {content[:100]}...")
        raise RuntimeError("LLM returned invalid JSON")

    if not isinstance(raw_results, list) or not raw_results:
        return []

    results = _normalize_results(raw_results)

    # ----- Save to Excel -----
    df = pd.DataFrame(results)

    try:
        existing = pd.read_excel(EXCEL_FILE)
        df = pd.concat([existing, df], ignore_index=True)
    except FileNotFoundError:
        pass

    df.to_excel(EXCEL_FILE, index=False)

    return results


# -------------------------------------------------
# STANDALONE TEST MODE
# -------------------------------------------------

if __name__ == "__main__":
    print("🔎 Testing search_online module\n")

    q = input("Enter search query: ").strip()

    results = search_online_and_save(q)

    if not results:
        print("❌ No results returned")
    else:
        print(f"✅ {len(results)} result(s):\n")
        for i, r in enumerate(results, 1):
            print(
                f"{i}. {r['name']} | {r['category']} | "
                f"{r['city']}, {r['state']}"
            )

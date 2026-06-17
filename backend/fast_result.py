import json
import joblib
import numpy as np
import os
from sklearn.metrics.pairwise import cosine_similarity

TFIDF_FILE = "tfidf_index.joblib"
MISSED_FAQ_FILE = "missed_faq.json"
SIMILARITY_THRESHOLD = 0.35

DEFAULT_ANSWER = "Sorry, I don't have an answer for that right now. Describe you'r question in detail"

tfidf_data = None

def load_tfidf():
    global tfidf_data
    if tfidf_data is None:
        if os.path.exists(TFIDF_FILE):
            try:
                tfidf_data = joblib.load(TFIDF_FILE)
            except Exception as e:
                print(f"ERROR: Failed to load TF-IDF index: {e}")
        else:
            print(f"WARNING: TF-IDF file {TFIDF_FILE} not found.")
    return tfidf_data


def save_missed_query(user_query: str):
    if os.path.exists(MISSED_FAQ_FILE):
        with open(MISSED_FAQ_FILE, "r", encoding="utf-8") as f:
            data = json.load(f)
    else:
        data = {"faqs": []}

    data["faqs"].append({
        "id": "missed_question",
        "patterns": [user_query],
        "tags": ["unanswered"],
        "answer": ""
    })

    with open(MISSED_FAQ_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2, ensure_ascii=False)


def search_tfidf(user_query: str):
    data = load_tfidf()
    if data is None:
        return None
        
    vectorizer = data["vectorizer"]
    tfidf_matrix = data["tfidf_matrix"]
    answers = data["answers"]

    query_vec = vectorizer.transform([user_query])
    similarities = cosine_similarity(query_vec, tfidf_matrix)[0]

    best_idx = np.argmax(similarities)
    best_score = similarities[best_idx]

    if best_score < SIMILARITY_THRESHOLD:
        return None

    return answers[best_idx]


def fast_answer(user_query: str) -> str:
    result = search_tfidf(user_query)

    if result:
        return result

    save_missed_query(user_query)
    return DEFAULT_ANSWER


if __name__ == "__main__":
    while True:
        q = input("\nAsk something: ").strip()
        if q.lower() == "exit":
            break
        print("ANSWER:", fast_answer(q))

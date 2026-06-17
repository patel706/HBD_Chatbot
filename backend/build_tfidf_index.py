# build_tfidf_index.py

import json
import joblib
from sklearn.feature_extraction.text import TfidfVectorizer

JSON_FILE = "faq.json"
INDEX_FILE = "tfidf_index.joblib"


def build_index():
    with open(JSON_FILE, "r", encoding="utf-8") as f:
        data = json.load(f)

    questions = []
    answers = []

    for faq in data["faqs"]:
        for pattern in faq["patterns"]:
            questions.append(pattern)
            answers.append(faq["answer"])

    vectorizer = TfidfVectorizer(
        lowercase=True,
        analyzer="char_wb",
        ngram_range=(3, 5)
    )

    tfidf_matrix = vectorizer.fit_transform(questions)

    index_data = {
        "vectorizer": vectorizer,
        "tfidf_matrix": tfidf_matrix,
        "questions": questions,
        "answers": answers
    }

    joblib.dump(index_data, INDEX_FILE)

    print("TF-IDF index built and saved using joblib.")


if __name__ == "__main__":
    build_index()

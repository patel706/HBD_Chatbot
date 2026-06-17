import sqlite3
import os
import sys

if sys.stdout.encoding != 'utf-8':
    sys.stdout.reconfigure(encoding='utf-8', errors='replace')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'google_map_data.db')

def create_chat_tables():
    if not os.path.exists(DB_PATH):
        print("[ERROR] Database not found at " + DB_PATH)
        return

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    cur.execute("PRAGMA foreign_keys = ON")

    print("Creating chat_sessions table...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS chat_sessions (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        title TEXT DEFAULT 'New Chat',
        created_at TEXT DEFAULT (datetime('now')),
        updated_at TEXT DEFAULT (datetime('now'))
    )
    """)

    print("Creating chat_messages table...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        session_id TEXT NOT NULL,
        role TEXT NOT NULL,
        content TEXT NOT NULL,
        timestamp TEXT DEFAULT (datetime('now')),
        FOREIGN KEY(session_id) REFERENCES chat_sessions(id)
    )
    """)

    cur.execute("CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON chat_sessions(user_id)")
    cur.execute("CREATE INDEX IF NOT EXISTS idx_messages_session_id ON chat_messages(session_id)")

    conn.commit()
    conn.close()
    print("[OK] Chat tables created successfully in " + DB_PATH)

if __name__ == "__main__":
    create_chat_tables()

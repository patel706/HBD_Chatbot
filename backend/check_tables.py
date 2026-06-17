import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "google_map_data.db")

conn = sqlite3.connect(DB_PATH)
cur = conn.cursor()

# List all tables
cur.execute("SELECT name FROM sqlite_master WHERE type='table'")
tables = [r[0] for r in cur.fetchall()]
print(f"Tables: {tables}")

for t in tables:
    if t == 'sqlite_sequence':
        continue
    cur.execute(f"SELECT COUNT(*) FROM {t}")
    count = cur.fetchone()[0]
    print(f"  {t}: {count} rows")

conn.close()

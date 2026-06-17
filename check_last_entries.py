import sqlite3
import os

db_path = "backend/google_map_data.db"
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, email FROM google_maps_listings ORDER BY id DESC LIMIT 5")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    conn.close()
else:
    print("Database not found")

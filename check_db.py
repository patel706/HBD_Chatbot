import sqlite3
import os

db_path = "backend/google_map_data.db"
if os.path.exists(db_path):
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    cursor.execute("PRAGMA table_info(google_maps_listings)")
    columns = cursor.fetchall()
    for col in columns:
        print(col)
    conn.close()
else:
    print("Database not found")

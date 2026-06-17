import sqlite3
import os
DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "google_map_data.db")
conn = sqlite3.connect(DB)
cursor = conn.cursor()
cursor.execute("SELECT sql FROM sqlite_master WHERE type='table' AND name='google_maps_listings';")
row = cursor.fetchone()
if row:
    print(row[0])
conn.close()

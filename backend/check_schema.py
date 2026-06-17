import sqlite3
import os
DB = os.path.join(os.path.dirname(os.path.abspath(__file__)), "google_map_data.db")
conn = sqlite3.connect(DB)
cursor = conn.cursor()
cursor.execute('PRAGMA table_info(google_maps_listings)')
cols = cursor.fetchall()
for c in cols:
    print(c)
conn.close()

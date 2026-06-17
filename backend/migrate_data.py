import csv
import sqlite3
import os

CSV_PATH = 'backend/g_map_master_table_sample.csv'
DB_PATH = 'backend/google_map_data.db'

def migrate():
    print(f"📦 Starting migration from {CSV_PATH} to {DB_PATH}")
    
    # Remove existing if any
    if os.path.exists(DB_PATH):
        os.remove(DB_PATH)
        
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    # Create Table Schema (matches CSV header)
    cur.execute("""
    CREATE TABLE google_maps_listings (
        id INTEGER PRIMARY KEY,
        name TEXT,
        address TEXT,
        website TEXT,
        phone_number TEXT,
        reviews_count INTEGER,
        reviews_average REAL,
        category TEXT,
        subcategory TEXT,
        city TEXT,
        state TEXT,
        area TEXT,
        created_at TEXT
    )
    """)
    
    with open(CSV_PATH, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        count = 0
        for row in reader:
            cur.execute("""
            INSERT INTO google_maps_listings (
                id, name, address, website, phone_number, reviews_count, reviews_average, category, subcategory, city, state, area, created_at
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            """, (
                row['id'],
                row['name'],
                row['address'],
                row['website'],
                row['phone_number'],
                row['reviews_count'],
                row['reviews_avg'], # Map 'reviews_avg' from CSV to 'reviews_average' in DB
                row['category'],
                row['subcategory'],
                row['city'],
                row['state'],
                row['area'],
                row['created_at']
            ))
            count += 1
            
    conn.commit()
    conn.close()
    print(f"✅ Migration successful! Imported {count} listings into google_map_data.db")

if __name__ == "__main__":
    migrate()

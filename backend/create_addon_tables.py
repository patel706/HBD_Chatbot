import sqlite3
import os

# Robust path handling
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DB_PATH = os.path.join(BASE_DIR, 'google_map_data.db')

def create_tables():
    if not os.path.exists(DB_PATH):
        print(f"❌ Database not found at {DB_PATH}")
        return

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    print("🛠️ Creating products table...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        business_id INTEGER,
        name TEXT,
        price REAL,
        description TEXT,
        category TEXT,
        image_url TEXT,
        created_at TEXT,
        FOREIGN KEY(business_id) REFERENCES google_maps_listings(id)
    )
    """)
    
    print("🛠️ Creating deals table...")
    cur.execute("""
    CREATE TABLE IF NOT EXISTS deals (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        business_id INTEGER,
        title TEXT,
        discount_pct INTEGER,
        expiry_date TEXT,
        description TEXT,
        created_at TEXT,
        FOREIGN KEY(business_id) REFERENCES google_maps_listings(id)
    )
    """)
    
    conn.commit()
    conn.close()
    print(f"✅ Add-on tables created successfully in {DB_PATH}")

if __name__ == "__main__":
    create_tables()

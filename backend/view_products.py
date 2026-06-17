import sqlite3
import os

DB_PATH = r'D:\Honeybee digital\frontend 4\frontend 4\backend\google_map_data.db'

def show_products():
    print(f"📊 Accessing: {DB_PATH}")
    if not os.path.exists(DB_PATH):
        print("❌ Database File Not Found!")
        return

    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    # 1. Structure
    cur.execute("PRAGMA table_info(products)")
    columns = cur.fetchall()
    print("\n--- TABLE STRUCTURE: products ---")
    print(f"{'ID':<4} | {'NAME':<15} | {'TYPE':<10} | {'NOTNULL':<8}")
    print("-" * 45)
    for c in columns:
        print(f"{c[0]:<4} | {c[1]:<15} | {c[2]:<10} | {c[3]:<8}")

    # 2. Data
    cur.execute("SELECT * FROM products ORDER BY id DESC LIMIT 5")
    rows = cur.fetchall()
    print("\n--- LATEST ENTRIES (Sample) ---")
    if not rows:
        print("(No products added yet!)")
    else:
        for r in rows:
            print(r)
            
    conn.close()

if __name__ == "__main__":
    show_products()

import sqlite3

DB_PATH = 'backend/google_map_data.db'

def inspect():
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()
    
    cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
    tables = [r[0] for r in cur.fetchall()]
    
    for table in tables:
        if table == 'sqlite_sequence': continue
        print(f"\nTABLE: {table}")
        cur.execute(f"PRAGMA table_info({table})")
        cols = [f"{c[1]} ({c[2]})" for c in cur.fetchall()]
        print(f"Columns: {', '.join(cols)}")
        
        print(f"SAMPLE (5 rows):")
        cur.execute(f"SELECT * FROM {table} LIMIT 5")
        for row in cur.fetchall():
            print(row)

    conn.close()

if __name__ == "__main__":
    inspect()

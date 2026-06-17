import sqlite3

def list_tables():
    try:
        conn = sqlite3.connect('google_map_data.db')
        cursor = conn.cursor()
        cursor.execute("SELECT name FROM sqlite_master WHERE type='table';")
        tables = cursor.fetchall()
        for table in tables:
            print(f"Table Found: {table[0]}")
            cursor.execute(f"PRAGMA table_info({table[0]})")
            columns = cursor.fetchall()
            for col in columns:
                print(f"  Column: {col[1]} ({col[2]})")
        conn.close()
    except Exception as e:
        print(f"Error: {e}")

if __name__ == '__main__':
    list_tables()

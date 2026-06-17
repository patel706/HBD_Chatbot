# business_update.py

import sqlite3
import os

ALLOWED_FIELDS = [
    "name",
    "address",
    "phone_number",
    "website",
    "category",
    "subcategory",
    "area",
    "city",
    "state"
]

def update_business(business_id: int, updates: dict):
    updates = {k: v for k, v in updates.items() if k in ALLOWED_FIELDS}

    if not updates:
        return False

    fields = []
    values = []

    for k, v in updates.items():
        fields.append(f"{k} = ?")
        values.append(v)

    values.append(business_id)

    query = f"""
        UPDATE google_maps_listings
        SET {', '.join(fields)}
        WHERE id = ?
    """

    DB_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "google_map_data.db")
    CSV_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), "g_map_master_table_sample.csv")
    
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute(query, values)
    conn.commit()
    conn.close()

    # --- Sync to CSV ---
    try:
        import csv
        rows = []
        updated_csv = False
        if os.path.exists(CSV_PATH):
            with open(CSV_PATH, 'r', encoding='utf-8', newline='') as f:
                reader = list(csv.reader(f))
                if not reader: return True
                header = reader[0]
                rows.append(header)
                
                # Map header indices
                col_map = {col: i for i, col in enumerate(header)}
                
                for row in reader[1:]:
                    if not row: continue
                    if str(row[0]) == str(business_id):
                        # Update fields
                        for k, v in updates.items():
                            csv_key = k
                            if k == "phone_number": csv_key = "phone_number" # already matches
                            if csv_key in col_map:
                                row[col_map[csv_key]] = v
                        updated_csv = True
                    rows.append(row)
            
            if updated_csv:
                with open(CSV_PATH, 'w', encoding='utf-8', newline='') as f:
                    writer = csv.writer(f)
                    writer.writerows(rows)
    except Exception as e:
        print(f"CSV Update Sync Error: {e}")

    return True

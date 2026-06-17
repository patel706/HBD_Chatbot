# business_by_phone.py

import sqlite3
import csv
import os
import re

def normalize_phone(phone: str) -> str:
    # Only numeric
    p = re.sub(r'\D', '', phone)
    # Remove +91, "0 from starting", etc
    if p.startswith('91') and len(p) == 12:
        p = p[2:]
    elif p.startswith('0') and len(p) == 11:
        p = p[1:]
    return p

def get_businesses_by_phone(phone: str):
    search_phone = normalize_phone(phone)
    if len(search_phone) != 10:
        raise ValueError("Invalid phone number")

    db_path = os.path.join(os.path.dirname(__file__), "google_map_data.db")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Step 2: Search in business.db
    cursor.execute(
        """
        SELECT 
            id, name, address, phone_number, reviews_average, reviews_count,
            category, subcategory, website, area, city, state, email
        FROM google_maps_listings
        WHERE REPLACE(phone_number, ' ', '') LIKE ?
        LIMIT 1
        """,
        (f"%{search_phone}%",)
    )

    row = cursor.fetchone()
    columns = [desc[0] for desc in cursor.description]

    if row:
        businesses = [dict(zip(columns, row))]
        conn.close()
        return businesses

    businesses = []
    
    # Step 3: Check CSV
    csv_file_path = os.path.join(os.path.dirname(__file__), "g_map_master_table_sample.csv")
    if os.path.exists(csv_file_path):
        found_row = None
        with open(csv_file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                row_phone = str(row.get("phone_number", ""))
                norm_row_phone = normalize_phone(row_phone)
                
                if search_phone and search_phone in norm_row_phone:
                    found_row = row
                    break
        
        # Step 4: If Found in CSV -> Insert into DB
        if found_row:
            try:
                cursor.execute(
                    """
                    INSERT INTO google_maps_listings (
                        id, name, address, website, phone_number,
                        reviews_count, reviews_average, category, 
                        subcategory, city, state, area, created_at, email
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        found_row.get("id") or None,
                        found_row.get("name"),
                        found_row.get("address"),
                        found_row.get("website"),
                        found_row.get("phone_number"), 
                        int(found_row.get("reviews_count") or 0),
                        float(found_row.get("reviews_average") or 0.0),
                        found_row.get("category"),
                        found_row.get("subcategory"),
                        found_row.get("city"),
                        found_row.get("state"),
                        found_row.get("area"),
                        found_row.get("created_at"),
                        found_row.get("email")
                    )
                )
                conn.commit()
            except sqlite3.Error as e:
                print(f"Error inserting CSV record to DB: {e}")
                
            businesses.append({
                "id": found_row.get("id"),
                "name": found_row.get("name"),
                "address": found_row.get("address"),
                "phone_number": found_row.get("phone_number"),
                "reviews_average": float(found_row.get("reviews_average") or 0.0),
                "reviews_count": int(found_row.get("reviews_count") or 0),
                "category": found_row.get("category"),
                "subcategory": found_row.get("subcategory"),
                "website": found_row.get("website"),
                "area": found_row.get("area"),
                "city": found_row.get("city"),
                "state": found_row.get("state"),
                "email": found_row.get("email")
            })

    conn.close()
    
    # Step 5: If Phone Number Not Found
    if not businesses:
        raise ValueError("Phone number not registered")
        
    return businesses

def get_businesses_by_email(email: str):
    email = email.strip().lower()
    if not email or "@" not in email:
        raise ValueError("Invalid email address")

    db_path = os.path.join(os.path.dirname(__file__), "google_map_data.db")
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()

    # Search in DB
    cursor.execute(
        """
        SELECT 
            id, name, address, phone_number, reviews_average, reviews_count,
            category, subcategory, website, area, city, state, email
        FROM google_maps_listings
        WHERE LOWER(email) = ?
        LIMIT 1
        """,
        (email,)
    )

    row = cursor.fetchone()
    columns = [desc[0] for desc in cursor.description]

    if row:
        businesses = [dict(zip(columns, row))]
        conn.close()
        return businesses

    businesses = []
    
    # Check CSV
    csv_file_path = os.path.join(os.path.dirname(__file__), "g_map_master_table_sample.csv")
    if os.path.exists(csv_file_path):
        found_row = None
        with open(csv_file_path, mode='r', encoding='utf-8') as file:
            reader = csv.DictReader(file)
            for row in reader:
                row_email = str(row.get("email", "")).strip().lower()
                if email == row_email:
                    found_row = row
                    break
        
        # If Found in CSV -> Insert into DB
        if found_row:
            try:
                cursor.execute(
                    """
                    INSERT INTO google_maps_listings (
                        id, name, address, website, phone_number,
                        reviews_count, reviews_average, category, 
                        subcategory, city, state, area, created_at, email
                    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    """,
                    (
                        found_row.get("id") or None,
                        found_row.get("name"),
                        found_row.get("address"),
                        found_row.get("website"),
                        found_row.get("phone_number"), 
                        int(found_row.get("reviews_count") or 0),
                        float(found_row.get("reviews_average") or 0.0),
                        found_row.get("category"),
                        found_row.get("subcategory"),
                        found_row.get("city"),
                        found_row.get("state"),
                        found_row.get("area"),
                        found_row.get("created_at"),
                        found_row.get("email")
                    )
                )
                conn.commit()
            except sqlite3.Error as e:
                print(f"Error inserting CSV record to DB by email: {e}")
                
            businesses.append({
                "id": found_row.get("id"),
                "name": found_row.get("name"),
                "address": found_row.get("address"),
                "phone_number": found_row.get("phone_number"),
                "reviews_average": float(found_row.get("reviews_average") or 0.0),
                "reviews_count": int(found_row.get("reviews_count") or 0),
                "category": found_row.get("category"),
                "subcategory": found_row.get("subcategory"),
                "website": found_row.get("website"),
                "area": found_row.get("area"),
                "city": found_row.get("city"),
                "state": found_row.get("state"),
                "email": found_row.get("email")
            })

    conn.close()
    
    if not businesses:
        raise ValueError("Email not registered")
        
    return businesses

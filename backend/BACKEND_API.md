# HBD Local Business AI - Backend API

## Status: ✅ Ready for Frontend Integration

Backend is now running and ready to accept requests from the frontend application.

---

## Quick Start

### Start the Backend Server

```bash
cd backend
.\.venv\Scripts\python.exe -m uvicorn api:app --host 127.0.0.1 --port 5000
```

The server will start on `http://127.0.0.1:5000`

---

## API Endpoints

### Health Check Endpoints

#### **GET /health**
Simple health check endpoint.

**Response:**
```json
{"status": "ok"}
```

---

#### **GET /ready**
Readiness check with database connection verification.

**Response:**
```json
{"status": "ready"}
```

---

### Business Lookup Endpoints

#### **POST /api/login**
Authenticate user by phone number and retrieve associated businesses.

**Request:**
```json
{
  "phone": "555-1234"
}
```

**Response:**
```json
{
  "authenticated": true,
  "phone": "555-1234",
  "businesses": [
    {
      "id": 20,
      "name": "ASE Technologies",
      "address": "LIG-A85, SBI side lane...",
      "phone_number": "087126 55512",
      "reviews_average": 4.6,
      "reviews_count": 0,
      "category": "SEO Services",
      "subcategory": null,
      "website": "https://asetechnologies.in/",
      "area": "LIG-A85"
    }
  ]
}
```

---

#### **POST /api/search**
Search for businesses by natural language query.

**Request:**
```json
{
  "query": "restaurants near downtown"
}
```

**Response:**
```json
{
  "source": "local",
  "results": [
    {
      "id": 14697,
      "name": "Anjappar Chettinad Restaurant",
      "address": "131/10, GNT Road...",
      "category": "Pizza Places",
      "subcategory": "South Asian",
      "reviews_average": 3.7,
      "reviews_count": 2344
    }
  ]
}
```

---

#### **POST /api/update**
Update business information.

**Request:**
```json
{
  "business_id": 20,
  "field": "website",
  "value": "https://newasetechnologies.com"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Updated website"
}
```

---

#### **GET /api/businesses/{business_id}**
Get detailed information about a specific business.

**Response:**
```json
{
  "id": 20,
  "name": "ASE Technologies",
  "address": "LIG-A85, SBI side lane...",
  "phone_number": "087126 55512",
  "category": "SEO Services",
  "website": "https://asetechnologies.in/",
  "area": "LIG-A85"
}
```

---

## CORS Configuration

The backend is configured to accept requests from:
- `http://localhost:3000`
- `http://127.0.0.1:3000`

Modify `FRONTEND_ORIGIN` in `.env` to change this.

---

## Environment Variables

See `.env` file for current configuration:
- `PORT` - Server port (default: 5000)
- `FRONTEND_ORIGIN` - Frontend URL for CORS (default: http://localhost:3000)
- `DATABASE_URL` - Path to SQLite database (default: businesses.db)

---

## Database

The backend uses SQLite with the following main table:
- `google_maps_listings` - Contains business information indexed by phone number

---

## Error Handling

All endpoints return proper HTTP status codes:
- `200 OK` - Success
- `400 Bad Request` - Invalid input
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error
- `503 Service Unavailable` - Database connection issue

---

## Frontend Integration Example

```javascript
// Login with phone number
async function loginUser(phone) {
  const response = await fetch('http://127.0.0.1:5000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone })
  });
  return response.json();
}

// Check server health
async function checkHealth() {
  const response = await fetch('http://127.0.0.1:5000/health');
  return response.json();
}

// Search businesses
async function searchBusinesses(query) {
  const response = await fetch('http://127.0.0.1:5000/api/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query })
  });
  return response.json();
}
```

---

## Verified Working

✅ Server starts without errors  
✅ /health endpoint responds 200 OK  
✅ /ready endpoint confirms database connection  
✅ /api/login endpoint returns business data  
✅ CORS enabled for frontend origin  
✅ JSON response format standardized  

---

## Notes for Developers

1. The server uses FastAPI with Uvicorn ASGI server
2. All dependencies are installed in `.venv` virtual environment
3. Database queries are handled safely with parameterized SQL
4. Import errors in business logic modules are caught and reported
5. The `/ready` endpoint can be used for health monitoring

For more details, see `api.py` source code.

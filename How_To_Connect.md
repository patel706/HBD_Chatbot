Backend Integration Specification: CityHangAround Chatbot
Date: January 08, 2026 Frontend Stack: React (Vite) Backend Stack: Python (Flask/FastAPI) Protocol: REST API over HTTP (JSON)

1. CORS Configuration (Critical)
Since the frontend runs on localhost:5173 and the backend on localhost:5000, Cross-Origin Resource Sharing (CORS) must be enabled.

Flask Implementation:

Python

from flask_cors import CORS
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})
FastAPI Implementation:

Python

from fastapi.middleware.cors import CORSMiddleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
2. Authentication Endpoints (Phone Number Only)
The frontend no longer uses passwords. Authentication relies on phone number verification.

A. Login Endpoint
Route: POST /api/login

Request Body:

JSON

{
  "phone": "9876543210"
}
Logic: Check if the phone number exists in the users table.

Response (Success - 200 OK):

JSON

{
  "message": "Login successful",
  "user": {
    "id": 101,
    "name": "Shlok Thapa",
    "phone": "9876543210"
  }
}
Response (Failure - 401/404):

JSON

{ "message": "Phone number not found. Please register." }
B. Register Endpoint
Route: POST /api/register

Request Body:

JSON

{
  "phone": "9876543210",
  "name": "New User"
}
Logic: Create a new user entry.

Response: Same user object structure as Login.

3. Chat Logic & Suggestions Engine
This is the core logic to support the "Update My Business" suggestions flow.

Route: POST /chat

Request Payload
The frontend sends the user's message and their ID (if logged in) to allow context-aware responses (e.g., fetching their specific business data).

JSON

{
  "message": "Update my business",
  "user_id": 101  // Null if user is not logged in
}
Response Scenarios
Scenario A: Suggestions Response (New Feature)
Triggered when the user intends to update their business or improve their listing. The backend must analyze the business associated with user_id and return a list of missing fields.

Response Structure:

JSON

{
  "type": "suggestions",
  "content": [
    {
      "field": "website",
      "title": "Website is missing",
      "reason": "A website increases customer trust and helps your business rank higher on Google search.",
      "action": "Add website now"
    },
    {
      "field": "category",
      "title": "Category is missing",
      "reason": "Category helps customers find you when they search for services near them.",
      "action": "Add category"
    }
  ]
}
Note: If content is an empty array [], the frontend will display a "Great job, profile complete" message.

Scenario B: Standard Text Response
Used for general greetings or follow-up questions.

JSON

{
  "type": "text",
  "response": "Hello! I can help you manage your listing. Please login to continue."
}
Scenario C: Specific Field Update (Follow-up)
When a user clicks "Add website now" in the UI, the frontend sends:

Request: {"message": "Update website", "user_id": 101}

Expected Backend Action: Detect intent "Update" + Entity "website".

Response:

JSON

{
  "type": "text",
  "response": "Okay, please enter the new URL for your website:"
}
4. Database Schema Requirements (SQLAlchemy/Pydantic)
To support the suggestions logic (suggestions.py), the Business model must include checks for these fields.

Python Logic (for suggestions.py):

Python

def analyze_business(business_data):
    suggestions = []
    
    # 1. Check Website
    if not business_data.get('website'):
        suggestions.append({
            "field": "website",
            "title": "Website is missing",
            "reason": "A website increases customer trust and helps your business rank higher.",
            "action": "Add website now"
        })

    # 2. Check Reviews
    if business_data.get('reviews_count', 0) < 5:
        suggestions.append({
            "field": "reviews",
            "title": "Very few reviews",
            "reason": "Businesses with more reviews get more calls.",
            "action": "Get more reviews"
        })
        
    return suggestions
5. Summary of Frontend Events
Page Load: Chat widget opens. Footer buttons ("Search", "Update") are HIDDEN.

User Clicks Login: POST /api/login is called.

Login Success:

User ID is stored in React state.

Footer buttons ("Search", "Update") become VISIBLE.

User Clicks "Update My Business":

Frontend sends: POST /chat with body {"message": "Update my business", "user_id": 101}.

Backend fetches business data for User 101.

Backend runs analyze_business().

Backend returns JSON with type: "suggestions".

User Clicks "Add website now" (on suggestion card):

Frontend sends POST /chat with body {"message": "Update website", ...}.

Backend enters the specific update flow.
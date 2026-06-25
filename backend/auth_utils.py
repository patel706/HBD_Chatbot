import hashlib
import hmac
import base64
import json
import time
import os

JWT_SECRET = os.getenv("JWT_SECRET", "honeybee_digital_secret_key_987654321")

def hash_password(password: str) -> str:
    salt = "honeybee_digital_chatbot_salt_123"
    db_hash = hashlib.sha256((password + salt).encode('utf-8')).hexdigest()
    return db_hash

def verify_password(password: str, hashed: str) -> bool:
    return hash_password(password) == hashed

# Base64url helper functions
def base64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b'=').decode('utf-8')

def base64url_decode(data: str) -> bytes:
    padding = '=' * (4 - (len(data) % 4))
    return base64.urlsafe_b64decode(data + padding)

def generate_jwt_token(payload: dict, secret: str = JWT_SECRET, expires_in: int = 86400) -> str:
    header = {"alg": "HS256", "typ": "JWT"}
    
    # Add expiration time to payload
    payload_copy = payload.copy()
    payload_copy["exp"] = int(time.time()) + expires_in
    
    header_json = json.dumps(header, separators=(',', ':')).encode('utf-8')
    payload_json = json.dumps(payload_copy, separators=(',', ':')).encode('utf-8')
    
    header_b64 = base64url_encode(header_json)
    payload_b64 = base64url_encode(payload_json)
    
    signing_input = f"{header_b64}.{payload_b64}".encode('utf-8')
    signature = hmac.new(secret.encode('utf-8'), signing_input, hashlib.sha256).digest()
    signature_b64 = base64url_encode(signature)
    
    return f"{header_b64}.{payload_b64}.{signature_b64}"

def decode_jwt_token(token: str, secret: str = JWT_SECRET) -> dict:
    try:
        parts = token.split('.')
        if len(parts) != 3:
            return None
            
        header_b64, payload_b64, signature_b64 = parts
        
        # Verify signature
        signing_input = f"{header_b64}.{payload_b64}".encode('utf-8')
        expected_sig = hmac.new(secret.encode('utf-8'), signing_input, hashlib.sha256).digest()
        expected_sig_b64 = base64url_encode(expected_sig)
        
        if not hmac.compare_digest(signature_b64, expected_sig_b64):
            return None # Signature mismatch
            
        payload_json = base64url_decode(payload_b64)
        payload = json.loads(payload_json.decode('utf-8'))
        
        # Check expiration
        if "exp" in payload and payload["exp"] < int(time.time()):
            return None # Token expired
            
        return payload
    except Exception as e:
        print(f"Error decoding JWT token: {e}")
        return None

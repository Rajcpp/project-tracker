import bcrypt
from jose import jwt, JWTError
from fastapi import Depends
from fastapi.security import OAuth2PasswordBearer

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

secret_key = "bon"  # In production, use a secure method to store this key
algorithm = "HS256"

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    # print(f"Verifying password: {password} against hash: {hashed}")
    # print(f"Password bytes: {password.encode('utf-8')}, Hashed bytes: {hashed.encode('utf-8')}")
    # print(f"bcrypt check result: {bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))}")
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict) -> str:
    return jwt.encode(data, secret_key, algorithm=algorithm)

def get_current_user(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, secret_key, algorithms=[algorithm])
        user_id = payload.get("sub")
        return int(user_id)
    except JWTError:
        return None
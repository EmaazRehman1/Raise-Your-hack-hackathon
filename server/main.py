from contextlib import asynccontextmanager
from typing import Any, Dict, List, Optional
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import json
from sentence_transformers import SentenceTransformer, util
from embedder import load_and_chunk_text, embed_and_store
from retriever import retrieve_and_respond
# from config import TEXT_FILE_PATH
from mangum import Mangum
from dotenv import load_dotenv
import os
from mangum import Mangum

load_dotenv()
TEXT_FILE_PATH = os.getenv("TEXT_FILE_PATH")

# --- Lifespan for RAG Embedding ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("[Lifespan] Loading and chunking text...")
    chunks = load_and_chunk_text(TEXT_FILE_PATH)

    print("[Lifespan] Embedding and storing in Chroma...")
    embed_and_store(chunks)

    yield  # App is now running
    print("[Lifespan] Shutdown complete.")

# --- Initialize App ---
app = FastAPI(
    title="RAISE 2025 Unified API",
    lifespan=lifespan
)

# --- CORS Middleware ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://eventai-omega.vercel.app",
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- Constants ---
DATA_FILE = "users.json"

# --- Models ---
class QueryRequest(BaseModel):
    query: str

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    email: Optional[str] = None
    job_title: Optional[str] = None
    company: Optional[str] = None
    interests: Optional[List[str]] = None

# --- Utility Functions ---
def load_users(json_path: str = DATA_FILE) -> List[Dict[str, Any]]:
    try:
        with open(json_path, "r", encoding="utf-8") as f:
            return json.load(f)
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Users file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format in users file")

def save_users(users: List[Dict[str, Any]], json_path: str = DATA_FILE):
    try:
        with open(json_path, "w", encoding="utf-8") as f:
            json.dump(users, f, indent=2)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to write users file: {str(e)}")

def find_top_3_interest_matches(user_id: str, json_path: str = DATA_FILE, threshold: float = 0.6):
    model = SentenceTransformer("all-MiniLM-L6-v2")
    with open(json_path, "r") as f:
        users = json.load(f)

    target_user = next((u for u in users if u["id"] == user_id), None)
    if not target_user:
        raise ValueError(f"User with ID '{user_id}' not found.")
    
    target_interests = target_user.get("interests", [])
    if not target_interests:
        raise ValueError(f"User '{user_id}' has no interests.")

    target_embeddings = model.encode(target_interests, convert_to_tensor=True)
    matches = []

    for user in users:
        if user["id"] == user_id:
            continue

        other_interests = user.get("interests", [])
        if not other_interests:
            continue

        other_embeddings = model.encode(other_interests, convert_to_tensor=True)
        sim_matrix = util.pytorch_cos_sim(target_embeddings, other_embeddings)
        common_interests = set()

        for i, target_interest in enumerate(target_interests):
            for j, other_interest in enumerate(other_interests):
                if sim_matrix[i][j].item() >= threshold:
                    common_interests.add(other_interest)

        if not common_interests:
            continue

        target_mean = target_embeddings.mean(dim=0)
        other_mean = other_embeddings.mean(dim=0)
        similarity = util.pytorch_cos_sim(target_mean, other_mean).item()

        matches.append({
            "user_id": user["id"],
            "name": user["full_name"],
            "email": user.get("email", "N/A"),
            "job_title": user.get("job_title", "N/A"),
            "company": user.get("company", "N/A"),
            "score": round(similarity * 100, 2),
            "interests": list(common_interests)
        })

    return sorted(matches, key=lambda x: x["score"], reverse=True)[:3]

def recommend_sessions_for_default_user(threshold: float = 0.3):
    model = SentenceTransformer("all-MiniLM-L6-v2")

    users = load_users()
    sessions = json.load(open("sessions.json"))

    user = next((u for u in users if u["id"] == "user_001"), None)
    if not user:
        raise ValueError("User 'user_001' not found.")

    user_profile = " ".join(user.get("interests", [])) + " " + user.get("goals_objectives", "")
    user_embedding = model.encode([user_profile], convert_to_tensor=True)

    recommended = []

    for session in sessions:
        session_text = " ".join(session.get("tags", [])) + " " + session.get("description", "")
        session_embedding = model.encode([session_text], convert_to_tensor=True)
        similarity = util.pytorch_cos_sim(user_embedding, session_embedding).item()

        if similarity >= threshold:
            session["similarity_score"] = round(similarity * 100, 2)
            recommended.append(session)

    recommended.sort(key=lambda x: x["similarity_score"], reverse=True)
    return recommended

# --- Routes ---
@app.get("/")
def read_root():
    return {
        "message": "🚀 Unified RAISE 2025 API is running.",
        "endpoints": {
            "RAG Chatbot": "/chat/?q=your_question",
            "Profile Matching": "/match/user_id",
            "User Management": "/users",
            "Session Recommendations": "/recommendations",
            "Event Sessions": "/sessions",
            "Event Booths": "/booths"
        }
    }

@app.get("/chat/")
def chat(q: str = Query(..., description="Your question about the RAISE 2025 event")):
    answer = retrieve_and_respond(q)
    return JSONResponse(content={"question": q, "answer": answer})

@app.get("/match/{user_id}")
def get_matches(user_id: str):
    try:
        results = find_top_3_interest_matches(user_id)
        return {
            "user_id": user_id,
            "top_matches": results
        }
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/users", response_model=List[Dict[str, Any]])
def get_all_users():
    try:
        users = load_users()
        return users
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.put("/users/{user_id}")
def update_user(user_id: str, user_update: UserUpdate):
    users = load_users()
    for i, user in enumerate(users):
        if user["id"] == user_id:
            updated_user = {**user, **user_update.dict(exclude_unset=True)}
            users[i] = updated_user
            save_users(users)
            return {"message": "User updated", "user": updated_user}
    raise HTTPException(status_code=404, detail=f"User with ID '{user_id}' not found.")

@app.get("/user", response_model=Dict[str, Any])
def get_user_001():
    """Return only the user with ID 'user_001'."""
    users = load_users()
    user = next((u for u in users if u["id"] == "user_001"), None)

    if not user:
        raise HTTPException(status_code=404, detail="User 'user_001' not found.")
    return user

@app.get("/recommendations")
def get_recommendations():
    try:
        results = recommend_sessions_for_default_user(threshold=0.5)
        return {
            "user_id": "user_001",
            "recommended_sessions": results
        }
    except ValueError as ve:
        raise HTTPException(status_code=404, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/sessions", response_model=List[Dict[str, Any]])
def get_all_sessions():
    try:
        with open("sessions.json", "r", encoding="utf-8") as f:
            sessions = json.load(f)
        return sessions
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Sessions file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format in sessions file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

@app.get("/booths", response_model=List[Dict[str, Any]])
def get_all_booths():
    try:
        with open("booths.json", "r", encoding="utf-8") as f:
            booths = json.load(f)
        return booths
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Booths file not found")
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format in booths file")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")

# --- AWS Lambda Handler ---
handler = Mangum(app)
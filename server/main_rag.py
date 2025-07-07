

from fastapi import FastAPI, Query
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
from pydantic import BaseModel

from embedder import load_and_chunk_text, embed_and_store
from retriever import retrieve_and_respond
from config import TEXT_FILE_PATH

# --- Lifespan ---
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("[Lifespan] Loading and chunking text...")
    chunks = load_and_chunk_text(TEXT_FILE_PATH)

    print("[Lifespan] Embedding and storing in Chroma...")
    embed_and_store(chunks)

    yield  # App is now running

    print("[Lifespan] Shutdown complete.")

# --- App Init ---
app = FastAPI(title="RAISE 2025 RAG Chatbot", lifespan=lifespan)

class QueryRequest(BaseModel):
    query: str

@app.get("/")
def read_root():
    return {"message": "Welcome to the RAISE 2025 RAG Chatbot API!"}

@app.get("/chat/")
def chat(q: str = Query(..., description="Your question about the RAISE 2025 event")):
    answer = retrieve_and_respond(q)
    return JSONResponse(content={"question": q, "answer": answer})

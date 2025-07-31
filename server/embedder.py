# embedder.py

import re
import chromadb
from chromadb.config import Settings
from sentence_transformers import SentenceTransformer
# from config import EMBEDDING_MODEL_NAME, COLLECTION_NAME, CHROMA_DB_DIR
from dotenv import load_dotenv
import os

load_dotenv()

EMBEDDING_MODEL_NAME = os.getenv("EMBEDDING_MODEL_NAME")
COLLECTION_NAME = os.getenv("COLLECTION_NAME")
CHROMA_DB_DIR = os.getenv("CHROMA_DB_DIR")


def load_and_chunk_text(file_path, chunk_size=500):
    with open(file_path, "r", encoding="utf-8") as f:
        text = f.read()

    sentences = re.split(r'(?<=[.?!])\s+', text)
    chunks = []
    current_chunk = ""
    for sentence in sentences:
        if len(current_chunk) + len(sentence) <= chunk_size:
            current_chunk += " " + sentence
        else:
            chunks.append(current_chunk.strip())
            current_chunk = sentence
    if current_chunk:
        chunks.append(current_chunk.strip())

    return chunks

def embed_and_store(chunks):
    print("[Embedding] Loading model and encoding chunks...")
    model = SentenceTransformer(EMBEDDING_MODEL_NAME)

    chroma_client = chromadb.Client(Settings(persist_directory=CHROMA_DB_DIR))
    try:
        chroma_client.delete_collection(COLLECTION_NAME)
    except:
        pass
    collection = chroma_client.create_collection(name=COLLECTION_NAME)

    for idx, chunk in enumerate(chunks):
        embedding = model.encode(chunk).tolist()
        collection.add(
            documents=[chunk],
            embeddings=[embedding],
            ids=[f"doc_{idx}"]
        )

    print("[Embedding] Stored all chunks in ChromaDB.")

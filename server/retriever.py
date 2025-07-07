# retriever.py

import chromadb
from chromadb.config import Settings
from openai import OpenAI
from sentence_transformers import SentenceTransformer

from config import (
    EMBEDDING_MODEL_NAME,
    COLLECTION_NAME,
    CHROMA_DB_DIR,
    OPENROUTER_API_KEY,
    OPENROUTER_BASE_URL,
    DEEPSEEK_MODEL,
)

def retrieve_and_respond(query, top_k=3):
    print(f"[Query] Searching for: {query}")
    model = SentenceTransformer(EMBEDDING_MODEL_NAME)
    chroma_client = chromadb.Client(Settings(persist_directory=CHROMA_DB_DIR))
    collection = chroma_client.get_collection(COLLECTION_NAME)

    query_embedding = model.encode(query).tolist()
    results = collection.query(query_embeddings=[query_embedding], n_results=top_k)

    context = "\n".join(results["documents"][0])
    prompt = f"""You are a helpful assistant for a RAG chatbot about the RAISE 2025 Summit.

Context:
{context}

Question: {query}
Answer:"""

    client = OpenAI(
        api_key=OPENROUTER_API_KEY,
        base_url=OPENROUTER_BASE_URL,
    )

    response = client.chat.completions.create(
        model=DEEPSEEK_MODEL,
        messages=[
            {"role": "system", "content": "You are a helpful chatbot for RAISE 2025."},
            {"role": "user", "content": prompt},
        ],
    )

    return response.choices[0].message.content

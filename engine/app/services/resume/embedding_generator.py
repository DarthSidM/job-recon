from google import genai
from app.core.config import LLM_API_KEY, EMBEDDING_MODEL
client = genai.Client(api_key=LLM_API_KEY)

def generate_embedding(text: str):
    if not text.strip():
        raise ValueError("Cannot generate embedding for empty text.")

    result = client.models.embed_content(
        model=EMBEDDING_MODEL,
        contents=text,
    )

    return result.embeddings[0].values
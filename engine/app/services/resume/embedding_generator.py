from openai import OpenAI
from app.core.config import LLM_API_KEY, EMBEDDING_MODEL_BASE_URL, EMBEDDING_MODEL
client = OpenAI(
    base_url=EMBEDDING_MODEL_BASE_URL,
    api_key=LLM_API_KEY,
)

def generate_embedding(text: str):
    response = client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=text,
        dimensions=1560
    )

    return response.data[0].embedding
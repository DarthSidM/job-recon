from openai import OpenAI
from app.core.config import LLM_API_KEY, LLM_BASE_URL, EMBEDDING_MODEL
client = OpenAI(
    base_url=LLM_BASE_URL,
    api_key=LLM_API_KEY,
)

def embed(job_description: str):
    response = client.embeddings.create(
        model=EMBEDDING_MODEL,
        input=job_description,
        dimensions=1560
    )

    return response.data[0].embedding, EMBEDDING_MODEL


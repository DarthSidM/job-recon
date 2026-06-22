from openai import OpenAI
from app.core.config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL

client = OpenAI(
    base_url=LLM_BASE_URL,
    api_key=LLM_API_KEY
)

def parse_text(resume_text: str):
    model_name = LLM_MODEL
    prompt = f"parse this resume text into json and dont produce any other output the resume text: {resume_text}"
    try:
        response = client.chat.completions.create(
            model=model_name,
            messages=[
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            # stream=True,
            # OpenRouter ignores these if you're using Ollama, so they are safe to keep
            extra_headers={
                "HTTP-Referer": "https://localhost:3000",
                "X-Title": "Engine App",
            }
        )
        return response.choices[0].message.content

    except Exception as e:
        return f"Error interacting with the LLM ({model_name}): {str(e)}"
    



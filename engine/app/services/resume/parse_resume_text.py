from openai import OpenAI
from app.core.config import LLM_API_KEY, LLM_BASE_URL, LLM_MODEL

client = OpenAI(
    base_url=LLM_BASE_URL,
    api_key=LLM_API_KEY
)

def parse_text(resume_text: str):
    model_name = LLM_MODEL
    prompt = prompt = f"""
You are an information extraction engine.

Extract the resume information and return ONLY valid JSON.

IMPORTANT RULES:

1. Return ONLY JSON.
2. Do NOT include markdown.
3. Do NOT include explanations.
4. Do NOT create fields not defined in the schema.
5. Missing values should be null.
6. Dates must be returned in ISO format:
   YYYY-MM-DD

7. Work experience, internships, research internships,
   leadership roles and part-time jobs must ALL be placed
   inside resume_experience.

8. Projects must ALL be placed inside resume_projects.

9. Skills must be returned as a flat list of strings.

Return JSON matching EXACTLY this schema:

{{
  "resume_profile": {{
    "full_name": "",
    "email": "",
    "phone": "",
    "summary": ""
  }},

  "resume_education": [
    {{
      "institution": "",
      "degree": "",
      "start_date": "",
      "end_date": ""
    }}
  ],

  "resume_experience": [
    {{
      "company": "",
      "title": "",
      "start_date": "",
      "end_date": "",
      "description": ""
    }}
  ],

  "resume_projects": [
    {{
      "project_name": "",
      "description": ""
    }}
  ],

  "resume_skills": {{
    "skill_names": []
  }}
}}

Resume text:

{resume_text}

Return ONLY the JSON object.
"""
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
    



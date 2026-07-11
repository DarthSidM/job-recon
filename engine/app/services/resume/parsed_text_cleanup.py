import re
import json
def strip_thought_tags(raw_text: str) -> str:
    # This pattern matches <thought> followed by anything up to </thought>
    # re.I makes it case-insensitive, re.DOTALL ensures .* matches newlines
    clean_text = re.sub(r'<thought>.*?</thought>', '', raw_text, flags=re.DOTALL | re.I)
    
    return clean_text.strip()
def normalize_json(response: str) -> dict:
    response = response.strip()

    # Remove markdown code fences
    response = response.replace("```json", "")
    response = response.replace("```", "").strip()

    # Extract the first JSON object
    match = re.search(r"\{.*\}", response, re.DOTALL)

    if not match:
        raise ValueError("No JSON object found in LLM response.")
    
    return json.loads(match.group(0))
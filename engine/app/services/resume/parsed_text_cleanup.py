import re
def strip_thought_tags(raw_text: str) -> str:
    # This pattern matches <thought> followed by anything up to </thought>
    # re.I makes it case-insensitive, re.DOTALL ensures .* matches newlines
    clean_text = re.sub(r'<thought>.*?</thought>', '', raw_text, flags=re.DOTALL | re.I)
    
    return clean_text.strip()

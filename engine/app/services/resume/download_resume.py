import os
from pathlib import Path
import requests
from app.core import config


def resume_downloader(resume_url: str, resume_id: int):
    
    # Use the MEDIA_DIR defined in config to ensure a consistent location at project root
    media_dir = config.MEDIA_DIR
    media_dir.mkdir(parents=True, exist_ok=True)

    filepath = media_dir / f"{resume_id}.pdf"

    # Download the file
    response = requests.get(resume_url, timeout=30)
    response.raise_for_status()

    with open(filepath, "wb") as f:
        f.write(response.content)

    return str(filepath)


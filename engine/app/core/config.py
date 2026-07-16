from dotenv import load_dotenv
import os
from pathlib import Path

# Load .env from the engine/app folder
APP_ROOT = Path(__file__).resolve().parents[1]
load_dotenv(APP_ROOT / ".env")

DATABASE_URL = os.getenv("DATABASE_URL")
REDIS_URL = os.getenv("REDIS_URL")
REDIS_RESUME_BUILDER_HOST = os.getenv("REDIS_RESUME_BUILDER_HOST")
LLM_BASE_URL = os.getenv("LLM_BASE_URL")
LLM_API_KEY = os.getenv("LLM_API_KEY")
LLM_MODEL = os.getenv("LLM_MODEL")
EMBEDDING_MODEL = os.getenv("EMBEDDING_MODEL")
# Project root directory (engine folder)
PROJECT_ROOT: Path = Path(__file__).resolve().parents[2]

# Media directory location (project root /media)
MEDIA_DIR: Path = PROJECT_ROOT / "media"
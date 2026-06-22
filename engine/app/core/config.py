from dotenv import load_dotenv
import os
from pathlib import Path

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")
REDIS_URL = os.getenv("REDIS_URL")

# Project root directory (engine folder)
PROJECT_ROOT: Path = Path(__file__).resolve().parents[2]

# Media directory location (project root /media)
MEDIA_DIR: Path = PROJECT_ROOT / "media"
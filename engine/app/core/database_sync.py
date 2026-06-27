# database_sync.py

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import DATABASE_URL

SYNC_DATABASE_URL = DATABASE_URL.replace(
    "postgresql+asyncpg://",
    "postgresql+psycopg://"
)

engine = create_engine(
    SYNC_DATABASE_URL,
    connect_args={"sslmode": "require"},  # if your provider requires SSL
    pool_pre_ping=True
)

SessionLocal = sessionmaker(bind=engine)
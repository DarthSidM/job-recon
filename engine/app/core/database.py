from sqlalchemy.ext.asyncio import (
    create_async_engine,
    async_sessionmaker,
    AsyncSession
)
from sqlalchemy.orm import DeclarativeBase

from app.core.config import DATABASE_URL


class Base(DeclarativeBase):
    pass
engine = create_async_engine(
    DATABASE_URL,
    connect_args={"ssl": True},
    pool_pre_ping=True,
    pool_recycle=300,
    echo=True
)

AsyncSessionLocal = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False
)
# Using pgvector 0.4.2
from typing import Any, Optional, TYPE_CHECKING
import datetime

from pgvector.sqlalchemy.vector import VECTOR
from sqlalchemy import Boolean, DateTime, ForeignKeyConstraint, Index, Integer, PrimaryKeyConstraint, String, Text, text
from sqlalchemy.dialects.postgresql import JSONB, TIMESTAMP
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
if TYPE_CHECKING:
    from .resume import Resume
from app.core.database import Base


class ResumeEmbedding(Base):
    __tablename__ = 'ResumeEmbedding'
    __table_args__ = (
        ForeignKeyConstraint(['resume_id'], ['Resume.id'], ondelete='CASCADE', onupdate='CASCADE', name='ResumeEmbedding_resume_id_fkey'),
        PrimaryKeyConstraint('id', name='ResumeEmbedding_pkey')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    embedding_type: Mapped[str] = mapped_column(Text, nullable=False)
    embedding: Mapped[Any] = mapped_column(VECTOR, nullable=False)
    model_name: Mapped[str] = mapped_column(Text, nullable=False)
    resume_id: Mapped[int] = mapped_column(Integer, nullable=False)

    resume: Mapped['Resume'] = relationship('Resume', back_populates='ResumeEmbedding')
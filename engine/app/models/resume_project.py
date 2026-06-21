from typing import Optional, TYPE_CHECKING
import datetime

from sqlalchemy import Boolean, DateTime, ForeignKeyConstraint, Index, Integer, PrimaryKeyConstraint, String, Text, text
from sqlalchemy.dialects.postgresql import JSONB, TIMESTAMP
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
if TYPE_CHECKING:
    from .resume import Resume
from app.core.database import Base

class ResumeProject(Base):
    __tablename__ = 'ResumeProject'
    __table_args__ = (
        ForeignKeyConstraint(['resume_id'], ['Resume.id'], ondelete='CASCADE', onupdate='CASCADE', name='ResumeProject_resume_id_fkey'),
        PrimaryKeyConstraint('id', name='ResumeProject_pkey')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    project_name: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    resume_id: Mapped[int] = mapped_column(Integer, nullable=False)

    resume: Mapped['Resume'] = relationship('Resume', back_populates='ResumeProject')
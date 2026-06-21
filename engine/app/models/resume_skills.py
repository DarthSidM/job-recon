from typing import Optional, TYPE_CHECKING
import datetime

from sqlalchemy import Boolean, DateTime, ForeignKeyConstraint, Index, Integer, PrimaryKeyConstraint, String, Text, text
from sqlalchemy.dialects.postgresql import JSONB, TIMESTAMP
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.core.database import Base

if TYPE_CHECKING:
    from .resume import Resume



class ResumeSkills(Base):
    __tablename__ = 'ResumeSkills'
    __table_args__ = (
        ForeignKeyConstraint(['resume_id'], ['Resume.id'], ondelete='CASCADE', onupdate='CASCADE', name='ResumeSkills_resume_id_fkey'),
        PrimaryKeyConstraint('id', name='ResumeSkills_pkey')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    skill_names: Mapped[dict] = mapped_column(JSONB, nullable=False)
    resume_id: Mapped[int] = mapped_column(Integer, nullable=False)

    resume: Mapped['Resume'] = relationship('Resume', back_populates='ResumeSkills')
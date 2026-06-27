from typing import Optional, TYPE_CHECKING
import datetime

from sqlalchemy import Boolean, DateTime, ForeignKeyConstraint, Index, Integer, PrimaryKeyConstraint, String, Text, text
from sqlalchemy.dialects.postgresql import JSONB, TIMESTAMP
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
if TYPE_CHECKING:
    from .resume import Resume
from app.core.database import Base

class ResumeExperience(Base):
    __tablename__ = 'ResumeExperience'
    __table_args__ = (
        ForeignKeyConstraint(['resume_id'], ['Resume.id'], ondelete='CASCADE', onupdate='CASCADE', name='ResumeExperience_resume_id_fkey'),
        PrimaryKeyConstraint('id', name='ResumeExperience_pkey')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    company: Mapped[str] = mapped_column(Text, nullable=False)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    resume_id: Mapped[int] = mapped_column(Integer, nullable=False)
    start_date: Mapped[Optional[datetime.datetime]] = mapped_column(TIMESTAMP(precision=3))
    end_date: Mapped[Optional[datetime.datetime]] = mapped_column(TIMESTAMP(precision=3))

    resume: Mapped['Resume'] = relationship('Resume', back_populates='ResumeExperience')
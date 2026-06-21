from typing import Optional, TYPE_CHECKING
import datetime

from sqlalchemy import Boolean, DateTime, ForeignKeyConstraint, Index, Integer, PrimaryKeyConstraint, String, Text, text
from sqlalchemy.dialects.postgresql import JSONB, TIMESTAMP
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.core.database import Base
if TYPE_CHECKING:
    from .user import User
    from .resume_education import ResumeEducation
    from .resume_experience import ResumeExperience
    from .resume_profile import ResumeProfile
    from .resume_project import ResumeProject
    from .resume_skills import ResumeSkills


class Resume(Base):
    __tablename__ = 'Resume'
    __table_args__ = (
        ForeignKeyConstraint(['user_id'], ['User.id'], ondelete='CASCADE', onupdate='CASCADE', name='Resume_user_id_fkey'),
        PrimaryKeyConstraint('id', name='Resume_pkey')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    storage_url: Mapped[str] = mapped_column(Text, nullable=False)
    status: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text('false'))
    user_id: Mapped[int] = mapped_column(Integer, nullable=False)

    user: Mapped['User'] = relationship('User', back_populates='Resume')
    ResumeEducation: Mapped[list['ResumeEducation']] = relationship('ResumeEducation', back_populates='resume')
    ResumeExperience: Mapped[list['ResumeExperience']] = relationship('ResumeExperience', back_populates='resume')
    ResumeProfile: Mapped[list['ResumeProfile']] = relationship('ResumeProfile', back_populates='resume')
    ResumeProject: Mapped[list['ResumeProject']] = relationship('ResumeProject', back_populates='resume')
    ResumeSkills: Mapped[list['ResumeSkills']] = relationship('ResumeSkills', back_populates='resume')
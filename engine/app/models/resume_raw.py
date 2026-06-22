from typing import Optional, TYPE_CHECKING
from sqlalchemy import Boolean, ForeignKeyConstraint, Index, Integer, PrimaryKeyConstraint, Text, text
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship
from app.core.database import Base
if TYPE_CHECKING:
    from .resume import Resume

class ResumeRaw(Base):
    __tablename__ = 'ResumeRaw'
    __table_args__ = (
        ForeignKeyConstraint(['resume_id'], ['Resume.id'], ondelete='CASCADE', onupdate='CASCADE', name='ResumeRaw_resume_id_fkey'),
        PrimaryKeyConstraint('id', name='ResumeRaw_pkey')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    raw_text: Mapped[str] = mapped_column(Text, nullable=False)
    resume_id: Mapped[int] = mapped_column(Integer, nullable=False)

    resume: Mapped['Resume'] = relationship('Resume', back_populates='ResumeRaw')
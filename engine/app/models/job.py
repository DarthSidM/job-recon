# Using pgvector 0.4.2
from typing import Optional
import datetime

from sqlalchemy import Boolean, Double, Index, Integer, PrimaryKeyConstraint, Text, text
from sqlalchemy.dialects.postgresql import ARRAY, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base

class Job(Base):
    __tablename__ = 'Job'
    __table_args__ = (
        PrimaryKeyConstraint('id', name='Job_pkey'),
        Index('Job_company_idx', 'company'),
        Index('Job_firstSeenAt_idx', 'firstSeenAt'),
        Index('Job_isActive_idx', 'isActive'),
        Index('Job_location_idx', 'location'),
        Index('Job_source_sourceJobId_key', 'source', 'sourceJobId', unique=True),
        Index('Job_title_idx', 'title')
    )

    id: Mapped[int] = mapped_column(Integer, primary_key=True, autoincrement=True)
    source: Mapped[str] = mapped_column(Text, nullable=False)
    sourceJobId: Mapped[str] = mapped_column(Text, nullable=False)
    sourceUrl: Mapped[str] = mapped_column(Text, nullable=False)
    company: Mapped[str] = mapped_column(Text, nullable=False)
    applyUrl: Mapped[str] = mapped_column(Text, nullable=False)
    isActive: Mapped[bool] = mapped_column(Boolean, nullable=False, server_default=text('true'))
    title: Mapped[str] = mapped_column(Text, nullable=False)
    location: Mapped[str] = mapped_column(Text, nullable=False)
    firstSeenAt: Mapped[datetime.datetime] = mapped_column(TIMESTAMP(precision=3), nullable=False, server_default=text('CURRENT_TIMESTAMP'))
    lastSeenAt: Mapped[datetime.datetime] = mapped_column(TIMESTAMP(precision=3), nullable=False)
    missingCount: Mapped[int] = mapped_column(Integer, nullable=False, server_default=text('0'))
    jobDescription: Mapped[str] = mapped_column(Text, nullable=False)
    employmentType: Mapped[Optional[str]] = mapped_column(Text)
    salaryMin: Mapped[Optional[int]] = mapped_column(Integer)
    salaryMax: Mapped[Optional[int]] = mapped_column(Integer)
    skills: Mapped[Optional[list[str]]] = mapped_column(ARRAY(Text()))
    expMin: Mapped[Optional[float]] = mapped_column(Double(53))

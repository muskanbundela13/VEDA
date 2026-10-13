
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Boolean,
    ForeignKey,
    JSON,
)
from sqlalchemy.orm import relationship

from app.database import Base


class Subject(Base):
    __tablename__ = "subjects"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    short_name = Column(String(20), unique=True, nullable=False)
    description = Column(Text, nullable=True)

    topics = relationship(
        "Topic",
        back_populates="subject",
        cascade="all, delete-orphan",
    )


class Topic(Base):
    __tablename__ = "topics"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    published = Column(Boolean, default=False, nullable=False)

    subject_id = Column(
        Integer,
        ForeignKey("subjects.id"),
        nullable=False,
    )

    subject = relationship("Subject", back_populates="topics")
    sections = relationship(
        "TopicSection",
        back_populates="topic",
        cascade="all, delete-orphan",
        order_by="TopicSection.position",
    )


class TopicSection(Base):
    __tablename__ = "topic_sections"

    id = Column(Integer, primary_key=True, index=True)
    section_type = Column(String(50), nullable=False)
    title = Column(String(200), nullable=False)
    position = Column(Integer, default=0, nullable=False)
    content = Column(JSON, nullable=False)

    topic_id = Column(
        Integer,
        ForeignKey("topics.id"),
        nullable=False,
    )

    topic = relationship("Topic", back_populates="sections")

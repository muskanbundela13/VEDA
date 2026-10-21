from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import Base, engine, get_db
from app import models

app = FastAPI(
    title="VEDA API",
    description="Backend API for the VEDA learning platform",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Base.metadata.create_all(bind=engine)


@app.get("/")
def home():
    return {
        "message": "Welcome to VEDA API",
        "status": "running",
    }


@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "veda-backend",
    }


@app.get("/api/subjects")
def get_subjects(db: Session = Depends(get_db)):
    subjects = db.query(models.Subject).order_by(models.Subject.id).all()

    return [
        {
            "id": subject.id,
            "name": subject.name,
            "short_name": subject.short_name,
            "description": subject.description,
        }
        for subject in subjects
    ]


@app.post("/api/subjects")
def create_subject(
    name: str,
    short_name: str,
    description: str = "",
    db: Session = Depends(get_db),
):
    existing = (
        db.query(models.Subject)
        .filter(models.Subject.short_name == short_name)
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=409,
            detail="A subject with this short name already exists",
        )

    subject = models.Subject(
        name=name,
        short_name=short_name,
        description=description,
    )

    db.add(subject)
    db.commit()
    db.refresh(subject)

    return {
        "id": subject.id,
        "name": subject.name,
        "short_name": subject.short_name,
        "description": subject.description,
    }


@app.put("/api/subjects/{subject_id}")
def update_subject(
    subject_id: int,
    name: str,
    short_name: str,
    description: str = "",
    db: Session = Depends(get_db),
):
    subject = (
        db.query(models.Subject)
        .filter(models.Subject.id == subject_id)
        .first()
    )

    if not subject:
        raise HTTPException(
            status_code=404,
            detail="Subject not found",
        )

    existing = (
        db.query(models.Subject)
        .filter(
            models.Subject.short_name == short_name,
            models.Subject.id != subject_id,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=409,
            detail="A subject with this short name already exists",
        )

    subject.name = name
    subject.short_name = short_name
    subject.description = description

    db.commit()
    db.refresh(subject)

    return {
        "id": subject.id,
        "name": subject.name,
        "short_name": subject.short_name,
        "description": subject.description,
    }


@app.get("/api/subjects/{subject_id}/topics")
def get_topics(subject_id: int, db: Session = Depends(get_db)):
    subject = db.query(models.Subject).filter(
        models.Subject.id == subject_id
    ).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    return [
        {
            "id": topic.id,
            "title": topic.title,
            "slug": topic.slug,
            "description": topic.description,
            "published": topic.published,
            "subject_id": topic.subject_id,
        }
        for topic in subject.topics
    ]


@app.post("/api/subjects/{subject_id}/topics")
def create_topic(
    subject_id: int,
    title: str,
    slug: str,
    description: str = "",
    db: Session = Depends(get_db),
):
    subject = db.query(models.Subject).filter(
        models.Subject.id == subject_id
    ).first()

    if not subject:
        raise HTTPException(status_code=404, detail="Subject not found")

    topic = models.Topic(
        title=title,
        slug=slug,
        description=description,
        subject_id=subject_id,
    )

    db.add(topic)
    db.commit()
    db.refresh(topic)

    return {
        "id": topic.id,
        "title": topic.title,
        "slug": topic.slug,
        "description": topic.description,
        "published": topic.published,
        "subject_id": topic.subject_id,
    }



@app.get("/api/topics/{topic_id}/sections")
def get_topic_sections(topic_id: int, db: Session = Depends(get_db)):
    topic = db.query(models.Topic).filter(
        models.Topic.id == topic_id
    ).first()

    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if not topic.published:
        raise HTTPException(
            status_code=404,
            detail="Topic not found"
        )

    return [
        {
            "id": section.id,
            "section_type": section.section_type,
            "title": section.title,
            "position": section.position,
            "content": section.content,
            "topic_id": section.topic_id,
        }
        for section in topic.sections
    ]


@app.post("/api/topics/{topic_id}/sections")
def create_topic_section(
    topic_id: int,
    section_type: str,
    title: str,
    content: dict,
    position: int = 0,
    db: Session = Depends(get_db),
):
    topic = db.query(models.Topic).filter(
        models.Topic.id == topic_id
    ).first()

    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")


    allowed_types = {
        "understand",
        "introduction",
        "classification",
        "characteristics",
        "components",
        "workingPrinciple",
        "comparison",
        "operations",
        "algorithms",
        "applications",
        "realWorld",
        "advantages",
        "howItWorks",
        "code",
        "complexity",
        "spaceComplexity",
        "visualization",
        "caseStudy",
        "solvedExamples",
        "practiceQuestions",
        "mcq",
        "interviewQuestions",
        "assignment",
        "summary",
        "custom",
    }


    if section_type not in allowed_types:
        raise HTTPException(
            status_code=422,
            detail=f"section_type must be one of {sorted(allowed_types)}",
        )

    section = models.TopicSection(
        topic_id=topic_id,
        section_type=section_type,
        title=title,
        content=content,
        position=position,
    )

    db.add(section)
    db.commit()
    db.refresh(section)

    return {
        "id": section.id,
        "section_type": section.section_type,
        "title": section.title,
        "position": section.position,
        "content": section.content,
        "topic_id": section.topic_id,
    }

@app.put("/api/topics/{topic_id}")
def update_topic(
    topic_id: int,
    title: str,
    slug: str,
    description: str = "",
    published: bool = False,
    db: Session = Depends(get_db),
):
    topic = db.query(models.Topic).filter(
        models.Topic.id == topic_id
    ).first()

    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")

    topic.title = title
    topic.slug = slug
    topic.description = description
    topic.published = published

    db.commit()
    db.refresh(topic)

    return {
        "id": topic.id,
        "title": topic.title,
        "slug": topic.slug,
        "description": topic.description,
        "published": topic.published,
        "subject_id": topic.subject_id,
    }

@app.delete("/api/topics/{topic_id}/sections/{section_id}")
def delete_topic_section(
    topic_id: int,
    section_id: int,
    db: Session = Depends(get_db),
):
    section = (
        db.query(models.TopicSection)
        .filter(
            models.TopicSection.id == section_id,
            models.TopicSection.topic_id == topic_id,
        )
        .first()
    )

    if not section:
        raise HTTPException(
            status_code=404,
            detail="Topic section not found",
        )

    db.delete(section)
    db.commit()

    return {"message": "Topic section deleted successfully"}



@app.put("/api/topics/{topic_id}/sections/{section_id}")
def update_topic_section(
    topic_id: int,
    section_id: int,
    section_type: str,
    title: str,
    content: dict,
    position: int = 0,
    db: Session = Depends(get_db),
):
    section = (
        db.query(models.TopicSection)
        .filter(
            models.TopicSection.id == section_id,
            models.TopicSection.topic_id == topic_id,
        )
        .first()
    )

    if not section:
        raise HTTPException(
            status_code=404,
            detail="Topic section not found",
        )

    allowed_types = {
        "understand",
        "realWorld",
        "howItWorks",
        "code",
        "complexity",
    }

    if section_type not in allowed_types:
        raise HTTPException(
            status_code=422,
            detail="Invalid section type",
        )

    section.section_type = section_type
    section.title = title
    section.content = content
    section.position = position

    db.commit()
    db.refresh(section)

    return {
        "id": section.id,
        "section_type": section.section_type,
        "title": section.title,
        "position": section.position,
        "content": section.content,
        "topic_id": section.topic_id,
    }

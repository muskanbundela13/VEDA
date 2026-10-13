import { useParams } from "react-router-dom"

import subjects from "../../data/subjects"
import topics from "../../data/topics"

import TopicCard from "../../components/TopicCard/TopicCard"

import "./Subject.css"

function Subject() {
  const { subjectId } = useParams()

  const subject = subjects.find(
    (item) => item.shortName.toLowerCase() === subjectId
  )

  const subjectTopics = topics[subjectId] || []

  if (!subject) {
    return <h1>Subject not found</h1>
  }

  return (
    <div className="subject-page">

      {/* Subject Header */}
      <section className="subject-header">

        <span className="subject-label">
          {subject.shortName}
        </span>

        <h1>{subject.name}</h1>

        <p>{subject.description}</p>

      </section>

      {/* Topics */}
      <section className="topics-section">

        <div className="topics-heading">
          <span>TOPICS</span>

          <h2>Start exploring.</h2>
        </div>

        <div className="topics-grid">

          {subjectTopics.map((topic, index) => (
            <TopicCard
              key={topic.id}
              topic={topic}
              index={index}
              subjectId={subjectId}
            />
          ))}

        </div>

      </section>

    </div>
  )
}

export default Subject
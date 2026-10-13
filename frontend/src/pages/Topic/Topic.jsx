import { useParams, Link } from "react-router-dom"
import topics from "../../data/topics"
import "./Topic.css"
import Explanation from "../../components/Explanation/Explanation"
import RealWorldExample from "../../components/RealWorldExample/RealWorldExample"
import HowItWorks from "../../components/HowItWorks/HowItWorks"
import CodeExample from "../../components/CodeExample/CodeExample"
import Complexity from "../../components/Complexity/Complexity"
import topicContent from "../../data/topicContent"
import subjects from "../../data/subjects"

function Topic() {
  const { subjectId, topicId } = useParams()
  const subject = subjects.find(
  (item) => item.shortName.toLowerCase() === subjectId
)
  const subjectTopics = topics[subjectId] || []
  const topic = subjectTopics.find((item) => item.slug === topicId)
  const content = topicContent[topicId]

  if (!topic || !subject || !content) {
    return (
      <div className="topic-not-found">
        <span>VEDA</span>

        <h1>Topic not available yet.</h1>

        <p>
          We're still preparing the visual explanation
          for this topic.
        </p>

        <Link to={`/subjects/${subjectId}`}>
          ← Back to topics
        </Link>
      </div>
    )
  }

  return (
    <div className="topic-page">

      {/* Topic Header */}
      <section className="topic-header">

        <Link
          to={`/subjects/${subjectId}`}
          className="back-link"
        >
          ← Back to topics
        </Link>

        <span className="topic-label">
          {subject?.name}
        </span>

        <h1>{topic.title}</h1>

        <p>{topic.description}</p>

      </section>

      {/* 01 — Understand */}
      <Explanation data={content.understand} />

      {/* 02 — Real World Example */}
      <RealWorldExample data={content.realWorld} />

      <HowItWorks data={content.howItWorks} />

      <CodeExample data={content.code} />

      <Complexity data={content.complexity} />

    </div>
  )
}

export default Topic
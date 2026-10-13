import { Link } from "react-router-dom"
import "./TopicCard.css"

function TopicCard({ topic, index, subjectId }) {
  return (
    <Link
      to={`/subjects/${subjectId}/${topic.slug}`}
      className="topic-card"
    >
      <span className="topic-number">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="topic-content">
        <h3>{topic.title}</h3>
        <p>{topic.description}</p>
      </div>

      <span className="topic-arrow">↗</span>
    </Link>
  )
}

export default TopicCard
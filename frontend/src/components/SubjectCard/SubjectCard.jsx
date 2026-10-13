import { Link } from "react-router-dom"
import "./SubjectCard.css"

function SubjectCard({ subject, index }) {
  return (
    <Link
      to={`/subjects/${subject.shortName.toLowerCase()}`}
      className="subject-card"
    >
      <span className="subject-number">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="subject-card-content">
        <span className="subject-short-name">
          {subject.shortName}
        </span>

        <h3>{subject.name}</h3>

        <p>{subject.description}</p>
      </div>

      <span className="subject-arrow">↗</span>
    </Link>
  )
}

export default SubjectCard
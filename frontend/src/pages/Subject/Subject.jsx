
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import TopicCard from "../../components/TopicCard/TopicCard"
import "./Subject.css"

const API_URL = "http://127.0.0.1:8000"

function Subject() {
  const { subjectId } = useParams()

  const [subject, setSubject] = useState(null)
  const [subjectTopics, setSubjectTopics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadSubject() {
      setLoading(true)
      setError("")
      setSubject(null)
      setSubjectTopics([])

      try {
        const subjectsResponse = await fetch(`${API_URL}/api/subjects`)
        if (!subjectsResponse.ok) {
          throw new Error("Could not load subjects.")
        }

        const subjects = await subjectsResponse.json()
        const currentSubject = subjects.find(
          (item) =>
            item.short_name?.toLowerCase() === subjectId.toLowerCase()
        )

        if (!currentSubject) {
          throw new Error("Subject not found.")
        }

        const topicsResponse = await fetch(
          `${API_URL}/api/subjects/${currentSubject.id}/topics`
        )

        if (!topicsResponse.ok) {
          throw new Error("Could not load topics.")
        }

        const topics = await topicsResponse.json()

        if (!cancelled) {
          setSubject({
            ...currentSubject,
            shortName: currentSubject.short_name,
          })
          setSubjectTopics(topics.filter((topic) => topic.published === true))
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load this subject.")
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadSubject()

    return () => {
      cancelled = true
    }
  }, [subjectId])

  if (loading) {
    return (
      <div className="subject-page">
        <h1>Loading subject...</h1>
      </div>
    )
  }

  if (error || !subject) {
    return (
      <div className="subject-page">
        <h1>{error || "Subject not found"}</h1>
      </div>
    )
  }

  return (
    <div className="subject-page">
      <section className="subject-header">
        <span className="subject-label">
          {subject.shortName}
        </span>

        <h1>{subject.name}</h1>
        <p>{subject.description}</p>
      </section>

      <section className="topics-section">
        <div className="topics-heading">
          <span>TOPICS</span>
          <h2>Start exploring.</h2>
        </div>

        <div className="topics-grid">
          {subjectTopics.length > 0 ? (
            subjectTopics.map((topic, index) => (
              <TopicCard
                key={topic.id}
                topic={topic}
                index={index}
                subjectId={subjectId}
              />
            ))
          ) : (
            <p>No topics have been added to this subject yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}

export default Subject

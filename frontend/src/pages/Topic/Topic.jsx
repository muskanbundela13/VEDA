
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import "./Topic.css"

import Explanation from "../../components/Explanation/Explanation"
import RealWorldExample from "../../components/RealWorldExample/RealWorldExample"
import HowItWorks from "../../components/HowItWorks/HowItWorks"
import CodeExample from "../../components/CodeExample/CodeExample"
import Complexity from "../../components/Complexity/Complexity"
import AcademicSection from "../../components/AcademicSection/AcademicSection"
import ClassificationTree from "../../components/ClassificationTree/ClassificationTree"


const API_URL = "http://127.0.0.1:8000"

function Topic() {
  const { subjectId, topicId } = useParams()

  const [subject, setSubject] = useState(null)
  const [topic, setTopic] = useState(null)
  const [sections, setSections] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadTopic() {
      setLoading(true)
      setError("")
      setSubject(null)
      setTopic(null)
      setSections([])

      try {
        const subjectsResponse = await fetch(`${API_URL}/api/subjects`)

        if (!subjectsResponse.ok) {
          throw new Error("Could not load subjects.")
        }

        const subjects = await subjectsResponse.json()
        const currentSubject = subjects.find(
          (item) => item.short_name?.toLowerCase() === subjectId.toLowerCase()
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
        const currentTopic = topics.find((item) => item.slug === topicId)

        if (!currentTopic || currentTopic.published !== true) {
          throw new Error("This topic is not published yet.")
        }

        const sectionsResponse = await fetch(
          `${API_URL}/api/topics/${currentTopic.id}/sections`
        )

        if (!sectionsResponse.ok) {
          throw new Error("Could not load lesson content.")
        }

        const lessonSections = await sectionsResponse.json()

        if (!cancelled) {
          setSubject(currentSubject)
          setTopic(currentTopic)
          setSections(lessonSections)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Something went wrong while loading this lesson.")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadTopic()

    return () => {
      cancelled = true
    }
  }, [subjectId, topicId])

  if (loading) {
    return (
      <div className="topic-not-found">
        <span>VEDA</span>
        <h1>Loading lesson...</h1>
      </div>
    )
  }

  if (error || !topic || !subject) {
    return (
      <div className="topic-not-found">
        <span>VEDA</span>
        <h1>Topic not available yet.</h1>
        <p>{error || "We're still preparing this lesson."}</p>
        <Link to={`/subjects/${subjectId}`}>
          ← Back to topics
        </Link>
      </div>
    )
  }

  const content = Object.fromEntries(
    sections.map((section) => [
      section.section_type,
      {
        ...section.content,
        title: section.title,
      },
    ])
  )

  return (
    <div className="topic-page">
      <section className="topic-header">
        <Link
          to={`/subjects/${subjectId}`}
          className="back-link"
        >
          ← Back to topics
        </Link>

        <span className="topic-label">
          {subject.name}
        </span>

        <h1>{topic.title}</h1>
        <p>{topic.description}</p>
      </section>


      {sections.length > 0 && (
        <nav className="lesson-navigation" aria-label="In this lesson">
          <h2>In this lesson</h2>
          <p>Choose a section to explore.</p>

          <div className="lesson-navigation-grid">
            {sections
              .slice()
              .sort((a, b) => a.position - b.position)
              .map((section, index) => (
                <a
                  key={section.id}
                  href={`#lesson-section-${section.id}`}
                  className="lesson-navigation-card"
                >
                  <span className="lesson-navigation-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{section.title}</span>
                </a>
              ))}
          </div>
        </nav>
      )}


      {sections
        .slice()
        .sort((a, b) => a.position - b.position)
        .map((section, index) => {
          const data = {
            ...section.content,
            title: section.title,
          }

          return (
            <div
              key={section.id}
              id={`lesson-section-${section.id}`}
              className="lesson-section-anchor"
            >
              {(() => {
                switch (section.section_type) {
                  case "understand":
                    return <Explanation data={data} />
                  case "realWorld":
                    return <RealWorldExample data={data} />
                  case "howItWorks":
                    return <HowItWorks data={data} />
                  case "code":
                    return <CodeExample data={data} />
                  case "complexity":
                    return <Complexity data={data} />
                  case "classification":
                    return <ClassificationTree data={data} />
                  default:
                    return (

                    <AcademicSection
                      data={data}
                      type={section.section_type}
                    />
                  )
                }
              })()}
            </div>
          )
        })}

    </div>
  )
}

export default Topic
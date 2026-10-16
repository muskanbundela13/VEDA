
import { useEffect, useState } from "react"

import Hero from "../../components/Hero/Hero"
import SubjectCard from "../../components/SubjectCard/SubjectCard"
import FeatureCard from "../../components/FeatureCard/FeatureCard"
import features from "../../data/features"

function Home() {
  const [subjects, setSubjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function loadSubjects() {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/subjects")

        if (!response.ok) {
          throw new Error("Could not load subjects.")
        }

        const data = await response.json()

        if (!cancelled) {
          setSubjects(
            data.map((subject) => ({
              ...subject,
              shortName: subject.short_name,
            }))
          )
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || "Unable to load subjects.")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadSubjects()

    return () => {
      cancelled = true
    }
  }, [])

  return (
    <>
      <Hero />

      <section className="subjects-section">
        <div className="section-heading">
          <span>EXPLORE</span>
          <h2>Subjects</h2>
          <p>Start with a concept. Understand it visually.</p>
        </div>

        <div className="subjects-grid">
          {loading ? (
            <p>Loading subjects...</p>
          ) : error ? (
            <p>{error}</p>
          ) : subjects.length > 0 ? (
            subjects.map((subject, index) => (
              <SubjectCard
                key={subject.id}
                subject={subject}
                index={index}
              />
            ))
          ) : (
            <p>No subjects added yet.</p>
          )}
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>WHY VEDA?</span>
          <h2>Learning shouldn't feel complicated.</h2>
        </div>

        <div className="features-grid">
          {features.map((feature) => (
            <FeatureCard
              key={feature.number}
              number={feature.number}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home

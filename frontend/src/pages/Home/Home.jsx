import Hero from "../../components/Hero/Hero"
import SubjectCard from "../../components/SubjectCard/SubjectCard"
import subjects from "../../data/subjects"
import FeatureCard from "../../components/FeatureCard/FeatureCard"
import features from "../../data/features"

function Home() {
  return (
    <>
      <Hero />

      <section className="subjects-section">
        <div className="section-heading">
          <span>EXPLORE</span>
          <h2>Subjects</h2>
          <p>
            Start with a concept. Understand it visually.
          </p>
        </div>

        <div className="subjects-grid">
          {subjects.map((subject, index) => (
            <SubjectCard
              key={subject.id}
              subject={subject}
              index={index}
            />
          ))}
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
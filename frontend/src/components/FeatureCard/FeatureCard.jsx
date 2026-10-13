import "./FeatureCard.css"

function FeatureCard({ number, title, description }) {
  return (
    <article className="feature-card">
      <span className="feature-number">{number}</span>

      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </article>
  )
}

export default FeatureCard
import "./HowItWorks.css"

function HowItWorks({ data }) {
  return (
    <section className="how-it-works">

      <span className="content-label">
        03 — HOW IT WORKS
      </span>

      <h2>{data.title}</h2>

      <p className="how-it-works-intro">
        {data.description}
      </p>

      <div className="search-visual">

        <div className="array">
          {data.array.map((value) => (
            <span
              key={value}
              className={value === data.middle ? "middle" : ""}
            >
              {value}
            </span>
          ))}
        </div>

        <div className="visual-label">
          {data.visualLabel}
        </div>

        <div className="visual-arrow">
          ↓
        </div>

        <div className="target-box">
          <span>{data.targetLabel}</span>
          <strong>{data.target}</strong>
        </div>

        <p className="visual-explanation">
          {data.explanation}
        </p>

      </div>

    </section>
  )
}

export default HowItWorks
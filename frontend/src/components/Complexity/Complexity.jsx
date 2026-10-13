import "./Complexity.css"

function Complexity({ data }) {
  return (
    <section className="complexity">

      <span className="content-label">
        05 — COMPLEXITY
      </span>

      <h2>{data.title}</h2>

      <p className="complexity-intro">
        {data.intro}
      </p>

      <div className="complexity-grid">

        <div className="complexity-card">
          <span>{data.time.label}</span>

          <strong>{data.time.value}</strong>

          <p>{data.time.description}</p>
        </div>

        <div className="complexity-card">
          <span>{data.space.label}</span>

          <strong>{data.space.value}</strong>

          <p>{data.space.description}</p>
        </div>

      </div>

      <div className="complexity-example">

        <span>WHY?</span>

        {data.why.text.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}

      </div>

    </section>
  )
}

export default Complexity
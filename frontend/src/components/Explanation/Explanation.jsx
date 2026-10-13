import "./Explanation.css"

function Explanation({ data }) {
  return (
    <section className="explanation">

      <span className="content-label">
        01 — UNDERSTAND
      </span>

      <h2>{data.title}</h2>

      <div className="explanation-content">
        {data.paragraphs.map((paragraph, index) => (
          <p key={index}>
            {paragraph}
          </p>
        ))}
      </div>

    </section>
  )
}

export default Explanation
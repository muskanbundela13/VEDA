
import "./Complexity.css"

function Complexity({ data }) {
  if (!data) return null

  const complexities = Array.isArray(data.complexities)
    ? data.complexities
    : []

  const paragraphs = Array.isArray(data.paragraphs)
    ? data.paragraphs
    : Array.isArray(data.why?.text)
      ? data.why.text
      : []

  return (
    <section className="complexity">
      <span className="content-label">
        05 — COMPLEXITY
      </span>

      <h2>{data.title || data.heading || "Time Complexity"}</h2>

      {data.intro && (
        <p className="complexity-intro">{data.intro}</p>
      )}

      {complexities.length > 0 ? (
        <div className="complexity-grid">
          {complexities.map((item, index) => (
            <div className="complexity-card" key={index}>
              <span>{item.operation || item.label || "Operation"}</span>
              <strong>{item.time || item.value || "—"}</strong>
              {item.description && <p>{item.description}</p>}
            </div>
          ))}
        </div>
      ) : (
        <div className="complexity-grid">
          {data.time && (
            <div className="complexity-card">
              <span>{data.time.label}</span>
              <strong>{data.time.value}</strong>
              <p>{data.time.description}</p>
            </div>
          )}
          {data.space && (
            <div className="complexity-card">
              <span>{data.space.label}</span>
              <strong>{data.space.value}</strong>
              <p>{data.space.description}</p>
            </div>
          )}
        </div>
      )}

      {paragraphs.length > 0 && (
        <div className="complexity-example">
          <span>WHY?</span>
          {paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}
    </section>
  )
}

export default Complexity

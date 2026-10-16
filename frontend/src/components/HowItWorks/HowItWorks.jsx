
import "./HowItWorks.css"

function HowItWorks({ data }) {
  if (!data) return null

  return (
    <section className="how-it-works">
      <span className="content-label">
        03 — HOW IT WORKS
      </span>

      <h2>{data.title || "How It Works"}</h2>

      {data.description && (
        <p className="how-it-works-intro">
          {data.description}
        </p>
      )}

      {Array.isArray(data.paragraphs) && (
        <div className="how-it-works-intro">
          {data.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      )}

      {Array.isArray(data.array) && data.array.length > 0 && (
        <div className="search-visual">
          <div className="array">
            {data.array.map((value, index) => (
              <span
                key={index}
                className={value === data.middle ? "middle" : ""}
              >
                {value}
              </span>
            ))}
          </div>

          {data.visualLabel && (
            <div className="visual-label">{data.visualLabel}</div>
          )}

          <div className="visual-arrow">↓</div>

          {(data.targetLabel || data.target !== undefined) && (
            <div className="target-box">
              {data.targetLabel && <span>{data.targetLabel}</span>}
              {data.target !== undefined && <strong>{data.target}</strong>}
            </div>
          )}

          {data.explanation && (
            <p className="visual-explanation">{data.explanation}</p>
          )}
        </div>
      )}
    </section>
  )
}

export default HowItWorks

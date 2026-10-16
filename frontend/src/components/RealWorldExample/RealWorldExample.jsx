
import "./RealWorldExample.css"

function RealWorldExample({ data }) {
  if (!data) return null

  return (
    <section className="real-world-example">
      <span className="content-label">
        02 — REAL-WORLD EXAMPLE
      </span>

      <h2>{data.title}</h2>

      {(data.paragraphs || []).map((paragraph, index) => (
        <p key={index}>
          {paragraph}
        </p>
      ))}

      {Array.isArray(data.steps) && data.steps.length > 0 && (
        <div className="example-steps">
          {data.steps.map((step, index) => (
            <div className="example-step" key={index}>
              <span>
                {String(index + 1).padStart(2, "0")}
              </span>

              <p>{step}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default RealWorldExample

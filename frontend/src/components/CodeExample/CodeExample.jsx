
import "./CodeExample.css"

function CodeExample({ data }) {
  if (!data) return null

  const points = Array.isArray(data.points)
    ? data.points
    : Array.isArray(data.explanation)
      ? data.explanation.map((text, index) => ({
          number: index + 1,
          text,
        }))
      : []

  return (
    <section className="code-example">
      <span className="content-label">
        04 — CODE
      </span>

      <h2>{data.title || "Code Example"}</h2>

      {data.intro && (
        <p className="code-intro">{data.intro}</p>
      )}

      <div className="code-block">
        <div className="code-header">
          <span>{data.filename || "example.py"}</span>
          <span>{data.language || "python"}</span>
        </div>

        <pre>
          <code>{data.code || ""}</code>
        </pre>
      </div>

      {data.output && (
        <div className="code-output">
          <strong>Output</strong>
          <pre><code>{data.output}</code></pre>
        </div>
      )}

      {points.length > 0 && (
        <div className="code-explanation">
          {points.map((point, index) => (
            <div className="code-point" key={point.number ?? index + 1}>
              <span>{point.number ?? index + 1}</span>
              <p>{point.text ?? point}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default CodeExample

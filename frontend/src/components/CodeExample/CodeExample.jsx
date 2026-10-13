import "./CodeExample.css"

function CodeExample({ data }) {
  return (
    <section className="code-example">

      <span className="content-label">
        04 — CODE
      </span>

      <h2>{data.title}</h2>

      <p className="code-intro">
        {data.intro}
      </p>

      <div className="code-block">

        <div className="code-header">
          <span>{data.filename}</span>
          <span>{data.language}</span>
        </div>

        <pre>
          <code>{data.code}</code>
        </pre>

      </div>

      <div className="code-explanation">

        {data.points.map((point) => (
          <div className="code-point" key={point.number}>

            <span>{point.number}</span>

            <p>{point.text}</p>

          </div>
        ))}

      </div>

    </section>
  )
}

export default CodeExample
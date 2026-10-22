import "./AcademicSection.css"

function AcademicSection({ data, type }) {
  if (!data) return null

  const paragraphs = Array.isArray(data.paragraphs)
    ? data.paragraphs
    : []

  const items = Array.isArray(data.items)
    ? data.items
    : []

  const questions = Array.isArray(data.questions)
    ? data.questions
    : []

  return (
    <section className="academic-section">
      <h2>{data.title || type}</h2>

      {data.heading && <h3>{data.heading}</h3>}

      {paragraphs.map((paragraph, index) => (
        <p key={`paragraph-${index}`}>{paragraph}</p>
      ))}

      {items.length > 0 && (
        <ul>
          {items.map((item, index) => (
            <li key={`item-${index}`}>
              {typeof item === "string" ? (
                item
              ) : (
                <>
                  {item.title && <strong>{item.title}: </strong>}
                  {item.description || item.text || ""}
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {questions.map((question, index) => (
        <article key={`question-${index}`}>
          <h3>
            {index + 1}.{" "}
            {typeof question === "string"
              ? question
              : question.question}
          </h3>

          {question.answer && (
            <p><strong>Answer:</strong> {question.answer}</p>
          )}

          {question.explanation && (
            <p>{question.explanation}</p>
          )}
        </article>
      ))}
    </section>
  )
}

export default AcademicSection

import "./Hero.css"

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-label">VISUAL LEARNING FOR ENGINEERS</span>

        <h1>
          Learn complex
          <span> things simply.</span>
        </h1>

        <p>
          Understand engineering and computer science concepts
          through simple explanations, real-world examples,
          and visual learning.
        </p>

        <div className="hero-search">
          <span>⌕</span>
          <input
            type="text"
            placeholder="Search a concept..."
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
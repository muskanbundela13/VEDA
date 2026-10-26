
import "./Hero.css"

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-label">
          VISUAL LEARNING FOR ENGINEERS
        </span>

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
          <span aria-hidden="true">⌕</span>
          <input
            type="text"
            placeholder="Search a concept..."
            aria-label="Search a concept"
          />
        </div>
      </div>

      <a
        className="hero-scroll-cue"
        href="#subjects"
        aria-label="Scroll down to explore subjects"
      >
        <span>SCROLL TO EXPLORE</span>
        <span aria-hidden="true">↓</span>
      </a>
    </section>
  )
}

export default Hero

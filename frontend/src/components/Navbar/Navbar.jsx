
import { useTheme } from "../../context/ThemeContext"
import "./Navbar.css"

function ThemeIcon({ theme }) {
  if (theme === "light") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.65 17.65l1.42 1.42M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.65 6.35l1.42-1.42" />
      </svg>
    )
  }

  if (theme === "dark") {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <rect x="3" y="4" width="18" height="13" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  )
}

function Navbar() {
  const { theme, setTheme } = useTheme()

  const nextTheme = {
    light: "dark",
    dark: "system",
    system: "light",
  }

  const themeDetails = {
    light: { label: "Light theme" },
    dark: { label: "Dark theme" },
    system: { label: "System theme" },
  }

  const current = themeDetails[theme] || themeDetails.system
  const next = nextTheme[theme] || "light"

  return (
    <nav className="navbar">
      <a className="navbar-logo" href="/" aria-label="VEDA home">
        VEDA
      </a>

      <div className="navbar-right">
        <div className="navbar-links">
          <a href="/">Explore</a>
          <a href="/#about">About</a>
        </div>

        <button
          className="theme-toggle"
          type="button"
          onClick={() => setTheme(next)}
          aria-label={`Current appearance: ${current.label}. Switch to ${themeDetails[next].label}`}
          title={`Current: ${current.label} — click to change`}
        >
          <span className="theme-toggle-icon">
            <ThemeIcon theme={theme} />
          </span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar

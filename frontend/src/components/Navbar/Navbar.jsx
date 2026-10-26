
import { useTheme } from "../../context/ThemeContext"
import "./Navbar.css"

function Navbar() {
  const { theme, setTheme } = useTheme()

  const nextTheme = {
    light: "dark",
    dark: "system",
    system: "light",
  }

  const themeDetails = {
    light: { icon: "☀️", label: "Light theme" },
    dark: { icon: "🌙", label: "Dark theme" },
    system: { icon: "💻", label: "System theme" },
  }

  const current = themeDetails[theme] || themeDetails.system

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
          onClick={() => setTheme(nextTheme[theme] || "light")}
          aria-label={`Current appearance: ${current.label}. Switch to ${
            themeDetails[nextTheme[theme] || "light"].label
          }`}
          title={`Current: ${current.label} — click to change`}
        >
          <span aria-hidden="true">{current.icon}</span>
          <span className="theme-toggle-label">
            {theme === "light" ? "Light" : theme === "dark" ? "Dark" : "System"}
          </span>
        </button>
      </div>
    </nav>
  )
}

export default Navbar

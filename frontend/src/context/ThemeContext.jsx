
import { createContext, useContext, useEffect, useState } from "react"

const ThemeContext = createContext(null)

const THEME_OPTIONS = ["light", "dark", "system"]

function getInitialTheme() {
  try {
    const savedTheme = localStorage.getItem("veda-theme")

    if (THEME_OPTIONS.includes(savedTheme)) {
      return savedTheme
    }
  } catch {
    // Use the default theme if storage is unavailable.
  }

  return "system"
}

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(getInitialTheme)

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  useEffect(() => {
    try {
      localStorage.setItem("veda-theme", theme)
    } catch {
      // The selected theme still works for the current session.
    }
  }, [theme])

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)

  if (!context) {
    throw new Error("useTheme must be used inside ThemeProvider")
  }

  return context
}

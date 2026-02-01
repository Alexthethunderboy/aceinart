"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Enforcing dark mode permanently for the new design direction
  const theme: Theme = 'dark';

  useEffect(() => {
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add('dark')
    // Optionally clear local storage or set it to dark
    localStorage.setItem('theme', 'dark')
  }, [])

  const toggleTheme = () => {
    // No-op or log that theme is locked
    console.log("Theme is locked to dark mode.")
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

const VulnerabilityContext = createContext<{
  isVulnerable: boolean
  toggleVulnerability: () => void
  setVulnerability: (value: boolean) => void
} | undefined>(undefined)

export function useVulnerability() {
  const context = useContext(VulnerabilityContext)
  if (!context) {
    throw new Error("useVulnerability must be used within a VulnerabilityProvider")
  }
  return context
}

export function VulnerabilityProvider({ children }: { children: React.ReactNode }) {
  const [isVulnerable, setIsVulnerable] = useState(false)

  const toggleVulnerability = () => setIsVulnerable((prev) => !prev)

  // Apply body class for global theme switching
  useEffect(() => {
    const body = document.body
    if (isVulnerable) {
      body.classList.add('vulnerability-mode')
      body.dataset.mode = 'raw'
    } else {
      body.classList.remove('vulnerability-mode')
      body.dataset.mode = 'refined'
    }
  }, [isVulnerable])

  return (
    <VulnerabilityContext.Provider value={{ isVulnerable, toggleVulnerability, setVulnerability: setIsVulnerable }}>
      {children}
    </VulnerabilityContext.Provider>
  )
}

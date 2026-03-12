import { createContext, useContext, useState, useMemo } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { createAppTheme } from '../theme'

type ThemeMode = 'light' | 'dark'

const STORAGE_KEY = 'telement-theme'

function getStoredMode(): ThemeMode {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'dark' || stored === 'light') return stored
  } catch {}
  return 'light'
}

const ThemeContext = createContext<{
  mode: ThemeMode
  toggleMode: () => void
} | null>(null)

export function useThemeMode() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useThemeMode must be used within ThemeProvider')
  return ctx
}

export function AppThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>(getStoredMode)

  const value = useMemo(
    () => ({
      mode,
      toggleMode: () => {
        setMode((prev) => {
          const next = prev === 'light' ? 'dark' : 'light'
          try {
            localStorage.setItem(STORAGE_KEY, next)
          } catch {}
          return next
        })
      },
    }),
    [mode]
  )

  const theme = useMemo(() => createAppTheme(mode), [mode])

  return (
    <ThemeContext.Provider value={value}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

import { createTheme, type PaletteMode } from '@mui/material/styles'

export const APP_BAR_HEIGHT = 64
export const HEADER_COLOR_LIGHT = '#0084ff'
export const HEADER_COLOR_DARK = '#242526'

const lightPalette = {
  primary: { main: HEADER_COLOR_LIGHT },
  secondary: { main: '#65676b' },
  background: { default: '#f0f2f5', paper: '#ffffff' },
}

const darkPalette = {
  primary: { main: HEADER_COLOR_LIGHT },
  secondary: { main: '#b0b3b8' },
  background: { default: '#18191a', paper: HEADER_COLOR_DARK },
}

export function createAppTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light' ? lightPalette : darkPalette),
    },
    shape: {
      borderRadius: 18,
    },
    typography: {
      fontFamily: '"Segoe UI", system-ui, -apple-system, sans-serif',
    },
    transitions: {
      duration: {
        enteringScreen: 400,
        leavingScreen: 350,
      },
    },
  })
}

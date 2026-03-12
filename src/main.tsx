import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

const base = import.meta.env.BASE_URL
const baseNoSlash = base.replace(/\/$/, '')
if (typeof window !== 'undefined' && window.location.pathname === baseNoSlash) {
  window.history.replaceState(null, '', base + window.location.search + window.location.hash)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

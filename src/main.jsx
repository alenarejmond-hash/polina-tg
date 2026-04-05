import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // <-- Без этого не будет работать Tailwind v4
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import './styles/globals.css'
import { SimplePosApp } from '@/simple-pos'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <SimplePosApp />
    </BrowserRouter>
  </StrictMode>,
)

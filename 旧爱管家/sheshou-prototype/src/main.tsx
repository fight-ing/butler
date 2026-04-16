import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DemoLayout from './layouts/DemoLayout'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoLayout />
  </StrictMode>,
)

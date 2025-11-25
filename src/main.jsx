import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

// apna image import karo (Vite isko auto public URL bana dega)
import favicon from './assets/sami.jpg'

// favicon set karne ka helper
function setFavicon(url) {
  try {
    let link = document.querySelector("link[rel='icon']")
    if (!link) {
      link = document.createElement('link')
      link.rel = 'icon'
      document.head.appendChild(link)
    }
    link.href = url
  } catch (err) {
    // ignore (server-side render ya error me)
  }
}

// actual call
setFavicon(favicon)

// render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster position="top-right" />
  </StrictMode>,
)

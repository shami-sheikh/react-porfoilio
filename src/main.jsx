import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'

// apna image import karo (Vite isko auto public URL bana dega)
import favicon from './assets/sami.jpg'

// favicon set karne ka helper
// small helper to read ?disable=... for isolation testing
function isDisabled(key) {
  try {
    const params = new URLSearchParams(window.location.search)
    const raw = params.get('disable') || ''
    return raw.split(',').map(s => s.trim().toLowerCase()).includes(key)
  } catch (e) { return false }
}

;(function safeRemoveChildPatch() {
  try {
    const proto = Node && Node.prototype
    if (!proto) return
    const original = proto.removeChild
    proto.removeChild = function (child) {
      try {
        if (child && child.parentNode === this) {
          return original.call(this, child)
        }
        // prevent throwing when child is not actually attached
        console.warn('safeRemoveChild: prevented removing a non-child node', { parent: this, child })
        return child
      } catch (err) {
        // If anything unexpected happens, fall back to original to avoid hiding other errors
        try { return original.call(this, child) } catch (e) { return null }
      }
    }
  } catch (e) {
    // ignore in environments without DOM
  }
})()

function setFavicon(url) {
  try {
    if (isDisabled('favicon')) return
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

// actual call (skipped when ?disable=favicon)
setFavicon(favicon)

// render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    {!isDisabled('toaster') && <Toaster position="top-right" />}
  </StrictMode>,
)

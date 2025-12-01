import React, { useEffect, useState } from 'react'
import { FaChevronUp } from "react-icons/fa";
export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      onClick={scrollTop}
      aria-label="Back to top"
      className="fixed right-6 bottom-6 z-50 bg-violet-600 hover:bg-violet-700 text-white p-3 rounded-full shadow-lg transform transition-transform duration-200 hover:scale-105"
    >
        <FaChevronUp />
     
    </button>
  )
}

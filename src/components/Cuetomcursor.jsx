import React, { useRef, useEffect } from "react"
import { gsap } from "gsap"

function CustomCursor() {
  const cursorRef = useRef(null)
  const cursorBorderRef = useRef(null)

  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches

  if (isMobile) return null

  useEffect(() => {
    const cursor = cursorRef.current
    const border = cursorBorderRef.current

    gsap.set([cursor, border], {
      xPercent: -50,
      yPercent: -50
    })

    const xTo = gsap.quickTo(cursor, "x", {
      duration: 0.2,
      ease: "power3.out"
    })

    const yTo = gsap.quickTo(cursor, "y", {
      duration: 0.2,
      ease: "power3.out"
    })

    const xToBorder = gsap.quickTo(border, "x", {
      duration: 0.5,
      ease: "power3.out"
    })

    const yToBorder = gsap.quickTo(border, "y", {
      duration: 0.5,
      ease: "power3.out"
    })

    const handleMouseMove = e => {
      xTo(e.clientX)
      yTo(e.clientY)
      xToBorder(e.clientX)
      yToBorder(e.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none bg-white w-[20px] h-[20px] mix-blend-difference rounded-full z-[999]"
      />
      <div
        ref={cursorBorderRef}
        className="fixed w-[40px] h-[40px] rounded-full border border-white pointer-events-none z-[999] mix-blend-difference opacity-50"
      />
    </>
  )
}

export default CustomCursor

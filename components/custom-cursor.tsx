"use client"

import { useEffect } from "react"

export function CustomCursor() {
  useEffect(() => {
    const cursorDot = document.getElementById("cursor-dot")
    const cursorRing = document.getElementById("cursor-ring")

    if (!cursorDot || !cursorRing) return

    const handleMouseMove = (e: MouseEvent) => {
      cursorDot.style.left = e.clientX + "px"
      cursorDot.style.top = e.clientY + "px"

      setTimeout(() => {
        cursorRing.style.left = e.clientX + "px"
        cursorRing.style.top = e.clientY + "px"
      }, 50)
    }

    const handleMouseEnter = () => {
      cursorRing.style.transform = "translate(-50%, -50%) scale(1.5)"
      cursorRing.style.borderColor = "rgba(10, 182, 188, 0.6)"
    }

    const handleMouseLeave = () => {
      cursorRing.style.transform = "translate(-50%, -50%) scale(1)"
      cursorRing.style.borderColor = "rgba(10, 182, 188, 0.3)"
    }

    document.addEventListener("mousemove", handleMouseMove)

    // Add magnetic hover effects
    document.querySelectorAll(".magnetic-hover").forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter)
      el.addEventListener("mouseleave", handleMouseLeave)
    })

    // Scroll reveal animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed")
        }
      })
    }, observerOptions)

    document.querySelectorAll(".scroll-reveal").forEach((el) => {
      observer.observe(el)
    })

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.querySelectorAll(".magnetic-hover").forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter)
        el.removeEventListener("mouseleave", handleMouseLeave)
      })
      observer.disconnect()
    }
  }, [])

  return null
}

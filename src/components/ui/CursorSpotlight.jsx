import { useEffect, useRef } from 'react'

export default function CursorSpotlight() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let rafId
    function onMove(e) {
      cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        el.style.background = `radial-gradient(700px circle at ${e.clientX}px ${e.clientY}px, rgba(46,204,113,0.05), transparent 45%)`
      })
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      aria-hidden="true"
    />
  )
}

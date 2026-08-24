import { useEffect, useRef } from 'react'
import './Magnetic.css'

/**
 * Envolve um elemento interativo e o puxa levemente na direção do cursor.
 * Só age em ponteiros finos (mouse/trackpad) e respeita reduced-motion.
 */
export default function Magnetic({
  children,
  strength = 0.28,
  className = '',
  as: Tag = 'span',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (!finePointer.matches || reduced.matches) return

    const target = el.firstElementChild || el
    let frame = null
    let x = 0
    let y = 0

    function render() {
      frame = null
      target.style.transform = `translate3d(${x}px, ${y}px, 0)`
    }

    function schedule() {
      if (frame === null) frame = requestAnimationFrame(render)
    }

    function onMove(event) {
      const rect = el.getBoundingClientRect()
      x = (event.clientX - (rect.left + rect.width / 2)) * strength
      y = (event.clientY - (rect.top + rect.height / 2)) * strength
      schedule()
    }

    function onLeave() {
      x = 0
      y = 0
      schedule()
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)

    return () => {
      el.removeEventListener('pointermove', onMove)
      el.removeEventListener('pointerleave', onLeave)
      if (frame !== null) cancelAnimationFrame(frame)
      target.style.transform = ''
    }
  }, [strength])

  return (
    <Tag ref={ref} className={`magnetic ${className}`.trim()}>
      {children}
    </Tag>
  )
}

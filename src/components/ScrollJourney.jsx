import { useEffect, useRef } from 'react'
import './ScrollJourney.css'

const LERP = 0.11
const SNAP_DISTANCE = 0.0005

const XS_DESKTOP = [10, 86, 13, 85, 15, 83, 50]
const XS_MOBILE = [12, 80, 18, 74, 22, 70, 50]

function buildPath(points) {
  let d = `M ${points[0].x} ${points[0].y}`
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1]
    const cur = points[i]
    const dy = cur.y - prev.y
    const bend = dy * 0.5
    d += ` C ${prev.x} ${prev.y + bend}, ${cur.x} ${cur.y - bend}, ${cur.x} ${cur.y}`
  }
  return d
}

export default function ScrollJourney() {
  const wrapRef = useRef(null)
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const dotRef = useRef(null)
  const markerRefs = useRef([])
  const state = useRef({
    total: 0,
    thresholds: [],
    ready: false,
    target: 0,
    pos: null,
  })

  useEffect(() => {
    const wrap = wrapRef.current
    const svg = svgRef.current
    const path = pathRef.current
    const dot = dotRef.current
    if (!wrap || !svg || !path || !dot) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const s = state.current

    function rebuild() {
      const rect = wrap.getBoundingClientRect()
      if (rect.height === 0) return

      const isMobile = window.matchMedia('(max-width: 720px)').matches
      const xs = isMobile ? XS_MOBILE : XS_DESKTOP
      const els = Array.from(document.querySelectorAll('[data-journey]'))
      if (!els.length) return

      const wrapTop = rect.top + window.scrollY

      const points = els.map((el, i) => {
        const box = el.getBoundingClientRect()
        const elTop = box.top + window.scrollY
        const anchor = i === 0 ? 0.55 : i === els.length - 1 ? 0.7 : 0.42
        return {
          x: (rect.width * xs[i % xs.length]) / 100,
          y: elTop + box.height * anchor - wrapTop,
        }
      })

      svg.setAttribute('width', String(rect.width))
      svg.setAttribute('height', String(rect.height))
      svg.setAttribute('viewBox', `0 0 ${rect.width} ${rect.height}`)
      path.setAttribute('d', buildPath(points))

      markerRefs.current.forEach((m, i) => {
        if (!m) return
        if (!points[i]) {
          m.setAttribute('r', '0')
          return
        }
        m.setAttribute('cx', String(points[i].x))
        m.setAttribute('cy', String(points[i].y))
        m.setAttribute('r', '3.5')
      })

      s.total = path.getTotalLength()
      s.thresholds = points.map((p) => p.y / Math.max(points[points.length - 1].y, 1))
      path.style.strokeDasharray = `${s.total}`
      s.ready = true
    }

    function apply(p) {
      if (!s.ready || !s.total) return

      const clamped = Math.min(Math.max(p, 0), 1)
      const len = clamped * s.total
      const pt = path.getPointAtLength(len)

      dot.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`
      path.style.strokeDashoffset = `${s.total * (1 - clamped)}`

      markerRefs.current.forEach((m, i) => {
        if (!m) return
        m.classList.toggle('is-passed', clamped >= s.thresholds[i] - 0.004)
      })

      let nearestDist = Infinity
      s.thresholds.forEach((t) => {
        nearestDist = Math.min(nearestDist, Math.abs(clamped - t))
      })
      dot.classList.toggle('is-touching', nearestDist < 0.02 && clamped < 0.985)
      dot.classList.toggle('is-impact', clamped >= 0.985)
    }

    let rafId = null

    function tick() {
      rafId = null
      if (!s.ready || !s.total) return

      if (s.pos === null) s.pos = s.target
      s.pos += (s.target - s.pos) * LERP
      if (Math.abs(s.target - s.pos) < SNAP_DISTANCE) s.pos = s.target

      apply(s.pos)

      if (s.pos !== s.target) rafId = requestAnimationFrame(tick)
    }

    function schedule() {
      if (rafId === null) rafId = requestAnimationFrame(tick)
    }

    function measure() {
      const max = document.documentElement.scrollHeight - window.innerHeight
      s.target = max > 0 ? Math.min(Math.max(window.scrollY / max, 0), 1) : 0
      if (!reduced) schedule()
    }

    function refreshGeometry() {
      rebuild()
      if (reduced) {
        apply(1)
      } else {
        measure()
      }
    }

    function waitForImages() {
      const imgs = Array.from(wrap.querySelectorAll('img'))
      const pending = imgs.filter((img) => !img.complete)
      if (!pending.length) return Promise.resolve()
      return Promise.all(
        pending.map(
          (img) =>
            new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true })
              img.addEventListener('error', resolve, { once: true })
            })
        )
      )
    }

    rebuild()
    refreshGeometry()

    const ro = new ResizeObserver(refreshGeometry)
    ro.observe(wrap)

    window.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure, { passive: true })

    waitForImages().then(refreshGeometry)
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(refreshGeometry)
    }

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId)
      ro.disconnect()
      window.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [])

  const MARKERS = 7

  return (
    <div ref={wrapRef} className="journey" aria-hidden="true">
      <svg ref={svgRef} className="journey__svg">
        <path ref={pathRef} className="journey__path" />
        {Array.from({ length: MARKERS }, (_, i) => (
          <circle
            key={i}
            ref={(el) => (markerRefs.current[i] = el)}
            className="journey__marker"
            r="3.5"
          />
        ))}
      </svg>
      <div ref={dotRef} className="journey__dot" />
    </div>
  )
}

import { useEffect, useRef } from 'react'
import './ScrollJourney.css'

const LERP = 0.12
const SNAP_DISTANCE = 0.5
/* Linha de referência na tela: o nó acompanha quando um ponto cruza esta fração da viewport */
const VIEWPORT_ANCHOR = 0.62
const SAMPLE_STEP = 4

const XS_DESKTOP = [5, 94, 7, 92, 9, 90, 50]
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

function lengthAtY(ys, ls, y) {
  const last = ys.length - 1
  if (last < 0) return 0
  if (y <= ys[0]) return ls[0]
  if (y >= ys[last]) return ls[last]
  let lo = 0
  let hi = last
  while (hi - lo > 1) {
    const mid = (lo + hi) >> 1
    if (ys[mid] <= y) lo = mid
    else hi = mid
  }
  const span = ys[hi] - ys[lo]
  const t = span > 0 ? (y - ys[lo]) / span : 0
  return ls[lo] + t * (ls[hi] - ls[lo])
}

export default function ScrollJourney() {
  const wrapRef = useRef(null)
  const svgRef = useRef(null)
  const pathRef = useRef(null)
  const dotRef = useRef(null)
  const markerRefs = useRef([])
  const state = useRef({
    ready: false,
    total: 0,
    wrapTopDoc: 0,
    minY: 0,
    maxY: 0,
    ys: [],
    ls: [],
    markerLens: [],
    targetLen: 0,
    posLen: 0,
  })

  useEffect(() => {
    const wrap = wrapRef.current
    const svg = svgRef.current
    const path = pathRef.current
    const dot = dotRef.current
    if (!wrap || !svg || !path || !dot) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const s = state.current
    let disposed = false

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

      /* Amostra a curva uma única vez: y é monótono ao longo do caminho */
      const total = path.getTotalLength()
      const ys = []
      const ls = []
      for (let len = 0; len <= total; len += SAMPLE_STEP) {
        const pt = path.getPointAtLength(len)
        ys.push(pt.y)
        ls.push(len)
      }
      if (ls[ls.length - 1] !== total) {
        const pt = path.getPointAtLength(total)
        ys.push(pt.y)
        ls.push(total)
      }

      s.total = total
      s.wrapTopDoc = wrapTop
      s.minY = points[0].y
      s.maxY = points[points.length - 1].y
      s.ys = ys
      s.ls = ls
      s.markerLens = points.map((p) => lengthAtY(ys, ls, p.y))
      path.style.strokeDasharray = `${total}`
      s.ready = true
    }

    function apply(len) {
      if (!s.ready || !s.total) return

      const clamped = Math.min(Math.max(len, 0), s.total)
      const pt = path.getPointAtLength(clamped)

      dot.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0)`
      path.style.strokeDashoffset = `${s.total - clamped}`

      markerRefs.current.forEach((m, i) => {
        if (!m) return
        m.classList.toggle('is-passed', clamped >= s.markerLens[i] - 0.5)
      })

      let nearestDist = Infinity
      s.markerLens.forEach((ml) => {
        nearestDist = Math.min(nearestDist, Math.abs(clamped - ml))
      })
      dot.classList.toggle('is-touching', nearestDist < 90 && clamped < s.total - 8)
      dot.classList.toggle('is-impact', clamped >= s.total - 0.5)
    }

    function measure() {
      if (!s.ready || !s.total) return

      /* Progresso relativo à própria jornada: posição da viewport vs. geometria do traçado,
         sem depender da altura total da página (footer incluído) que dessincronizava tudo. */
      const desiredDocY = window.scrollY + window.innerHeight * VIEWPORT_ANCHOR
      const localY = Math.min(Math.max(desiredDocY - s.wrapTopDoc, s.minY), s.maxY)

      s.targetLen = lengthAtY(s.ys, s.ls, localY)
      if (!reduced) schedule()
    }

    let rafId = null

    function tick() {
      rafId = null
      if (disposed || !s.ready || !s.total) return

      s.posLen += (s.targetLen - s.posLen) * LERP
      if (Math.abs(s.targetLen - s.posLen) < SNAP_DISTANCE) s.posLen = s.targetLen

      apply(s.posLen)

      if (s.posLen !== s.targetLen && !disposed) rafId = requestAnimationFrame(tick)
    }

    function schedule() {
      if (rafId === null) rafId = requestAnimationFrame(tick)
    }

    function refreshGeometry() {
      rebuild()
      if (!s.ready) return
      if (reduced) {
        apply(s.total)
      } else {
        measure()
        schedule()
      }
    }

    function waitForImages() {
      const imgs = Array.from(document.querySelectorAll('[data-journey] img'))
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

    waitForImages().then(() => {
      if (!disposed) refreshGeometry()
    })
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!disposed) refreshGeometry()
      })
    }

    return () => {
      disposed = true
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
      {/* O wrapper recebe só a translação (via JS); o núcleo recebe só a escala.
          Juntos no mesmo elemento, `scale` multiplicaria o translate e jogaria
          o ponto para fora da página, esticando o scroll do documento. */}
      <div ref={dotRef} className="journey__dot">
        <span className="journey__dot-core" />
      </div>
    </div>
  )
}

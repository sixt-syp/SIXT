import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { gsap } from '../../lib/gsap'
import './GrowthChart.css'

const W = 560
const H = 320
const PAD_X = 34
const PAD_TOP = 44
const PAD_BOTTOM = 46

const POINTS_DATA = [
  { x: PAD_X, y: 236, label: 'ENTENDER' },
  { x: 158, y: 206, label: 'DIAGNOSTICAR' },
  { x: 282, y: 216, label: 'CONSTRUIR' },
  { x: 396, y: 148, label: 'EVOLUIR' },
  { x: W - PAD_X, y: 84, label: 'IMPACTO' },
]

/* O balão é centrado no ponto ativo; nas extremidades isso o jogaria
   para fora do SVG, então a posição é limitada à área visível. */
function clampTooltipX(point) {
  const halfWidth = (point.label.length * 8.8 + 28) / 2
  const min = halfWidth + 6
  const max = W - halfWidth - 6
  return Math.min(Math.max(point.x, min), max)
}

function smoothPath(pts) {
  let d = `M ${pts[0].x} ${pts[0].y}`
  for (let i = 1; i < pts.length; i++) {
    const p0 = pts[i - 1]
    const p1 = pts[i]
    const mx = (p0.x + p1.x) / 2
    d += ` C ${mx} ${p0.y}, ${mx} ${p1.y}, ${p1.x} ${p1.y}`
  }
  return d
}

export default function GrowthChart() {
  const rootRef = useRef(null)
  const lineRef = useRef(null)
  const [active, setActive] = useState(POINTS_DATA.length - 1)
  const [drawn, setDrawn] = useState(false)

  useLayoutEffect(() => {
    const el = lineRef.current
    const root = rootRef.current
    if (!el || !root) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      setDrawn(true)
      return
    }

    const len = el.getTotalLength()

    const ctx = gsap.context(() => {
      gsap.set(el, { strokeDasharray: len, strokeDashoffset: len })

      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 78%', once: true },
        onComplete: () => setDrawn(true),
      })

      tl.to(el, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.out' })
        .from(
          '.gchart__dot-point',
          {
            scale: 0,
            transformOrigin: '50% 50%',
            stagger: 0.08,
            duration: 0.45,
            ease: 'back.out(2.2)',
          },
          0.3
        )
        .from('.gchart__area', { opacity: 0, duration: 0.9, ease: 'power1.out' }, 0.5)
    }, root)

    return () => ctx.revert()
  }, [])

  const linePath = useMemo(() => smoothPath(POINTS_DATA), [])
  const areaPath = useMemo(
    () =>
      `${linePath} L ${POINTS_DATA[POINTS_DATA.length - 1].x} ${H - PAD_BOTTOM} L ${
        POINTS_DATA[0].x
      } ${H - PAD_BOTTOM} Z`,
    [linePath]
  )

  function handleMove(event) {
    const svg = event.currentTarget
    const rect = svg.getBoundingClientRect()
    const relX = ((event.clientX - rect.left) / rect.width) * W

    let nearest = 0
    let minDist = Infinity
    POINTS_DATA.forEach((p, i) => {
      const dist = Math.abs(p.x - relX)
      if (dist < minDist) {
        minDist = dist
        nearest = i
      }
    })
    setActive(nearest)
  }

  const activePoint = POINTS_DATA[active]

  return (
    <div ref={rootRef} className="gchart">
      <div className="gchart__bar">
        <span className="gchart__title">
          <i className="gchart__dot" aria-hidden="true" />
          CRESCIMENTO
        </span>
        <span className="gchart__chip">IMPACTO</span>
      </div>

      <svg
        className={`gchart__svg ${drawn ? 'is-drawn' : ''}`}
        viewBox={`0 0 ${W} ${H}`}
        role="img"
        aria-label="Gráfico ilustrativo de crescimento da marca ao longo das etapas: estratégia, design, tecnologia, resultado e impacto"
        onPointerMove={handleMove}
        onPointerDown={handleMove}
        onPointerLeave={() => setActive(POINTS_DATA.length - 1)}
      >
        <defs>
          <linearGradient id="gc-area" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A00FF" stopOpacity="0.22" />
            <stop offset="100%" stopColor="#8A00FF" stopOpacity="0" />
          </linearGradient>
        </defs>

        {[PAD_TOP, H / 2 - 10, H - PAD_BOTTOM].map((y) => (
          <line
            key={y}
            x1={PAD_X}
            x2={W - PAD_X}
            y1={y}
            y2={y}
            className="gchart__grid-line"
          />
        ))}

        <path d={areaPath} fill="url(#gc-area)" className="gchart__area" />

        <path ref={lineRef} d={linePath} className="gchart__line" />

        <line
          x1={activePoint.x}
          x2={activePoint.x}
          y1={PAD_TOP - 12}
          y2={H - PAD_BOTTOM}
          className="gchart__scan"
        />

        {POINTS_DATA.map((p, i) => (
          <circle
            key={p.label}
            cx={p.x}
            cy={p.y}
            r={i === active ? 7 : 4.5}
            className={`gchart__dot-point ${i === active ? 'is-active' : ''}`}
            style={{ '--i': i }}
          />
        ))}

        <text
          x={(POINTS_DATA[0].x + POINTS_DATA[POINTS_DATA.length - 1].x) / 2}
          y={H - 14}
          className="gchart__baseline"
          textAnchor="middle"
        >
          ESTRUTURA DIGITAL QUE ACOMPANHA O NEGÓCIO
        </text>

        <g
          className={`gchart__tooltip ${drawn ? 'is-visible' : ''}`}
          transform={`translate(${clampTooltipX(activePoint)}, ${activePoint.y - 22})`}
        >
          <rect
            x={-(activePoint.label.length * 4.4 + 14)}
            y={-13}
            width={activePoint.label.length * 8.8 + 28}
            height={26}
            rx={7}
          />
          <text textAnchor="middle" dominantBaseline="central">
            {activePoint.label}
          </text>
        </g>
      </svg>
    </div>
  )
}

import './ServiceVisual.css'

/* Painéis abstratos que substituem os placeholders de imagem do wireframe.
   Tudo em SVG/CSS: sem asset externo e sem custo de carregamento. */

function ScanVisual() {
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label="Ilustração de diagnóstico">
      <g className="sv-scan__rings">
        <circle cx="160" cy="120" r="34" />
        <circle cx="160" cy="120" r="62" />
        <circle cx="160" cy="120" r="90" />
      </g>
      <line className="sv-scan__axis" x1="40" y1="120" x2="280" y2="120" />
      <line className="sv-scan__axis" x1="160" y1="20" x2="160" y2="220" />
      <g className="sv-scan__sweep">
        <line x1="160" y1="120" x2="160" y2="30" />
      </g>
      <circle className="sv-scan__hit sv-scan__hit--a" cx="196" cy="86" r="5" />
      <circle className="sv-scan__hit sv-scan__hit--b" cx="118" cy="156" r="4" />
      <circle className="sv-scan__core" cx="160" cy="120" r="7" />
    </svg>
  )
}

function BrandVisual() {
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label="Ilustração de identidade visual">
      <text className="sv-brand__glyph" x="46" y="176">
        S
      </text>
      <g className="sv-brand__swatches">
        <rect x="176" y="56" width="46" height="46" rx="10" />
        <rect x="232" y="56" width="46" height="46" rx="10" />
        <rect x="176" y="112" width="46" height="46" rx="10" />
        <rect x="232" y="112" width="46" height="46" rx="10" />
      </g>
      <g className="sv-brand__rules">
        <line x1="176" y1="176" x2="278" y2="176" />
        <line x1="176" y1="190" x2="248" y2="190" />
      </g>
      <line className="sv-brand__baseline" x1="42" y1="186" x2="140" y2="186" />
    </svg>
  )
}

function SiteVisual() {
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label="Ilustração de criação de sites">
      <rect className="sv-site__frame" x="34" y="34" width="252" height="172" rx="12" />
      <line className="sv-site__chrome" x1="34" y1="66" x2="286" y2="66" />
      <g className="sv-site__dots">
        <circle cx="50" cy="50" r="4" />
        <circle cx="64" cy="50" r="4" />
        <circle cx="78" cy="50" r="4" />
      </g>
      <rect className="sv-site__hero" x="52" y="84" width="94" height="60" rx="8" />
      <g className="sv-site__lines">
        <rect x="162" y="86" width="106" height="9" rx="4.5" />
        <rect x="162" y="104" width="86" height="9" rx="4.5" />
        <rect x="162" y="122" width="98" height="9" rx="4.5" />
      </g>
      <rect className="sv-site__cta" x="52" y="160" width="72" height="24" rx="7" />
      <g className="sv-site__lines">
        <rect x="138" y="164" width="130" height="9" rx="4.5" />
      </g>
    </svg>
  )
}

function FlowVisual() {
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label="Ilustração de automações">
      <path
        className="sv-flow__path"
        d="M60 70 H150 Q170 70 170 90 V150 Q170 170 190 170 H262"
        fill="none"
      />
      <path
        className="sv-flow__path"
        d="M60 170 H110 Q130 170 130 150 V90 Q130 70 150 70 H262"
        fill="none"
      />
      <circle className="sv-flow__pulse" r="5" cx="0" cy="0">
        <animateMotion
          dur="4s"
          repeatCount="indefinite"
          path="M60 70 H150 Q170 70 170 90 V150 Q170 170 190 170 H262"
        />
      </circle>
      <g className="sv-flow__nodes">
        <rect x="30" y="54" width="34" height="32" rx="9" />
        <rect x="30" y="154" width="34" height="32" rx="9" />
        <rect x="256" y="54" width="34" height="32" rx="9" />
        <rect x="256" y="154" width="34" height="32" rx="9" />
      </g>
      <g className="sv-flow__hub">
        <rect x="128" y="100" width="44" height="40" rx="11" />
      </g>
    </svg>
  )
}

const VISUALS = {
  scan: ScanVisual,
  brand: BrandVisual,
  site: SiteVisual,
  flow: FlowVisual,
}

export default function ServiceVisual({ kind }) {
  const Visual = VISUALS[kind] || ScanVisual

  return (
    <div className={`sv sv--${kind}`}>
      <span className="sv__grid" aria-hidden="true" />
      <Visual />
    </div>
  )
}

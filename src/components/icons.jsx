const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 24, children, ...rest }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...base}
      {...rest}
    >
      {children}
    </svg>
  )
}

export function IconLayers(props) {
  return (
    <Svg {...props}>
      <path d="M12 3 3 8l9 5 9-5-9-5Z" />
      <path d="m3 13 9 5 9-5" />
      <circle cx="12" cy="8" r="1.6" />
    </Svg>
  )
}

export function IconPalette(props) {
  return (
    <Svg {...props}>
      <path d="M12 21a9 9 0 1 1 9-9c0 2-1.5 3-3 3h-2a2.5 2.5 0 0 0-2 4c.5.7 0 2-2 2Z" />
      <circle cx="7.8" cy="10.5" r="1" />
      <circle cx="11" cy="7.3" r="1" />
      <circle cx="15.4" cy="8.4" r="1" />
    </Svg>
  )
}

export function IconRefresh(props) {
  return (
    <Svg {...props}>
      <path d="M20 12a8 8 0 1 1-2.34-5.66" />
      <path d="M20 3v4h-4" />
      <circle cx="12" cy="12" r="2" />
    </Svg>
  )
}

export function IconLayout(props) {
  return (
    <Svg {...props}>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <path d="M3.5 9.5h17M9.5 9.5v10" />
    </Svg>
  )
}

export function IconBrowser(props) {
  return (
    <Svg {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 9h18" />
      <circle cx="6" cy="7" r="0.4" />
      <circle cx="8.4" cy="7" r="0.4" />
    </Svg>
  )
}

export function IconGrid(props) {
  return (
    <Svg {...props}>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <circle cx="16.75" cy="16.75" r="3.25" />
    </Svg>
  )
}

export function IconPen(props) {
  return (
    <Svg {...props}>
      <path d="m13 6 5 5L8 21H3v-5L13 6Z" />
      <path d="m11 8 5 5" />
      <path d="M15 4l2-2 5 5-2 2" />
    </Svg>
  )
}

export function IconStrategy(props) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M15.5 8.5 13 13l-4.5 2.5L11 11l4.5-2.5Z" />
    </Svg>
  )
}

export function IconResults(props) {
  return (
    <Svg {...props}>
      <path d="m4 17 5-5 3.5 3.5L19 9" />
      <path d="M14.5 9H19v4.5" />
    </Svg>
  )
}

export function IconArrowUpRight(props) {
  return (
    <Svg {...props}>
      <path d="M7 17 17 7" />
      <path d="M9 7h8v8" />
    </Svg>
  )
}

export function IconChevronLeft(props) {
  return (
    <Svg {...props}>
      <path d="m14 6-6 6 6 6" />
    </Svg>
  )
}

export function IconChevronRight(props) {
  return (
    <Svg {...props}>
      <path d="m10 6 6 6-6 6" />
    </Svg>
  )
}

export function IconMenu(props) {
  return (
    <Svg {...props}>
      <path d="M4 8h16M4 16h10" />
      <circle cx="19.5" cy="16" r="1.4" />
    </Svg>
  )
}

export function IconClose(props) {
  return (
    <Svg {...props}>
      <path d="m6 6 12 12M18 6 6 18" />
    </Svg>
  )
}

export const SERVICE_ICONS = {
  strategy: IconStrategy,
  layers: IconLayers,
  palette: IconPalette,
  refresh: IconRefresh,
  layout: IconLayout,
  browser: IconBrowser,
  grid: IconGrid,
  pen: IconPen,
}

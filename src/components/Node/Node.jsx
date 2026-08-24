import './Node.css'

export default function Node({ variant = 'dot', size, pulse = false, className = '', style }) {
  const classes = ['node', `node--${variant}`, pulse ? 'node--pulse' : '', className]
    .filter(Boolean)
    .join(' ')

  return (
    <span
      aria-hidden="true"
      className={classes}
      style={size ? { '--node-size': typeof size === 'number' ? `${size}px` : size, ...style } : style}
    />
  )
}

export function DotLine({ className = '' }) {
  return (
    <span aria-hidden="true" className={`dotline ${className}`.trim()}>
      <Node variant="dot" size={8} />
      <span className="connection-line" />
      <Node variant="dot" size={8} />
    </span>
  )
}

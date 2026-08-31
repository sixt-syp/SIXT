import './Marquee.css'

export default function Marquee({ items, speed = 32, className = '' }) {
  const track = (
    <ul className="marquee__track">
      {items.map((item) => (
        <li key={item} className="marquee__item">
          <span>{item}</span>
          <i className="marquee__sep" aria-hidden="true" />
        </li>
      ))}
    </ul>
  )

  return (
    <div
      className={`marquee ${className}`.trim()}
      style={{ '--marquee-duration': `${speed}s` }}
    >
      <div className="marquee__inner">
        {track}
        <div aria-hidden="true">{track}</div>
      </div>
    </div>
  )
}

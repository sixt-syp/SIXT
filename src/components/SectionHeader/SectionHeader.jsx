import Reveal from '../Reveal'
import './SectionHeader.css'

export default function SectionHeader({ label, title, description, split = false, id }) {
  return (
    <Reveal
      as="header"
      className={`sec-header ${split ? 'sec-header--split' : ''}`.trim()}
    >
      <div>
        <span className="section-label" data-label={label}>
          {label}
        </span>
        <h2 className="sec-header__title" id={id}>
          {title}
        </h2>
      </div>
      {description && <p className="sec-header__desc">{description}</p>}
    </Reveal>
  )
}

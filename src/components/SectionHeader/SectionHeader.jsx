import Reveal from '../Reveal'
import './SectionHeader.css'

export default function SectionHeader({
  label,
  title,
  description,
  split = false,
  centered = false,
  id,
}) {
  const classes = [
    'sec-header',
    split ? 'sec-header--split' : '',
    centered ? 'sec-header--centered' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <Reveal as="header" className={classes}>
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

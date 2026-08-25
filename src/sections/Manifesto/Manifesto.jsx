import Reveal from '../../components/Reveal'
import Node from '../../components/Node/Node'
import Marquee from '../../components/Marquee/Marquee'
import { MANIFESTO, PILLARS } from '../../data/content'
import './Manifesto.css'

const MARQUEE_ITEMS = PILLARS.map((pillar) => pillar.label)

export default function Manifesto() {
  return (
    <section
      className="section section--light manifesto"
      id="sobre"
      data-journey
      aria-labelledby="sobre-title"
    >
      <div className="container section__inner">
        <Reveal as="p" className="section-label">
          Manifesto
        </Reveal>

        <h2 className="manifesto__title" id="sobre-title">
          <Reveal as="span" className="manifesto__line" delay={60}>
            {MANIFESTO.line1Plain} <em>{MANIFESTO.line1Accent}</em>
          </Reveal>
          <Reveal as="span" className="manifesto__line manifesto__line--indent" delay={180}>
            {MANIFESTO.line2Plain} <em>{MANIFESTO.line2Accent}</em>
          </Reveal>
        </h2>

        <Reveal className="manifesto__body" delay={280}>
          <Node variant="core" size={18} />
          <p>{MANIFESTO.body}</p>
        </Reveal>

        <ul className="manifesto__principles" aria-label="Princípios da SIXT">
          {MANIFESTO.principles.map((principle, i) => (
            <Reveal as="li" key={principle.id} className="manifesto__principle" delay={360 + i * 90}>
              <i aria-hidden="true">0{i + 1}</i>
              <h3>{principle.label}</h3>
              <p>{principle.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>

      <Marquee items={MARQUEE_ITEMS} className="manifesto__marquee" speed={30} />
    </section>
  )
}

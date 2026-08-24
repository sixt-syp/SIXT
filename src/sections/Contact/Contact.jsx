import { LuArrowUpRight } from 'react-icons/lu'
import Button from '../../components/Button/Button'
import ExternalLink from '../../components/ExternalLink'
import Reveal from '../../components/Reveal'
import Node from '../../components/Node/Node'
import { SOCIALS, CONTACT } from '../../data/content'
import './Contact.css'

export default function Contact() {
  return (
    <section
      className="section section--light contact"
      id="contato"
      data-journey
      aria-labelledby="contato-title"
    >
      <div className="container section__inner">
        <Reveal as="p" className="section-label">
          04 — Contato
        </Reveal>

        <Reveal as="h2" className="contact__title" delay={80}>
          {CONTACT.titlePlain}
          <span>{CONTACT.titleAccent}</span>
        </Reveal>

        <Reveal as="p" className="contact__desc" delay={160}>
          {CONTACT.description}
        </Reveal>

        <Reveal delay={240} className="contact__actions">
          <Button href="mailto:codesixtech@gmail.com">
            {CONTACT.cta}
            <LuArrowUpRight size={16} strokeWidth={2} />
          </Button>
        </Reveal>

        <ul className="contact__links">
          {SOCIALS.map((social, i) => (
            <Reveal as="li" key={social.label} delay={300 + i * 80}>
              <ExternalLink href={social.href}>
                <Node variant="dot" size={8} />
                <span>{social.label}</span>
                <LuArrowUpRight size={18} strokeWidth={1.75} className="contact__arrow" />
              </ExternalLink>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}

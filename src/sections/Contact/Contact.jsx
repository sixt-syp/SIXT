import { LuArrowUpRight, LuCheck } from 'react-icons/lu'
import Button from '../../components/Button/Button'
import ExternalLink from '../../components/ExternalLink'
import Reveal from '../../components/Reveal'
import Magnetic from '../../components/Magnetic/Magnetic'
import Node from '../../components/Node/Node'
import { SOCIALS, CONTACT, TAGLINE } from '../../data/content'
import './Contact.css'

function ContactVisual() {
  return (
    <div className="contact__visual" aria-hidden="true">
      <span className="contact__orbit contact__orbit--lg" />
      <span className="contact__orbit contact__orbit--md" />
      <span className="contact__orbit contact__orbit--sm" />

      <span className="contact__sat contact__sat--a">
        <Node variant="dot" size={9} />
      </span>
      <span className="contact__sat contact__sat--b">
        <Node variant="dot" size={7} />
      </span>

      <p className="contact__visual-text">{TAGLINE}</p>
    </div>
  )
}

export default function Contact() {
  return (
    <section
      className="section section--light section--depth contact"
      id="contato"
      data-journey
      aria-labelledby="contato-title"
    >
      <div className="container section__inner contact__inner">
        <Reveal className="contact__media">
          <ContactVisual />
        </Reveal>

        <div className="contact__body">
          <Reveal as="p" className="section-label">
            {CONTACT.label}
          </Reveal>

          <Reveal as="h2" className="contact__title" id="contato-title" delay={80}>
            {CONTACT.titlePlain}
            <span>{CONTACT.titleAccent}</span>
          </Reveal>

          <Reveal as="p" className="contact__desc" delay={140}>
            {CONTACT.description}
          </Reveal>

          <Reveal as="ul" className="contact__bullets" delay={200}>
            {CONTACT.bullets.map((bullet) => (
              <li key={bullet}>
                <LuCheck size={15} strokeWidth={2.5} aria-hidden="true" />
                <span>{bullet}</span>
              </li>
            ))}
          </Reveal>

          <Reveal className="contact__actions" delay={260}>
            <Magnetic>
              <Button href="mailto:codesixtech@gmail.com" size="lg">
                {CONTACT.cta}
                <LuArrowUpRight size={18} strokeWidth={2} />
              </Button>
            </Magnetic>
          </Reveal>

          <ul className="contact__links">
            {SOCIALS.map((social, i) => (
              <Reveal as="li" key={social.label} delay={320 + i * 70}>
                {social.external ? (
                  <ExternalLink href={social.href}>
                    <Node variant="dot" size={7} />
                    <span>{social.label}</span>
                    <LuArrowUpRight size={16} strokeWidth={1.75} className="contact__arrow" />
                  </ExternalLink>
                ) : (
                  <a href={social.href}>
                    <Node variant="dot" size={7} />
                    <span>{social.label}</span>
                    <LuArrowUpRight size={16} strokeWidth={1.75} className="contact__arrow" />
                  </a>
                )}
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

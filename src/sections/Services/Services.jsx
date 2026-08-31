import { LuAppWindow, LuArrowUpRight, LuCompass, LuPalette, LuRefreshCw } from 'react-icons/lu'
import Button from '../../components/Button/Button'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Reveal from '../../components/Reveal'
import Magnetic from '../../components/Magnetic/Magnetic'
import ServiceVisual from '../../components/ServiceVisual/ServiceVisual'
import Pillars from '../Pillars/Pillars'
import { SERVICES, SERVICES_HEADER } from '../../data/content'
import './Services.css'

const SERVICE_ICONS = {
  strategy: LuCompass,
  palette: LuPalette,
  browser: LuAppWindow,
  refresh: LuRefreshCw,
}

function ServiceBlock({ service, flipped }) {
  const Icon = SERVICE_ICONS[service.icon]

  return (
    <article className={`svc-block ${flipped ? 'svc-block--flipped' : ''}`.trim()}>
      <Reveal className="svc-block__media" delay={flipped ? 80 : 0}>
        <ServiceVisual kind={service.visual} />
        <span className="svc-block__number" aria-hidden="true">
          {service.number}
        </span>
      </Reveal>

      <Reveal className="svc-block__body" delay={flipped ? 0 : 80}>
        <p className="svc-block__eyebrow">
          <span className="svc-block__icon" aria-hidden="true">
            <Icon size={16} strokeWidth={1.75} />
          </span>
          {service.tagline}
        </p>

        <h3 className="svc-block__title">{service.title}</h3>
        <p className="svc-block__desc">{service.description}</p>

        <ul className="svc-block__items">
          {service.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>

        <Magnetic className="svc-block__cta">
          <Button href={service.cta.href} variant="ghost">
            {service.cta.label}
            <LuArrowUpRight size={16} strokeWidth={2} />
          </Button>
        </Magnetic>
      </Reveal>
    </article>
  )
}

export default function Services() {
  return (
    <section
      className="section section--light services"
      id="servicos"
      data-journey
      aria-labelledby="servicos-title"
    >
      <Pillars />

      <div className="container services__inner">
        <SectionHeader
          label={SERVICES_HEADER.label}
          id="servicos-title"
          title={
            <>
              {SERVICES_HEADER.titlePlain}
              <span className="text-accent">{SERVICES_HEADER.titleAccent}</span>
            </>
          }
          description={SERVICES_HEADER.description}
          split
        />

        <div className="services__blocks">
          {SERVICES.map((service, i) => (
            <ServiceBlock key={service.number} service={service} flipped={i % 2 === 1} />
          ))}
        </div>

        <Reveal className="services__more" delay={120}>
          <p>Seu caso não se encaixa em nada disso?</p>
          <Button href="#contato" variant="ghost">
            Quero entender
            <LuArrowUpRight size={16} strokeWidth={2} />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

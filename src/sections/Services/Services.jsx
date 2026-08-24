import { useState } from 'react'
import SectionHeader from '../../components/SectionHeader'
import Reveal from '../../components/Reveal'
import { IconArrowUpRight, SERVICE_ICONS } from '../../components/icons'
import { SERVICES, SERVICES_HEADER } from '../../data/content'
import './Services.css'

export default function Services() {
  const [openNumber, setOpenNumber] = useState(SERVICES[0].number)

  return (
    <section
      className="section section--light services"
      id="servicos"
      data-journey
      aria-labelledby="servicos-title"
    >
      <div className="container section__inner">
        <SectionHeader
          label="01 — Serviços"
          title={
            <>
              {SERVICES_HEADER.titlePlain}
              <span className="text-accent">{SERVICES_HEADER.titleAccent}</span>
            </>
          }
          description={SERVICES_HEADER.description}
          split
        />

        <ol className="services__list">
          {SERVICES.map((service, i) => {
            const Icon = SERVICE_ICONS[service.icon]
            const isOpen = openNumber === service.number

            return (
              <Reveal as="li" key={service.number} delay={i * 60}>
                <article className={`svc ${isOpen ? 'svc--open' : ''}`}>
                  <h3 className="svc__heading">
                    <button
                      type="button"
                      className="svc__trigger"
                      id={`svc-trigger-${service.number}`}
                      aria-expanded={isOpen}
                      aria-controls={`svc-panel-${service.number}`}
                      onClick={() => setOpenNumber(isOpen ? null : service.number)}
                    >
                      <span className="svc__number" aria-hidden="true">
                        {service.number}
                      </span>

                      <span className="svc__icon" aria-hidden="true">
                        <Icon size={20} strokeWidth={1.75} />
                      </span>

                      <span className="svc__titles">
                        <span className="svc__title">{service.title}</span>
                        <span className="svc__tagline">{service.tagline}</span>
                      </span>

                      <span className="svc__plus" aria-hidden="true">
                        +
                      </span>
                    </button>
                  </h3>

                  <div
                    className="svc__collapse"
                    id={`svc-panel-${service.number}`}
                    role="region"
                    aria-labelledby={`svc-trigger-${service.number}`}
                  >
                    <div className="svc__panel">
                      <div className="svc__panel-inner">
                        <p className="svc__desc">{service.description}</p>

                        <ul className="svc__items">
                          {service.items.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>

                        {service.price && <p className="svc__price">{service.price}</p>}
                      </div>
                    </div>
                  </div>
                </article>
              </Reveal>
            )
          })}
        </ol>

        <Reveal className="services__more" delay={120}>
          <p>Seu caso não se encaixa em nada disso?</p>
          <a href="#contato" className="btn btn--secondary btn--md">
            Quero entender
            <IconArrowUpRight size={16} strokeWidth={2} />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

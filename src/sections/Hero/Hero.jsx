import { LuArrowDown, LuArrowUpRight } from 'react-icons/lu'
import Button from '../../components/Button/Button'
import Reveal from '../../components/Reveal'
import Magnetic from '../../components/Magnetic/Magnetic'
import Node from '../../components/Node/Node'
import GrowthChart from '../../components/GrowthChart/GrowthChart'
import { HERO } from '../../data/content'
import './Hero.css'

export default function Hero() {
  return (
    <section className="section section--dark hero" id="inicio" data-journey>
      <div className="hero__inner container section__inner">
        <div className="hero__content">

          <Reveal as="h1" className="hero__title" delay={80}>
            <span className="hero__title-line">{HERO.titleLine1}</span>
            <span className="hero__title-line">
              <em>{HERO.titleLine2Plain}</em>
            </span>
          </Reveal>

          <Reveal as="p" className="hero__desc" delay={180}>
            {HERO.description}
          </Reveal>

          <Reveal className="hero__actions" delay={260}>
            <Magnetic>
              <Button href={HERO.ctaPrimary.href}>
                {HERO.ctaPrimary.label}
                <LuArrowUpRight size={16} strokeWidth={2} />
              </Button>
            </Magnetic>
            <Button href={HERO.ctaSecondary.href} variant="secondary">
              {HERO.ctaSecondary.label}
            </Button>
          </Reveal>
        </div>

        <Reveal className="hero__side" delay={400}>
          <GrowthChart />
        </Reveal>
      </div>

      <a className="hero__scroll-hint" href="#servicos" aria-label="Ir para os serviços">
        <span className="hero__scroll-track" aria-hidden="true">
          <LuArrowDown size={14} strokeWidth={2} />
        </span>
        <span className="hero__scroll-text">SCROLL</span>
      </a>
    </section>
  )
}

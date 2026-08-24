import Button from '../../components/Button/Button'
import Reveal from '../../components/Reveal'
import { DotLine } from '../../components/Node/Node'
import GrowthChart from '../../components/GrowthChart/GrowthChart'
import { HERO } from '../../data/content'
import './Hero.css'

export default function Hero() {
  return (
    <section className="section section--dark hero" id="inicio" data-journey>
      <div className="hero__inner container section__inner">
        <div className="hero__content">
          <Reveal as="h1" className="hero__title">
            {HERO.titleLine1}
            <span className="hero__title-line">
              <em>{HERO.titleLine2Plain}</em>
            </span>
          </Reveal>

          <Reveal className="hero__divider" delay={180} aria-hidden="true">
            <DotLine />
          </Reveal>

          <Reveal as="p" className="hero__desc" delay={240}>
            {HERO.description}
          </Reveal>

          <Reveal className="hero__actions" delay={320}>
            <Button href={HERO.ctaPrimary.href}>{HERO.ctaPrimary.label}</Button>
            <Button href={HERO.ctaSecondary.href} variant="secondary">
              {HERO.ctaSecondary.label}
            </Button>
          </Reveal>
        </div>

        <Reveal className="hero__side" delay={380}>
          <GrowthChart />
        </Reveal>

        <Reveal className="hero__scroll-hint" delay={520} aria-hidden="true">
          <DotLine />
          <span>SCROLL</span>
        </Reveal>
      </div>
    </section>
  )
}

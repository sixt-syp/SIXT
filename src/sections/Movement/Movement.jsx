import { useLayoutEffect, useRef } from 'react'
import { LuArrowUpRight } from 'react-icons/lu'
import Button from '../../components/Button/Button'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Reveal from '../../components/Reveal'
import Magnetic from '../../components/Magnetic/Magnetic'
import Node from '../../components/Node/Node'
import { gsap } from '../../lib/gsap'
import { MOVEMENT_STEPS, MOVEMENT_HEADER } from '../../data/content'
import './Movement.css'

const NODE_BY_STATE = {
  dot: { variant: 'dot', size: 14 },
  pair: { variant: 'dot', size: 12 },
  core: { variant: 'core', size: 20 },
  ring: { variant: 'ring', size: 22 },
  solid: { variant: 'dot', size: 18 },
}

export default function Movement() {
  const railRef = useRef(null)
  const fillRef = useRef(null)
  const stepRefs = useRef([])

  useLayoutEffect(() => {
    const rail = railRef.current
    const fill = fillRef.current
    if (!rail || !fill) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const steps = stepRefs.current.filter(Boolean)

    if (reduced) {
      gsap.set(fill, { scaleX: 1, scaleY: 1 })
      steps.forEach((el) => el.classList.add('is-on'))
      return
    }

    const total = MOVEMENT_STEPS.length

    const ctx = gsap.context(() => {
      gsap.fromTo(
        fill,
        { '--mv-fill': 0 },
        {
          '--mv-fill': 1,
          ease: 'none',
          scrollTrigger: {
            trigger: rail,
            start: 'top 78%',
            end: 'bottom 42%',
            scrub: 0.6,
            onUpdate: (self) => {
              /* O passo acende quando a barra alcança o seu ponto na trilha. */
              steps.forEach((el, i) => {
                const threshold = total > 1 ? i / (total - 1) : 0
                el.classList.toggle('is-on', self.progress >= threshold - 0.02)
              })
            },
          },
        }
      )
    }, rail)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="section section--dark section--depth movement"
      id="movimento"
      data-journey
      aria-labelledby="movimento-title"
    >
      <div className="container section__inner">
        <SectionHeader
          label={MOVEMENT_HEADER.label}
          id="movimento-title"
          title={
            <>
              {MOVEMENT_HEADER.titlePlain}
              <span className="text-accent">{MOVEMENT_HEADER.titleAccent}</span>
            </>
          }
          description={MOVEMENT_HEADER.description}
          centered
        />

        <ol className="movement__rail" ref={railRef}>
          <span className="movement__track" aria-hidden="true">
            <span className="movement__track-fill" ref={fillRef} />
          </span>

          {MOVEMENT_STEPS.map((step, i) => {
            const node = NODE_BY_STATE[step.state]

            return (
              <Reveal as="li" key={step.id} className="mv" delay={i * 90}>
                <div className="mv__disc" ref={(el) => (stepRefs.current[i] = el)}>
                  <span className="mv__step" aria-hidden="true">
                    {step.step}
                  </span>
                  <span className="mv__node" aria-hidden="true">
                    {step.state === 'pair' ? (
                      <span className="mv__pair">
                        <Node variant="dot" size={9} />
                        <Node variant="dot" size={9} />
                      </span>
                    ) : (
                      <Node {...node} />
                    )}
                  </span>
                </div>

                <h3 className="mv__label">{step.label}</h3>
                <p className="mv__text">{step.text}</p>
              </Reveal>
            )
          })}
        </ol>

        <Reveal className="movement__cta" delay={160}>
          <Magnetic>
            <Button href={MOVEMENT_HEADER.cta.href} variant="glass">
              {MOVEMENT_HEADER.cta.label}
              <LuArrowUpRight size={16} strokeWidth={2} />
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

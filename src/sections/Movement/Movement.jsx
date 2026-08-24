import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Reveal from '../../components/Reveal'
import Node from '../../components/Node/Node'
import { MOVEMENT_STEPS, MOVEMENT_HEADER } from '../../data/content'
import './Movement.css'

const NODE_BY_STATE = {
  dot: { variant: 'dot', size: 16 },
  pair: { variant: 'dot', size: 12 },
  core: { variant: 'core', size: 22 },
  ring: { variant: 'ring', size: 24 },
  solid: { variant: 'dot', size: 20 },
}

export default function Movement() {
  return (
    <section
      className="section section--dark section--depth movement"
      id="movimento"
      data-journey
      aria-labelledby="movimento-title"
    >
      <div className="container section__inner">
        <SectionHeader
          label="02 — Metodologia"
          title={
            <>
              {MOVEMENT_HEADER.titlePlain}
              <span className="text-accent">{MOVEMENT_HEADER.titleAccent}</span>
            </>
          }
          description={MOVEMENT_HEADER.description}
          split
        />

        <ol className="movement__timeline">
          {MOVEMENT_STEPS.map((step, i) => {
            const node = NODE_BY_STATE[step.state]
            const isLast = i === MOVEMENT_STEPS.length - 1

            return (
              <Reveal as="li" key={step.id} className={`mv mv--${i % 2 === 0 ? 'left' : 'right'}`} delay={i * 80}>
                <div className="mv__marker">
                  {step.state === 'pair' ? (
                    <span className="mv__pair" aria-hidden="true">
                      <Node variant="dot" size={10} />
                      <Node variant="dot" size={10} />
                    </span>
                  ) : (
                    <Node {...node} pulse={isLast} />
                  )}
                  {!isLast && <span className="mv__connector" aria-hidden="true" />}
                </div>

                <div className="mv__body">
                  <h3 className="mv__label">{step.label}</h3>
                  <p className="mv__text">{step.text}</p>
                </div>
              </Reveal>
            )
          })}
        </ol>
      </div>
    </section>
  )
}

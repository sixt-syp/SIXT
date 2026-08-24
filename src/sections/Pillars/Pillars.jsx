import {
  LuChartLine,
  LuCode,
  LuCompass,
  LuLayoutGrid,
  LuPalette,
  LuRefreshCw,
} from 'react-icons/lu'
import Reveal from '../../components/Reveal'
import { PILLARS } from '../../data/content'
import './Pillars.css'

const PILLAR_ICONS = {
  compass: LuCompass,
  palette: LuPalette,
  layout: LuLayoutGrid,
  code: LuCode,
  refresh: LuRefreshCw,
  chart: LuChartLine,
}

export default function Pillars() {
  return (
    <section className="pillars" aria-labelledby="pilares-title">
      <h2 className="pillars__sr-title" id="pilares-title">
        Nossas frentes de atuação
      </h2>

      <ul className="pillars__list container">
        {PILLARS.map((pillar, i) => {
          const Icon = PILLAR_ICONS[pillar.icon]

          return (
            <Reveal as="li" key={pillar.id} className="pillars__item" delay={i * 70}>
              <span className="pillars__disc">
                <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
              </span>
              <span className="pillars__label">{pillar.label}</span>
            </Reveal>
          )
        })}
      </ul>
    </section>
  )
}

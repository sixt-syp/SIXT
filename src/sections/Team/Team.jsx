import { useState } from 'react'
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard, A11y } from 'swiper/modules'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Reveal from '../../components/Reveal'
import Node from '../../components/Node/Node'
import { TEAM, TEAM_HEADER } from '../../data/content'
import './Team.css'

function MemberCard({ member }) {
  const [error, setError] = useState(false)
  const initial = member.name.trim().charAt(0)

  return (
    <article className="member">
      <div className="member__media">
        {error ? (
          <span className="member__fallback" aria-hidden="true">
            {initial}
          </span>
        ) : (
          <img
            src={member.photo}
            alt={`Foto de ${member.name}, integrante da equipe SIXT`}
            loading="lazy"
            decoding="async"
            onError={() => setError(true)}
          />
        )}
        <Node variant="dot" size={10} className="member__node" />
      </div>

      <div className="member__info">
        <h3 className="member__name">{member.name}</h3>
        <p className="member__bio">{member.bio}</p>
      </div>

      <div className="member__links">
        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
          LinkedIn
        </a>
        <a href={member.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </div>
    </article>
  )
}

export default function Team() {
  return (
    <section
      className="section section--dark team"
      id="equipe"
      data-journey
      aria-labelledby="equipe-title"
    >
      <div className="container section__inner">
        <div className="team__header-row">
          <SectionHeader
            label="03 — Equipe"
            title={
              <>
                {TEAM_HEADER.titlePlain}
                <span className="text-accent">{TEAM_HEADER.titleAccent}</span>
              </>
            }
            description={TEAM_HEADER.description}
          />

          <Reveal className="team__nav" delay={150}>
            <button
              type="button"
              className="team__nav-btn team__nav-btn--prev"
              aria-label="Integrantes anteriores"
            >
              <LuChevronLeft size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              className="team__nav-btn team__nav-btn--next"
              aria-label="Próximos integrantes"
            >
              <LuChevronRight size={20} strokeWidth={2} />
            </button>
          </Reveal>
        </div>

        <Reveal delay={120}>
          <Swiper
            className="team__carousel"
            modules={[Navigation, Pagination, Keyboard, A11y]}
            slidesPerView={1}
            spaceBetween={16}
            loop
            speed={600}
            navigation={{
              prevEl: '.team__nav-btn--prev',
              nextEl: '.team__nav-btn--next',
            }}
            pagination={{
              el: '.team__pagination',
              clickable: true,
            }}
            keyboard={{ enabled: true, onlyInViewport: true }}
            a11y={{
              prevSlideMessage: 'Integrantes anteriores',
              nextSlideMessage: 'Próximos integrantes',
            }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
          >
            {TEAM.map((member) => (
              <SwiperSlide key={member.name} className="team__slide">
                <MemberCard member={member} />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="team__pagination" />
        </Reveal>
      </div>
    </section>
  )
}

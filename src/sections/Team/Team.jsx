import { useEffect, useRef, useState } from 'react'
import {
  LuArrowLeft,
  LuArrowRight,
  LuArrowUpRight,
  LuGithub,
  LuLinkedin,
} from 'react-icons/lu'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard, Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

import Button from '../../components/Button/Button'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Reveal from '../../components/Reveal'
import Magnetic from '../../components/Magnetic/Magnetic'
import { TEAM, TEAM_HEADER } from '../../data/content'
import './Team.css'

const CAROUSEL_QUERY = '(max-width: 900px)'

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
            alt={`Retrato de ${member.name}`}
            loading="lazy"
            decoding="async"
            onError={() => setError(true)}
          />
        )}

        <span className="member__area">{member.area}</span>
      </div>

      <div className="member__info">
        <h3 className="member__name">{member.name}</h3>
        <p className="member__role">{member.role}</p>
        <p className="member__bio">{member.bio}</p>
      </div>

      <div className="member__links">
        <a
          href={member.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`LinkedIn de ${member.name}`}
        >
          <LuLinkedin size={17} strokeWidth={1.75} />
        </a>
        <a
          href={member.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`GitHub de ${member.name}`}
        >
          <LuGithub size={17} strokeWidth={1.75} />
        </a>
      </div>
    </article>
  )
}

export default function Team() {
  const [isCarousel, setIsCarousel] = useState(() =>
    window.matchMedia(CAROUSEL_QUERY).matches
  )
  const prevRef = useRef(null)
  const nextRef = useRef(null)
  const dotsRef = useRef(null)

  useEffect(() => {
    const mq = window.matchMedia(CAROUSEL_QUERY)
    const onChange = (e) => setIsCarousel(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  return (
    <section
      className="section section--dark team"
      id="equipe"
      data-journey
      aria-labelledby="equipe-title"
    >
      <div className="container section__inner">
        <SectionHeader
          label={TEAM_HEADER.label}
          id="equipe-title"
          title={
            <>
              {TEAM_HEADER.titlePlain}
              <span className="text-accent">{TEAM_HEADER.titleAccent}</span>
            </>
          }
          description={TEAM_HEADER.description}
          split
        />

        {isCarousel ? (
          <>
            <Swiper
              className="team__swiper"
              modules={[Keyboard, Navigation, Pagination]}
              speed={550}
              grabCursor
              keyboard={{ enabled: true, onlyInViewport: true }}
              navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
              pagination={{
                el: dotsRef.current,
                clickable: true,
                bulletClass: 'team__dot',
                bulletActiveClass: 'team__dot--active',
              }}
              onBeforeInit={(swiper) => {
                swiper.params.navigation.prevEl = prevRef.current
                swiper.params.navigation.nextEl = nextRef.current
                swiper.params.pagination.el = dotsRef.current
              }}
              breakpoints={{
                0: { slidesPerView: 1.06, spaceBetween: 16 },
                560: { slidesPerView: 2, spaceBetween: 24 },
              }}
            >
              {TEAM.map((member) => (
                <SwiperSlide key={member.name} className="team__slide">
                  <MemberCard member={member} />
                </SwiperSlide>
              ))}
            </Swiper>

            <div className="team__controls">
              <Button
                ref={prevRef}
                variant="icon"
                size="sm"
                className="team__nav"
                aria-label="Integrantes anteriores"
              >
                <LuArrowLeft size={18} strokeWidth={1.75} />
              </Button>

              <div className="team__dots" ref={dotsRef} />

              <Button
                ref={nextRef}
                variant="icon"
                size="sm"
                className="team__nav"
                aria-label="Próximos integrantes"
              >
                <LuArrowRight size={18} strokeWidth={1.75} />
              </Button>
            </div>
          </>
        ) : (
          <ul className="team__grid">
            {TEAM.map((member, i) => (
              <Reveal as="li" key={member.name} delay={(i % 3) * 90}>
                <MemberCard member={member} />
              </Reveal>
            ))}
          </ul>
        )}

        <Reveal className="team__cta" delay={140}>
          <Magnetic>
            <Button href={TEAM_HEADER.cta.href}>
              {TEAM_HEADER.cta.label}
              <LuArrowUpRight size={16} strokeWidth={2} />
            </Button>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  )
}

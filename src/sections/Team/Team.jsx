import { useState } from 'react'
import { LuArrowUpRight, LuGithub, LuLinkedin } from 'react-icons/lu'

import Button from '../../components/Button/Button'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import Reveal from '../../components/Reveal'
import Magnetic from '../../components/Magnetic/Magnetic'
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

        <ul className="team__grid">
          {TEAM.map((member, i) => (
            <Reveal as="li" key={member.name} delay={(i % 3) * 90}>
              <MemberCard member={member} />
            </Reveal>
          ))}
        </ul>

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

import Reveal from './Reveal'
import Node from './Node'
import { IconArrowUpRight } from './icons'
import { NAV_LINKS, SERVICES, SOCIALS, TAGLINE, FOOTER } from '../data/content'
import logoSvg from '../assets/illustrations/logo.svg'
import './Footer.css'

const EXPLORE = [
  { label: 'Início', href: '#inicio' },
  ...NAV_LINKS,
  { label: 'Metodologia', href: '#movimento' },
]

const SERVICE_LINKS = SERVICES.map((service) => ({
  label: service.title,
  href: '#servicos',
}))

function LinkColumn({ label, links, listName }) {
  return (
    <nav className="footer__col" aria-label={listName}>
      <h3 className="footer__heading">{label}</h3>
      <ul className="footer__links">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="container">
        <Reveal className="footer__top">
          <div className="footer__brand">
            <img src={logoSvg} alt="SIXT" className="footer__logo-img" width="52" height="41" />
            <p className="footer__tagline">{TAGLINE}</p>
            <p className="footer__desc">{FOOTER.description}</p>
          </div>

          <LinkColumn label="Explore" listName="Navegação do rodapé" links={EXPLORE} />
          <LinkColumn label="Serviços" listName="Serviços no rodapé" links={SERVICE_LINKS} />

          <div className="footer__col">
            <h3 className="footer__heading">Fale com a SIXT</h3>
            <ul className="footer__links">
              {SOCIALS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    {...(social.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal className="footer__cta" delay={120}>
          <div className="footer__cta-label">
            <span className="footer__heading">Próximo passo</span>
            <p>Vamos tirar isso do papel?</p>
          </div>
          <a href="mailto:codesixtech@gmail.com" className="btn btn--primary btn--lg">
            Começar meu projeto
            <IconArrowUpRight size={18} strokeWidth={2} />
          </a>
        </Reveal>

        <div className="footer__rule-wrap">
          <span className="footer__rule" aria-hidden="true">
            <Node variant="dot" size={7} className="footer__rule-dot" />
          </span>
        </div>

        <div className="footer__legal">
          <span>© {year} SIX Technology</span>
          <span className="footer__legal-signature">{FOOTER.signature}</span>
        </div>
      </div>
    </footer>
  )
}

import { LuArrowUpRight } from 'react-icons/lu'
import Reveal from '../Reveal'
import Button from '../Button/Button'
import ExternalLink from '../ExternalLink'
import Magnetic from '../Magnetic/Magnetic'
import Node from '../Node/Node'
import { SERVICES, SOCIALS, TAGLINE, FOOTER } from '../../data/content'
import logoSvg from '../../assets/illustrations/logo.svg'
import './Footer.css'

const EXPLORE = [
  { label: 'Início', href: '#inicio' },
  { label: 'Sobre', href: '#sobre' },
  { label: 'Equipe', href: '#equipe' },
  { label: 'Contato', href: '#contato' },
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
            {link.external ? (
              <ExternalLink href={link.href}>{link.label}</ExternalLink>
            ) : (
              <a href={link.href}>{link.label}</a>
            )}
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
            <p className="footer__tagline">{TAGLINE}</p>
            <p className="footer__desc">{FOOTER.description}</p>
          </div>

          <LinkColumn label="Explore" listName="Navegação do rodapé" links={EXPLORE} />
          <LinkColumn label="Serviços" listName="Serviços no rodapé" links={SERVICE_LINKS} />
          <LinkColumn label="Contato" listName="Contatos no rodapé" links={SOCIALS} />
        </Reveal>

        <div className="footer__rule-wrap">
          <span className="footer__rule" aria-hidden="true">
            <Node variant="dot" size={7} className="footer__rule-dot" />
          </span>
        </div>

        {/* Base: marca à esquerda, ação à direita — como no wireframe */}
        <div className="footer__baseline">
          <a href="#inicio" className="footer__mark" aria-label="SIXT — voltar ao início">
            <img src={logoSvg} alt="" className="footer__logo-img" width="52" height="41" />
            <span className="footer__mark-name">SIX Technology</span>
          </a>

          <Magnetic>
            <Button href="mailto:codesixtech@gmail.com">
              Começar meu projeto
              <LuArrowUpRight size={16} strokeWidth={2} />
            </Button>
          </Magnetic>
        </div>

        <div className="footer__legal">
          <span>© {year} SIX Technology</span>
          <span className="footer__legal-signature">{FOOTER.signature}</span>
        </div>
      </div>
    </footer>
  )
}

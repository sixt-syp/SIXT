import { useEffect, useRef, useState } from 'react'
import { LuMenu, LuX } from 'react-icons/lu'
import Button from '../Button/Button'
import { NAV_LINKS } from '../../data/content'
import Node from '../Node/Node'
import logoSvg from '../../assets/illustrations/logo.svg'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [activeId, setActiveId] = useState('')
  const menuButtonRef = useRef(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!('IntersectionObserver' in window)) return

    const sections = NAV_LINKS.map((l) => document.querySelector(l.href)).filter(Boolean)

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(`#${entry.target.id}`)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )

    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="nav__bar container">
        <a href="#inicio" className="nav__logo" onClick={closeMenu} aria-label="SIXT — voltar ao início">
          <img src={logoSvg} alt="SIXT" className="nav__logo-img" width="46" height="36" />
        </a>

        <nav className="nav__links" aria-label="Navegação principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`nav__link ${activeId === link.href ? 'is-active' : ''}`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <Button href="#contato" variant="secondary" size="sm" className="nav__cta">
            Vamos conversar
          </Button>

          <button
            ref={menuButtonRef}
            type="button"
            className="nav__toggle"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <LuX size={26} /> : <LuMenu size={26} />}
          </button>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`nav__menu ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
      >
        <nav className="nav__menu-links" aria-label="Navegação do menu">
          {NAV_LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="nav__menu-link"
              style={{ '--i': i }}
              onClick={closeMenu}
              tabIndex={open ? 0 : -1}
            >
              <Node variant="dot" size={10} />
              {link.label}
            </a>
          ))}
        </nav>

        <Button href="#contato" onClick={closeMenu} tabIndex={open ? 0 : -1}>
          [ Vamos conversar ]
        </Button>
      </div>
    </header>
  )
}

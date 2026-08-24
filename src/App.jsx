import { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollJourney from './components/ScrollJourney/ScrollJourney'
import { ScrollTrigger } from './lib/gsap'
import Hero from './sections/Hero/Hero'
import Services from './sections/Services/Services'
import Movement from './sections/Movement/Movement'
import Manifesto from './sections/Manifesto/Manifesto'
import Team from './sections/Team/Team'
import Contact from './sections/Contact/Contact'

export default function App() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    function onClick(event) {
      const link = event.target.closest('a[href^="#"]')
      if (!link) return
      const href = link.getAttribute('href')
      if (!href || href === '#') return
      const target = document.querySelector(href)
      if (!target) return

      event.preventDefault()
      history.replaceState(null, '', href)

      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          target.scrollIntoView({
            behavior: reduced ? 'auto' : 'smooth',
            block: 'start',
          })
        })
      })
    }

    const onLoaded = () => ScrollTrigger.refresh()

    document.addEventListener('click', onClick)
    window.addEventListener('load', onLoaded)
    return () => {
      document.removeEventListener('click', onClick)
      window.removeEventListener('load', onLoaded)
    }
  }, [])

  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>

      <Navbar />

      <main id="conteudo" className="page">
        <Hero />
        <Services />
        <Movement />
        <Manifesto />
        <Team />
        <Contact />

        <ScrollJourney />
      </main>

      <Footer />
    </>
  )
}

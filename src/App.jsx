import { lazy, Suspense, useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollJourney from './components/ScrollJourney/ScrollJourney'
import { ScrollTrigger } from './lib/gsap'
import Hero from './sections/Hero/Hero'
import Services from './sections/Services/Services'

const Movement = lazy(() => import('./sections/Movement/Movement'))
const Manifesto = lazy(() => import('./sections/Manifesto/Manifesto'))
const Team = lazy(() => import('./sections/Team/Team'))
const Contact = lazy(() => import('./sections/Contact/Contact'))

function SectionFallback() {
  return (
    <div
      aria-hidden="true"
      style={{ minHeight: '60vh', width: '100%' }}
    />
  )
}

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
        <Suspense fallback={<SectionFallback />}>
          <Movement />
          <Manifesto />
          <Team />
          <Contact />
        </Suspense>

        <ScrollJourney />
      </main>

      <Footer />
    </>
  )
}

import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

export default function Reveal({
  as: Tag = 'div',
  delay = 0,
  className = '',
  children,
  ...rest
}) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) return

    let failsafe = null
    let tween = null

    const ctx = gsap.context(() => {
      tween = gsap.fromTo(
        el,
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          delay: delay / 1000,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%', once: true },
        }
      )

      failsafe = setTimeout(() => {
        if (tween && tween.progress() < 1) tween.progress(1)
      }, 4000)
    }, el)

    return () => {
      clearTimeout(failsafe)
      ctx.revert()
    }
  }, [delay])

  return (
    <Tag ref={ref} className={className.trim()} {...rest}>
      {children}
    </Tag>
  )
}

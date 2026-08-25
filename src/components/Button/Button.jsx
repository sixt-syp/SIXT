import { forwardRef } from 'react'
import './Button.css'

const Button = forwardRef(function Button(
  { href, variant = 'primary', size = 'md', className = '', children, ...rest },
  ref
) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ')

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button ref={ref} type="button" className={classes} {...rest}>
      {children}
    </button>
  )
})

export default Button

import './Button.css'

export default function Button({
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}) {
  const classes = ['btn', `btn--${variant}`, `btn--${size}`, className]
    .filter(Boolean)
    .join(' ')

  return (
    <a href={href} className={classes} {...rest}>
      {children}
    </a>
  )
}

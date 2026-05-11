import { Link } from 'react-router-dom'

export function MaterialIcon({ name, className }) {
  return (
    <span className={['material-symbols-outlined', className].filter(Boolean).join(' ')}>
      {name}
    </span>
  )
}

export function SmartLink({ href, children, className }) {
  const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href)
  const isHash = typeof href === 'string' && href.startsWith('#')
  const isRoute = typeof href === 'string' && href.startsWith('/') && !isExternal

  if (isRoute) {
    return (
      <Link className={className} to={href}>
        {children}
      </Link>
    )
  }

  return (
    <a
      className={className}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      aria-current={isHash ? undefined : undefined}
    >
      {children}
    </a>
  )
}


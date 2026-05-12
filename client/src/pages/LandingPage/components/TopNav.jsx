import { SmartLink } from './shared'

export default function TopNav({ meta, topNav, languageToggle }) {
  return (
    <nav className="svy__nav" aria-label={meta.brandName}>
      <div className="svy__navInner">
        <SmartLink className="svy__brand" href="/">
          {meta.brandName}
        </SmartLink>

        <div className="svy__navLinks" role="navigation" aria-label="Primary">
          {topNav.links.map((link) => (
            <SmartLink
              key={link.label}
              className={['svy__navLink', link.active ? 'is-active' : null].filter(Boolean).join(' ')}
              href={link.href}
            >
              {link.label}
            </SmartLink>
          ))}
        </div>

        <div className="svy__navActions">
          {languageToggle ? (
            <button
              type="button"
              className="svy__langToggle"
              onClick={languageToggle.onToggle}
              aria-label={languageToggle.ariaLabel}
            >
              {languageToggle.label}
            </button>
          ) : null}

          <SmartLink className="svy__navCta" href={topNav.cta.href}>
            {topNav.cta.label}
          </SmartLink>
        </div>
      </div>
    </nav>
  )
}


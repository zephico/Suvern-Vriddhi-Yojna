import { MaterialIcon, SmartLink } from './shared'

export default function TopNav({ meta, topNav, languageToggle }) {
  const lt = languageToggle

  return (
    <nav className="svy__nav" aria-label={meta.brandName}>
      <div className="svy__navInner">
        <SmartLink className="svy__brand" href="/">
          {meta.brandName}
        </SmartLink>

        <div
          className="svy__navLinks"
          role="navigation"
          aria-label={topNav.ariaPrimaryNav ?? 'Primary navigation'}
        >
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
          {lt ? (
            <div className="svy__langWrap">
              <MaterialIcon name="translate" className="svy__langIcon" aria-hidden="true" />
              <div className="svy__langSwitch" role="group" aria-label={lt.groupAriaLabel}>
                <span className="svy__langSwitchHint">{lt.switchHint}</span>
                <div className="svy__langSwitchTrack">
                  <button
                    type="button"
                    className={['svy__langSwitchBtn', lt.currentLang === 'en' ? 'is-active' : null]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => lt.onSelectLanguage?.('en')}
                    aria-pressed={lt.currentLang === 'en'}
                    aria-label={lt.englishAria}
                  >
                    {lt.englishShort}
                  </button>
                  <button
                    type="button"
                    className={['svy__langSwitchBtn', lt.currentLang === 'gu' ? 'is-active' : null]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => lt.onSelectLanguage?.('gu')}
                    aria-pressed={lt.currentLang === 'gu'}
                    aria-label={lt.gujaratiAria}
                  >
                    {lt.gujaratiShort}
                  </button>
                </div>
              </div>
            </div>
          ) : null}

          <SmartLink className="svy__navCta" href={topNav.cta.href}>
            {topNav.cta.label}
          </SmartLink>
        </div>
      </div>
    </nav>
  )
}

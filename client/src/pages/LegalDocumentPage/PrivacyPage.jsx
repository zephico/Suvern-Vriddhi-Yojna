import { useEffect } from 'react'

import TopNav from '../LandingPage/components/TopNav'
import Footer from '../LandingPage/components/Footer'
import { SmartLink } from '../LandingPage/components/shared'
import LegalDocument from './components/LegalDocument'
import { useContent } from '../../content/ContentProvider.jsx'

import './legalPage.css'

export default function PrivacyPage() {
  const { lang, content, setLanguage } = useContent()
  const doc = content.legal?.privacy

  const topNav = {
    ...content.topNav,
    links: content.topNav.links.map((l) => ({ ...l, active: false })),
  }

  useEffect(() => {
    if (!doc?.browserTitle) return
    const prev = document.title
    document.title = `${doc.browserTitle} · ${content.meta.brandName}`
    return () => {
      document.title = prev
    }
  }, [doc?.browserTitle, content.meta.brandName])

  if (!doc) return null

  return (
    <div className="svy">
      <TopNav
        meta={content.meta}
        topNav={topNav}
        languageToggle={{
          ...content.topNav.languageToggle,
          currentLang: lang,
          onSelectLanguage: setLanguage,
        }}
      />

      <main className="svy__main">
        <div className="svy__legalPageWrap">
          <nav className="svy__legalBreadcrumb" aria-label={doc.breadcrumb.ariaLabel}>
            <SmartLink href="/">{doc.breadcrumb.home}</SmartLink>
            <span aria-hidden="true"> · </span>
            <span>{doc.breadcrumb.current}</span>
          </nav>
          <LegalDocument doc={doc} />
        </div>
      </main>

      <Footer meta={content.meta} footer={content.footer} />
    </div>
  )
}

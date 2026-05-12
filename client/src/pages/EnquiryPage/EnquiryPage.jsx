import TopNav from '../LandingPage/components/TopNav'
import Footer from '../LandingPage/components/Footer'
import EnquiryForm from './components/EnquiryForm'
import { useContent } from '../../content/ContentProvider.jsx'

export default function EnquiryPage() {
  const { lang, content, toggleLanguage } = useContent()

  const topNav = {
    ...content.topNav,
    links: content.topNav.links.map((l) => ({ ...l, active: l.key === 'contact' })),
  }

  return (
    <div className="svy">
      <TopNav
        meta={content.meta}
        topNav={topNav}
        languageToggle={{
          ariaLabel: content.topNav.languageToggle.ariaLabel,
          label: content.topNav.languageToggle.labels[lang],
          onToggle: toggleLanguage,
        }}
      />

      <main className="svy__main">
        <EnquiryForm enquiry={content.enquiry} />
      </main>

      <Footer meta={content.meta} footer={content.footer} />
    </div>
  )
}


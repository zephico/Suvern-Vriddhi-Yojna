import TopNav from '../LandingPage/components/TopNav'
import Footer from '../LandingPage/components/Footer'
import EnquiryForm from './components/EnquiryForm'
import { useContent } from '../../content/ContentProvider.jsx'

export default function EnquiryPage() {
  const { lang, content, setLanguage } = useContent()

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
          ...content.topNav.languageToggle,
          currentLang: lang,
          onSelectLanguage: setLanguage,
        }}
      />

      <main className="svy__main">
        <EnquiryForm enquiry={content.enquiry} />
      </main>

      <Footer meta={content.meta} footer={content.footer} />
    </div>
  )
}


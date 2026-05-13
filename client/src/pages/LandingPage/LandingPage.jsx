import TopNav from './components/TopNav'
import Hero from './components/Hero'
import Mechanism from './components/Mechanism'
import CalculatorSection from './components/CalculatorSection'
import FaqSection from './components/FaqSection'
import VisitUsSection from './components/VisitUsSection'
import Footer from './components/Footer'
import { useContent } from '../../content/ContentProvider.jsx'

export default function LandingPage() {
  const { lang, content, setLanguage } = useContent()

  const topNav = {
    ...content.topNav,
    links: content.topNav.links.map((l) => ({
      ...l,
      href: l.key === 'calculator' ? '#calculator' : l.href,
      active: l.key === 'home',
    })),
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
        <script
          type="application/ld+json"
          // JSON-LD can safely render in body for crawlers and rich results.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'LocalBusiness',
              name: content.meta.brandFullName,
              url: '/',
              telephone: content.home?.visitUs?.phoneTel,
              address: {
                '@type': 'PostalAddress',
                streetAddress: content.home?.visitUs?.address,
                addressRegion: 'Gujarat',
                addressCountry: 'IN',
              },
            }),
          }}
        />
        <Hero hero={content.home.hero} />
        <Mechanism mechanism={{ ...content.mechanism, id: 'plans' }} />
        <CalculatorSection calculator={content.home.calculator} plans={content.plans.items} />
        
        <VisitUsSection visitUs={content.home.visitUs} />
        <FaqSection faq={content.home.faq} />
      </main>

      <Footer meta={content.meta} footer={content.footer} />
    </div>
  )
}

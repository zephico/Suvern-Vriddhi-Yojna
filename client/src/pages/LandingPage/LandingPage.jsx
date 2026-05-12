import TopNav from './components/TopNav'
import Hero from './components/Hero'
import Mechanism from './components/Mechanism'
import CalculatorSection from './components/CalculatorSection'
import VisitUsSection from './components/VisitUsSection'
import Footer from './components/Footer'
import { useContent } from '../../content/ContentProvider.jsx'

export default function LandingPage() {
  const { lang, content, toggleLanguage } = useContent()

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
          ariaLabel: content.topNav.languageToggle.ariaLabel,
          label: content.topNav.languageToggle.labels[lang],
          onToggle: toggleLanguage,
        }}
      />

      <main className="svy__main">
        <Hero hero={content.home.hero} />
        <Mechanism mechanism={{ ...content.mechanism, id: 'plans' }} />
        <CalculatorSection calculator={content.home.calculator} plans={content.plans.items} />
        <VisitUsSection visitUs={content.home.visitUs} />
      </main>

      <Footer meta={content.meta} footer={content.footer} />
    </div>
  )
}

import data from './landingPage.json'
import './landingPage.css'

import TopNav from './components/TopNav'
import Hero from './components/Hero'
import Metrics from './components/Metrics'
import Mechanism from './components/Mechanism'
import SecuritySection from './components/SecuritySection'
import Footer from './components/Footer'

export default function LandingPage() {
  return (
    <div className="svy">
      <TopNav meta={data.meta} topNav={data.topNav} />

      <main className="svy__main">
        <Hero hero={data.hero} />
        <Metrics metrics={data.metrics} />
        <Mechanism mechanism={data.mechanism} />
        <SecuritySection security={data.security} />
      </main>

      <Footer meta={data.meta} footer={data.footer} />
    </div>
  )
}

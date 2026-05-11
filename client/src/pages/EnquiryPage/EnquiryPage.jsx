import data from '../LandingPage/landingPage.json'
import TopNav from '../LandingPage/components/TopNav'
import Footer from '../LandingPage/components/Footer'
import EnquiryForm from './components/EnquiryForm'
import '../LandingPage/landingPage.css'

export default function EnquiryPage() {
  return (
    <div className="svy">
      <TopNav meta={data.meta} topNav={data.topNav} />

      <main className="svy__main">
        <EnquiryForm enquiry={data.enquiry} />
      </main>

      <Footer meta={data.meta} footer={data.footer} />
    </div>
  )
}


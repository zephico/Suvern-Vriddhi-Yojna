import LandingPage from './pages/LandingPage/LandingPage.jsx'
import EnquiryPage from './pages/EnquiryPage/EnquiryPage.jsx'
import PlanPage from './pages/PlanPage/PlanPage.jsx'
import PrivacyPage from './pages/LegalDocumentPage/PrivacyPage.jsx'
import TermsPage from './pages/LegalDocumentPage/TermsPage.jsx'
import { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

function ScrollToHash() {
  const { hash, pathname } = useLocation()

  useEffect(() => {
    if (!hash) return

    const id = hash.replace('#', '')
    if (!id) return

    // Allow route to render before scrolling.
    const t = window.setTimeout(() => {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 0)

    return () => window.clearTimeout(t)
  }, [hash, pathname])

  return null
}

function App() {
  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/plans" element={<PlanPage />} />
        <Route path="/enquiry" element={<EnquiryPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App

import LandingPage from './pages/LandingPage/LandingPage.jsx'
import EnquiryPage from './pages/EnquiryPage/EnquiryPage.jsx'
import { Navigate, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/enquiry" element={<EnquiryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App

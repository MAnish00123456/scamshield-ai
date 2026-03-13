import { useState } from 'react'
import Navbar from '../components/Navbar'
import ScannerTabs from '../components/ScannerTabs'
import UploadBox from '../components/UploadBox'
import ResultPanel from '../components/ResultPanel'

function ScannerPage() {

  const [activeTab, setActiveTab] = useState('screenshot')

  // Demo scan result (temporary until backend connects)
  const result = {
    risk_score: 8.5,
    explanation:
      "This message is asking for your OTP which is a classic bank fraud technique. No real bank asks for OTP via message.",
    advice:
      "Do NOT share your OTP. Block this number immediately and report it."
  }

  return (
    <>
      <Navbar />

      <div className="scanner-page">
        <h2>Scam Scanner</h2>

        <p>
          Upload a screenshot, paste a link, or submit a voice clip to analyze.
        </p>

        <ScannerTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        <UploadBox activeTab={activeTab} />
      </div>

      {/* Scan Result */}
      {result && <ResultPanel result={result} />}

    </>
  )
}

export default ScannerPage
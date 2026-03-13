import { useState } from 'react'
import Navbar from '../components/Navbar'
import ScannerTabs from '../components/ScannerTabs'
import UploadBox from '../components/UploadBox'
import ResultPanel from '../components/ResultPanel'

function ScannerPage() {
  const [activeTab, setActiveTab] = useState('screenshot')

  return (
    <>
      <Navbar />
      <div className="scanner-page">
        <h2>Scam Scanner</h2>
        <p>Upload a screenshot, paste a link, or submit a voice clip to analyze.</p>
        <ScannerTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <UploadBox activeTab={activeTab} />
      </div>
      <ResultPanel />
    </>
  )
}

export default ScannerPage

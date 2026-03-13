import { useState } from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ScannerTabs from '../components/ScannerTabs'
import UploadBox from '../components/UploadBox'
import ResultPanel from '../components/ResultPanel'
import ChatBot from '../components/ChatBot'
import Reviews from "../components/Reviews";
import HowItWorks from "../components/HowItWorks";
import FAQ from "../components/FAQ";

function Home() {
  const [activeTab, setActiveTab] = useState('screenshot')

  return (
    <>
      <Navbar />
      <Hero />

      <section className="scanner-section" id="scanner">
        <ScannerTabs activeTab={activeTab} onTabChange={setActiveTab} />
        <UploadBox activeTab={activeTab} />
      </section>

      <ResultPanel />

      <Reviews />
      <HowItWorks />
      <FAQ />

      {/* Floating chatbot widget */}
      <ChatBot />
    </>
  )
}

export default Home
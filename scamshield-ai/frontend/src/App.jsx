import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ScannerPage from './pages/ScannerPage'
import HeatmapPage from './pages/HeatmapPage'
import './App.css'

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/heatmap" element={<HeatmapPage />} />
      </Routes>
    </div>
  )
}

export default App

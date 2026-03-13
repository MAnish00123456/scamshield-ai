import { Routes, Route } from "react-router-dom";
import ParticlesBackground from "./components/ParticlesBackground";
import Home from "./pages/Home";
import ScannerPage from "./pages/ScannerPage";
import HeatmapPage from "./pages/HeatmapPage";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  return (
    <div className="app">

      {/* Background particles */}
      <ParticlesBackground />

      {/* Pages */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/scanner" element={<ScannerPage />} />
        <Route path="/heatmap" element={<HeatmapPage />} />
      </Routes>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
import Navbar from '../components/Navbar'

function HeatmapPage() {
  return (
    <>
      <Navbar />
      <div className="heatmap-page">
        <h2>Scam Heatmap</h2>
        <p>Visualize scam activity across regions in real-time.</p>
        <div className="heatmap-placeholder">
          Heatmap visualization will be displayed here.
          <br />
          Connect to the backend API to load live scam data.
        </div>
      </div>
    </>
  )
}

export default HeatmapPage

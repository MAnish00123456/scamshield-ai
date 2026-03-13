import StatCard from './StatCard'

const stats = [
  { value: '98%', label: 'Detection accuracy' },
  { value: '2s', label: 'Avg scan time' },
  { value: '12k+', label: 'Scams blocked' },
]

function Hero() {
  return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-badge">
          <span className="dot"></span>
          AI-Powered Protection
        </div>
        <h1>
          Detect Scams<br />
          Before They <span>Hurt You</span>
        </h1>
        <p>
          Upload a screenshot, suspicious link, or voice message — our AI
          analyzes it in seconds and tells you if it's a scam.
        </p>
      </div>
      <div className="hero-right">
        {stats.map((s) => (
          <StatCard key={s.label} value={s.value} label={s.label} />
        ))}
      </div>
    </section>
  )
}

export default Hero

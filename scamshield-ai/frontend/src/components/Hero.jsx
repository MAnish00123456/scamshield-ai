import { useEffect } from "react"
import StatCard from './StatCard'

const stats = [
  { value: '98%', label: 'Detection accuracy' },
  { value: '2s', label: 'Avg scan time' },
  { value: '12k+', label: 'Scams blocked' },
]

function Hero() {

  useEffect(() => {
    if (window.particlesJS) {
      window.particlesJS("particles-js", {
        particles: {
          number: { value: 80 },
          color: { value: "#3b82f6" },
          shape: { type: "circle" },
          opacity: { value: 0.5 },
          size: { value: 3, random: true },

          line_linked: {
            enable: true,
            distance: 150,
            color: "#3b82f6",
            opacity: 0.4,
            width: 1
          },

          move: {
            enable: true,
            speed: 2
          }
        },

        interactivity: {
          events: {
            onhover: {
              enable: true,
              mode: "grab"
            },
            onclick: {
              enable: true,
              mode: "push"
            }
          }
        },

        retina_detect: true
      })
    }
  }, [])

  return (
    <section className="hero">

      {/* PARTICLES BACKGROUND */}
      <div id="particles-js"></div>

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
import { Link, useLocation } from 'react-router-dom'

const navItems = [
  // { label: 'Scanner', path: '/', section: 'scanner' },
  { label: 'Link Check', path: '/', section: 'scanner' },
  // { label: 'Voice', path: '/', section: 'scanner' },
  { label: 'Heatmap', path: '/heatmap' },
  // { label: 'Chatbot', path: '/', section: 'chatbot' },
]

function Navbar() {
  const location = useLocation()

  const handleClick = (item) => {
    if (item.section && location.pathname === '/') {
      const el = document.getElementById(item.section)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        <div className="shield-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="#00aaff" strokeWidth="2">
            <path d="M12 2L3 7v6c0 5 3.9 9.7 9 11 5.1-1.3 9-6 9-11V7L12 2z" />
          </svg>
        </div>
        <div className="logo-text">
          Scam<span>Shield</span> AI
        </div>
      </Link>

      <div className="nav-links">
        {navItems.map((item) => (
          <Link key={item.label} to={item.path} onClick={() => handleClick(item)}>
            <button
              className={`nav-link${
                item.path === '/heatmap' && location.pathname === '/heatmap' ? ' active' :
                item.label === 'Scanner' && location.pathname === '/' ? ' active' : ''
              }`}
            >
              {item.label}
            </button>
          </Link>
        ))}
      </div>
    </nav>
  )
}

export default Navbar

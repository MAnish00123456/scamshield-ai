function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        {/* Brand */}
        <div className="footer-brand">
          <h2>
            ScamShield <span>AI</span>
          </h2>

          <p>
            AI-powered cyber safety assistant that detects scams from
            screenshots, suspicious links, and voice messages to protect
            users before they become victims.
          </p>

          <div className="footer-social">
            <i className="fab fa-twitter"></i>
            <i className="fab fa-facebook"></i>
            <i className="fab fa-youtube"></i>
            <i className="fab fa-instagram"></i>
          </div>
        </div>

        {/* Features */}
        <div className="footer-col">
          <h3>Features</h3>

          <ul>
            <li>Screenshot Scam Scanner</li>
            <li>Suspicious Link Detection</li>
            <li>Voice Scam Detection</li>
            <li>AI Risk Score Analysis</li>
            <li>Scam Heatmap</li>
            <li>Elderly Protection Mode</li>
            <li>AI Scam Chatbot</li>
          </ul>
        </div>

        {/* Cyber Safety */}
        <div className="footer-col">
          <h3>Cyber Safety</h3>

          <ul>
            <li>Recognizing Phishing</li>
            <li>OTP Scam Awareness</li>
            <li>Secure Online Banking</li>
            <li>Safe Social Media Use</li>
            <li>Report a Scam</li>
            <li>Cyber Security Tips</li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h3>Quick Links</h3>

          <ul>
            <li>Home</li>
            <li>Scanner</li>
            <li>Link Check</li>
            <li>Voice Detection</li>
            <li>Heatmap</li>
            <li>About</li>
            <li>Contact</li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}

      <div className="footer-bottom">
        <span>© 2026 ScamShield AI</span>
        <span>Protecting users from digital scams</span>
      </div>

    </footer>
  )
}

export default Footer
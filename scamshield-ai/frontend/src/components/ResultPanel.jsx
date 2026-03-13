function ResultPanel() {
  return (
    <div className="result-section">
      <div className="result-card danger">
        <div className="risk-label">Risk Score</div>
        <div className="risk-score">
          8.5<span className="denominator">/10</span>
        </div>
        <div className="risk-bar-bg">
          <div className="risk-bar-fill" style={{ width: '85%' }}></div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <span className="scam-type">OTP Fraud</span>
          <div className="explanation">
            This message is asking for your OTP which is a classic bank fraud
            technique. No real bank ever asks for OTP.
          </div>
          <div className="advice">
            Do NOT share your OTP. Block this number immediately.
          </div>
        </div>
      </div>

      <div className="result-card safe">
        <div className="risk-label">Previous Scan</div>
        <div className="risk-score safe">
          1.2<span className="denominator">/10</span>
        </div>
        <div className="risk-bar-bg">
          <div className="risk-bar-fill safe" style={{ width: '12%' }}></div>
        </div>
        <div style={{ marginTop: '12px' }}>
          <span className="scam-type safe">Safe</span>
          <div className="explanation">
            This appears to be a legitimate message from a verified sender. No
            suspicious patterns detected.
          </div>
          <div className="advice safe">
            This message looks safe to respond to.
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultPanel

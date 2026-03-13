function ResultPanel({ result }) {

  if (!result?.analysis) return null
  const risk_score = result?.analysis?.risk_score ?? 0

  const riskScore = risk_score.toFixed(1)
  const safeScore = (10 - risk_score).toFixed(1)
  
  const riskPercent = risk_score * 10
  const safePercent = 100 - riskPercent

  // const safeLevel =
  // safeScore > 7 ? "Very Safe" :
  // safeScore > 4 ? "Moderate Safety" :
  // "Low Safety"

  return (
    <div className="result-section">

      {/* RISK CARD */}


      <div className="result-card danger">

        <div className="risk-label">Risk Score</div>

        <div className="risk-score">
          {riskScore}
          <span className="denominator">/10</span>
        </div>

        <div className="risk-bar-bg">
          <div
            className="risk-bar-fill"
            style={{ width: `${riskPercent}%` }}
          ></div>
        </div>

        <div style={{ marginTop: "12px" }}>
          <span className="scam-type">Scam Detected</span>

          <div className="explanation">
            Suspicious scam patterns detected in the message.
          </div>

          <div className="advice">
            Avoid clicking links or sharing personal information.
          </div>
        </div>

      </div>


      {/* SAFE CARD */}

      <div className="result-card safe">

        <div className="risk-label">Safe Score</div>

        <div className="risk-score safe">
          {safeScore}
          <span className="denominator">/10</span>
        </div>

        <div className="risk-bar-bg">
          <div
            className="risk-bar-fill safe"
            style={{ width: `${safePercent}%` }}
          ></div>
        </div>

        <div style={{ marginTop: "12px" }}>
          <span className="scam-type safe">Safety Level</span>

          <div className="explanation">
            Higher score means the message is more likely safe.
          </div>

          <div className="advice safe">
            Always verify unknown links and offers.
          </div>
        </div>

      </div>

    </div>
  )
}

export default ResultPanel
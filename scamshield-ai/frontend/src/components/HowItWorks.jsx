import React from "react";

export default function HowItWorks() {
  return (
    <section className="howworks-section">

      <h2 className="howworks-title">
        How ScamShield Works
      </h2>

      <div className="process-grid">

        <div className="process-card">
          <h3>1. Spot something suspicious</h3>
          <p>
            If a message, link or phone call feels suspicious,
            you can quickly verify it using ScamShield.
          </p>
        </div>

        <div className="process-card">
          <h3>2. Upload or paste content</h3>
          <p>
            Upload screenshots, paste suspicious links or
            upload voice recordings.
          </p>
        </div>

        <div className="process-card">
          <h3>3. AI analyzes the data</h3>
          <p>
            Our AI system checks scam patterns, phishing signals
            and fraud indicators.
          </p>
        </div>

        <div className="process-card">
          <h3>4. Get instant scam verdict</h3>
          <p>
            You receive a risk score and advice on what to do next.
          </p>
        </div>

      </div>

    </section>
  );
}
import React from "react";

export default function Reviews() {
  return (
    <section className="reviews-section">

      <h2 className="reviews-title">
        Over 40,000 scams detected
      </h2>

      <div className="reviews-grid">

        <div className="review-card">
          <h3>Mel</h3>
          <p>
            I was doing scam checks with my son who works in financial crime.
            He recommended ScamShield and now I use it regularly.
          </p>
        </div>

        <div className="review-card">
          <h3>Mike</h3>
          <p>
            ScamShield helped me verify a suspicious investment message.
            It quickly flagged it as a phishing attempt.
          </p>
        </div>

        <div className="review-card">
          <h3>Jonathan</h3>
          <p>
            I saw ScamShield mentioned online and tried it for a scam email.
            It detected the fraud instantly.
          </p>
        </div>

        <div className="review-card">
          <h3>Izzy</h3>
          <p>
            ScamShield makes it easy to report scam messages and
            protects people from financial fraud.
          </p>
        </div>

      </div>

    </section>
  );
}
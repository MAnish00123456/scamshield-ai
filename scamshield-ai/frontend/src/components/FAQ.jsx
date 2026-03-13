import { useState } from "react";

const faqData = [
  {
    question: "How does ScamShield detect scams?",
    answer:
      "ScamShield uses OCR, AI text analysis, and phishing pattern detection to analyze suspicious messages, links, and voice recordings."
  },
  {
    question: "Can I check WhatsApp or SMS screenshots?",
    answer:
      "Yes. You can upload screenshots of WhatsApp, SMS, or email messages and our AI will extract the text and analyze scam indicators."
  },
  {
    question: "Does ScamShield detect phishing links?",
    answer:
      "Yes. The link scanner checks domain reputation, suspicious keywords, and phishing patterns to detect malicious websites."
  },
  {
    question: "Can it analyze scam phone calls?",
    answer:
      "Yes. You can upload voice recordings and ScamShield converts speech to text and detects common scam phrases."
  },
  {
    question: "Is ScamShield free to use?",
    answer:
      "For the hackathon prototype, all features are free. Future versions may include advanced protection features."
  },
  {
    question: "How accurate is the scam detection?",
    answer:
      "ScamShield provides a risk score based on AI models trained on scam datasets and phishing detection patterns."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq-section">

      <h2 className="faq-title">Frequently Asked Questions</h2>

      <div className="faq-container">

        {faqData.map((item, index) => (
          <div
            key={index}
            className={`faq-item ${openIndex === index ? "open" : ""}`}
          >
            <div
              className="faq-question"
              onClick={() => toggleFAQ(index)}
            >
              {item.question}
              <span className="faq-icon">
                {openIndex === index ? "−" : "+"}
              </span>
            </div>

            {openIndex === index && (
              <div className="faq-answer">
                {item.answer}
              </div>
            )}
          </div>
        ))}

      </div>

    </section>
  );
}
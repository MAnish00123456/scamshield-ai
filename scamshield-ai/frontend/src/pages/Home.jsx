import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <>
      <style>{`
      :root{
        --ink:#0f172a;
        --muted:#475569;
        --ring:#d9dee5;
        --brand:#ef4444;
        --card:#fafafa;
        --bg:#f3f4f6;
      }

      .home{ background:var(--bg); color:var(--ink); }

      .hero{
        position:relative;
        min-height:65vh;
        display:grid;
        place-items:center;
        overflow:hidden;
      }

      .hero-bg{
        position:absolute;
        inset:0;
        width:100%;
        height:100%;
        object-fit:cover;
      }

      .hero-overlay{
        position:absolute;
        inset:0;
        background:linear-gradient(180deg,rgba(0,0,0,.45),rgba(0,0,0,.65));
      }

      .hero-inner{
        position:relative;
        z-index:1;
        text-align:center;
        color:#fff;
        padding:48px 16px;
      }

      .hero-inner h1{
        font-size:clamp(28px,4vw,56px);
        margin-bottom:10px;
      }

      .cta{
        display:inline-block;
        padding:12px 20px;
        border-radius:999px;
        background:var(--brand);
        color:#fff;
        text-decoration:none;
        font-weight:700;
        margin-top:10px;
      }

      .steps{ max-width:1200px; margin:40px auto; padding:0 16px; }

      .steps-grid{
        display:grid;
        grid-template-columns:repeat(4,1fr);
        gap:16px;
      }

      .step{
        background:var(--card);
        border:1px solid var(--ring);
        border-radius:16px;
        padding:20px;
        text-align:center;
        box-shadow:0 6px 18px rgba(0,0,0,.06);
      }

      .cards{
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:18px;
      }

      .card{
        background:var(--card);
        border:1px solid var(--ring);
        border-radius:16px;
        overflow:hidden;
      }

      .card img{
        width:100%;
        height:220px;
        object-fit:cover;
      }

      .card-body{
        padding:14px;
      }

      .faq{ max-width:900px; margin:40px auto; padding:0 16px; }

      .faq details{
        background:var(--card);
        border:1px solid var(--ring);
        border-radius:12px;
        padding:12px 16px;
        margin-bottom:10px;
      }

      @media (max-width: 1000px){
        .steps-grid{ grid-template-columns:1fr 1fr; }
        .cards{ grid-template-columns:1fr; }
      }

      `}</style>

      <div className="home">

        {/* HERO */}
        <section className="hero">
          <img className="hero-bg" src="/images/hero/cyber-bg.jpg" alt="" />
          <div className="hero-overlay" />
          <div className="hero-inner">
            <h1>Protect Yourself From Online Scams</h1>
            <p>Scan messages, suspicious links, and voice calls using AI powered cyber security.</p>
            <Link className="cta" to="/scanner">Start Scam Scan</Link>
          </div>
        </section>


        {/* STEPS */}
        <section className="steps">

          <h2 style={{textAlign:"center"}}>How ScamShield Works</h2>

          <div className="steps-grid">

            <div className="step">
              <h3>Upload Screenshot</h3>
              <p>Upload a suspicious message screenshot and our OCR engine extracts text.</p>
            </div>

            <div className="step">
              <h3>Scan Link</h3>
              <p>Paste suspicious links to detect phishing domains and malware indicators.</p>
            </div>

            <div className="step">
              <h3>Voice Analysis</h3>
              <p>Upload recorded calls and detect scam phrases using speech recognition.</p>
            </div>

            <div className="step">
              <h3>AI Risk Score</h3>
              <p>Our AI model calculates scam probability and shows safety advice.</p>
            </div>

          </div>

        </section>


        {/* TOOLS */}
        <section className="steps">

          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>

            <h2>Scam Detection Tools</h2>

            <Link className="cta" to="/scanner">
              Open Scanner
            </Link>

          </div>

          <div className="cards">

            <div className="card">
              <img src="/images/tools/screenshot.jpg" alt="" />
              <div className="card-body">
                <h4>Screenshot Scam Detection</h4>
                <p>Analyze suspicious WhatsApp or SMS screenshots using OCR and AI.</p>
              </div>
            </div>

            <div className="card">
              <img src="/images/tools/link.jpg" alt="" />
              <div className="card-body">
                <h4>Phishing Link Scanner</h4>
                <p>Detect malicious websites and phishing domains instantly.</p>
              </div>
            </div>

            <div className="card">
              <img src="/images/tools/voice.jpg" alt="" />
              <div className="card-body">
                <h4>Voice Scam Detector</h4>
                <p>Detect fraud phrases from scam calls using speech recognition.</p>
              </div>
            </div>

          </div>

        </section>


        {/* AI FEATURES */}
        <section className="steps">

          <h2 style={{textAlign:"center"}}>AI Powered Protection</h2>

          <div className="steps-grid">

            <div className="step">
              <h3>Scam Risk Score</h3>
              <p>Our AI engine evaluates probability of fraud using trained models.</p>
            </div>

            <div className="step">
              <h3>Scam Heatmap</h3>
              <p>View scam activity across regions and identify cyber crime hotspots.</p>
            </div>

            <div className="step">
              <h3>Elderly Protection Mode</h3>
              <p>Simple interface with Hindi alerts for elderly users.</p>
            </div>

            <div className="step">
              <h3>AI Cyber Chatbot</h3>
              <p>Ask cyber safety questions and get instant scam prevention advice.</p>
            </div>

          </div>

        </section>


        {/* FAQ */}

        <section className="faq">

          <h2>FAQs</h2>

          {[

            ["How does ScamShield detect scams?",
            "ScamShield uses OCR, AI text analysis and speech recognition to detect scam patterns."],

            ["Does it work for WhatsApp messages?",
            "Yes. You can upload WhatsApp or SMS screenshots to detect scam messages."],

            ["Can it detect scam phone calls?",
            "Yes. Voice recordings are converted to text and analyzed for fraud phrases."],

            ["Is the risk score accurate?",
            "Our AI model evaluates scam probability based on known fraud patterns and datasets."]

          ].map(([q,a],i)=>(
            <details key={i}>
              <summary>{q}</summary>
              <p>{a}</p>
            </details>
          ))}

        </section>



        {/* ABOUT */}

        <section className="faq">

          <h2>About ScamShield AI</h2>

          <p>
          ScamShield AI is an intelligent cyber security assistant designed to
          help users detect phishing attacks, fraud messages and scam calls.
          </p>

          <p>
          Using OCR, AI text analysis, and speech recognition, the system
          analyzes suspicious content and provides a scam probability score.
          </p>

          <p>
          The platform also includes a scam heatmap to track cyber crime
          trends and an AI chatbot for cyber safety awareness.
          </p>

        </section>


      </div>
    </>
  );
}
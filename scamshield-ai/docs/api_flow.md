# ScamShield AI - API Flow

This document explains how the frontend communicates with backend APIs.

---

## Base URL

http://localhost:8000

---

## 1. Screenshot Scam Detection

Endpoint

POST /scan-image

Purpose

Analyze screenshot images and detect scam patterns.

Request

multipart/form-data

file: screenshot image

Process

1. User uploads screenshot from frontend
2. Image sent to backend API
3. OCR extracts text from image
4. Scam detection engine analyzes text
5. Risk score is generated

Response

{
  "risk_score": 8,
  "label": "MALICIOUS",
  "matched_keywords": ["otp", "verify"],
  "explanation": "Detected scam indicators: otp, verify",
  "advice": "Do not interact with this message"
}

---

## 2. Voice Scam Detection

Endpoint

POST /scan-voice

Purpose

Analyze voice messages and detect scam patterns.

Request

multipart/form-data

file: voice message

Process

1. Voice file uploaded
2. Speech converted to text
3. Scam detection engine analyzes text
4. Risk score generated

Response

{
  "risk_score": 7,
  "label": "SUSPICIOUS"
}

---

## 3. Link Scam Detection

Endpoint

POST /scan-link

Purpose

Analyze suspicious URLs and detect phishing patterns.

Request

{
  "url": "http://suspicious-link.com"
}

Process

1. User submits link
2. Backend validates URL
3. Pattern detection runs
4. Risk score generated

Response

{
  "risk_score": 6,
  "label": "SUSPICIOUS"
}

---


---

## Complete API Flow

User Input → React Frontend → FastAPI API → AI Analysis → Response → Result Display
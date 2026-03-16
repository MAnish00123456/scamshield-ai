# scamshield-ai

# ScamShield AI 🛡️

ScamShield AI is an AI-powered cyber safety platform designed to help users detect online scams from **screenshots, voice messages, and suspicious links**.

The system analyzes content using OCR, pattern detection, and scam intelligence to generate a **risk score** and warn users about potential fraud.

---

# 🚨 Problem

Online scams are increasing rapidly through:

* Phishing links
* Fake job offers
* Crypto / investment scams
* OTP fraud messages
* Voice call scams

Many users cannot easily identify these scams.

ScamShield AI helps users detect these threats instantly.

---

# 💡 Solution

ScamShield AI provides a platform where users can:

* Upload scam screenshots
* Upload suspicious voice messages
* Paste suspicious links

The system analyzes the input and returns a **risk score, explanation, and safety advice**.

---

# ⚙️ Features

### 📷 Screenshot Scam Detection

Extracts text from screenshots using OCR and analyzes scam patterns.

### 🎤 Voice Scam Detection

Analyzes voice messages and converts speech to text for scam detection.

### 🔗 Link Phishing Detection

Checks suspicious URLs for phishing indicators.

### 📉 Risk Score System

Each input is analyzed and assigned a risk score with explanation.

---

# 🧠 How It Works

User Input → React Frontend → FastAPI Backend → AI Analysis → Risk Score → Result Display

1. User uploads screenshot / voice / link
2. Backend processes input
3. OCR or speech-to-text extracts text
4. Scam detection engine analyzes patterns
5. Risk score and classification generated
6. Result shown to user

---

# 🏗️ System Architecture

Frontend (React)

Handles:

* User interface
* File uploads
* Result visualization

Backend (FastAPI)

Handles:

* API requests
* OCR processing
* Scam detection logic
* Voice processing
* Link analysis

AI Analysis Layer

Modules include:

* OCR Service
* Scam Detection Engine
* Voice Processing
* Link Analysis

---

# 🛠️ Tech Stack

### Frontend

* React
* JavaScript
* Vite

### Backend

* FastAPI
* Python

### AI Tools

* Tesseract OCR
* Regex Pattern Detection
* Scam Keyword Analysis

---

# 📁 Project Structure

```
scamshield-ai

backend
 ├ routes
 ├ services
 ├ ai_models

frontend
 ├ components
 ├ pages

docs
 ├ architecture.md
 └ api_flow.md
```

---

# 🚀 Installation

Clone repository:

```
git clone https://github.com/your-repo/scamshield-ai
```

Install backend dependencies:

```
pip install -r requirements.txt
```

Run backend server:

```
uvicorn main:app --reload
```

Install frontend dependencies:

```
npm install
```

Run frontend:

```
npm run dev
```

---

# 📊 Example Output

```
Risk Score: 8
Label: MALICIOUS
Explanation: Detected scam indicators such as OTP request and verification link.
Advice: Do not interact with this message.
```

---

# 🔮 Future Improvements

* Machine learning based scam detection
* Real-time fraud alerts
* Browser extension
* WhatsApp scam detection
* Community fraud reporting

---

# 👥 Team

Developed during Hackathon to fight online scams and improve digital safety.

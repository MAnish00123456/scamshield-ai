# ScamShield AI - System Architecture

## Overview

ScamShield AI is an AI-powered cyber safety platform designed to detect online scams from screenshots, voice messages, and suspicious links.

The system analyzes user inputs using AI models and returns a **risk score** and **scam classification** to help users identify fraudulent content.

---

## High Level Architecture

User → React Frontend → FastAPI Backend → AI Analysis Engine → Result Display

---

## Components

### 1. Frontend (React)

The frontend provides the user interface where users interact with the system.

Responsibilities:

- Upload scam screenshots
- Upload voice messages
- Paste suspicious links
- Display scam risk score
- Display scam explanation
- Show fraud heatmap visualization

Important folders:

frontend/src/components  
frontend/src/pages

Key components:

- UploadBox.jsx
- ResultPanel.jsx
- RiskMeter.jsx
- ScannerTabs.jsx
- HeatmapChart.jsx

---

### 2. Backend (FastAPI)

The backend handles API requests and performs scam detection logic.

Responsibilities:

- Handle file uploads
- Extract text using OCR
- Analyze scam patterns
- Process voice messages
- Detect phishing links
- Provide fraud heatmap data

Important folders:

backend/routes  
backend/services  
backend/ai_models

Key backend files:

- main.py
- routes/scan_image.py
- routes/scan_voice.py
- routes/scan_link.py
- routes/heatmap.py

---

## AI Analysis Layer

The AI analysis layer is responsible for detecting scam patterns from user inputs.

It processes screenshots, voice messages, and suspicious links to identify potential fraud.

Main modules include:

### OCR Service

Extracts text from screenshots using **Tesseract OCR**.

File location:

backend/services/ocr_service.py

---

### Scam Detection Engine

Analyzes extracted text using:

- scam keyword detection
- pattern recognition
- fraud risk scoring

File location:

backend/services/ai_analysis.py

---

### Voice Processing

Processes voice messages and converts speech to text before analysis.

File location:

backend/services/speech_service.py

---

### Link Analysis

Detects suspicious URLs and phishing patterns.

File location:

backend/services/link_checker.py

---

## Data Flow

The system processes user inputs through the following pipeline:

1. User uploads a screenshot, voice message, or suspicious link.
2. The React frontend sends the data to the FastAPI backend.
3. The backend processes the input using OCR or voice transcription.
4. The AI scam detection engine analyzes the extracted text.
5. The system generates a risk score and classification.
6. The result is returned to the frontend.
7. The frontend displays the scam risk score and explanation to the user.

---

## Technologies Used

### Frontend

- React
- JavaScript
- Vite

### Backend

- FastAPI
- Python

### AI Tools

- Tesseract OCR
- Regex Pattern Detection
- Scam Keyword Analysis

---

## Key Features

- Screenshot scam detection
- Voice scam detection
- Phishing link detection
- Fraud heatmap visualization
- Risk score analysis

---

## Future Improvements

- Machine learning based scam detection
- Real-time scam alerts
- Browser extension for phishing detection
- WhatsApp scam detection
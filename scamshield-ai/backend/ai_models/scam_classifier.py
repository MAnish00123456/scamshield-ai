import pandas as pd
import pickle
import os
import re
import numpy as np

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.pipeline import Pipeline

MODEL_PATH = os.path.join(os.path.dirname(__file__), "scam_model.pkl")
DATASET_PATH = os.path.join(
    os.path.dirname(__file__),
    "../../data/scamshield_dataset_production.csv",
)

_model = None

SCAM_TYPE_LABELS = {
    "otp_scam": "OTP scam",
    "phishing": "Phishing attempt",
    "lottery_scam": "Lottery scam",
    "bank_kyc_scam": "Bank KYC scam",
    "investment_scam": "Investment scam",
    "job_scam": "Job scam",
    "refund_scam": "Refund scam",
    "tech_support_scam": "Tech support scam",
    "parcel_delivery_scam": "Parcel delivery scam",
    "government_impersonation": "Government impersonation scam",
    "upi_payment_scam": "UPI payment scam",
    "legitimate_message": "Legitimate message",
}

SUSPICIOUS_WORDS = [
    "otp", "verify", "urgent", "click", "lottery", "won", "prize",
    "reward", "kyc", "refund", "blocked", "expired", "immediately",
    "claim", "free", "link", "update", "suspend", "hack", "virus",
    "bank", "account", "upi", "aadhaar", "pan", "winner",
]


# ---------------------------------------------------------------------------
# Text preprocessing
# ---------------------------------------------------------------------------

def clean_text(text: str) -> str:
    """Lowercase, strip URLs, numbers, and special characters."""
    text = text.lower()
    text = re.sub(r"https?://\S+|www\.\S+", "", text)   # URLs
    text = re.sub(r"\d+", "", text)                       # numbers
    text = re.sub(r"[^a-z\s]", "", text)                  # special chars
    text = re.sub(r"\s+", " ", text).strip()              # extra whitespace
    return text


# ---------------------------------------------------------------------------
# Training
# ---------------------------------------------------------------------------

def train_model():
    global _model

    # Remove stale pickle before training to avoid confusion
    if os.path.exists(MODEL_PATH):
        os.remove(MODEL_PATH)

    data = pd.read_csv(DATASET_PATH)
    data = data.dropna(subset=["message_text", "scam_type"])

    X = data["message_text"].astype(str).apply(clean_text)
    y = data["scam_type"]

    # LinearSVC has no predict_proba, so wrap it with CalibratedClassifierCV
    # which fits a sigmoid on top of SVC decision scores → calibrated probs
    base_svc = LinearSVC(
        max_iter=2000,
        class_weight="balanced",
        C=1.0,
    )

    _model = Pipeline([
        ("tfidf", TfidfVectorizer(
            stop_words="english",
            max_features=8000,
            ngram_range=(1, 2),
            sublinear_tf=True,
        )),
        ("clf", CalibratedClassifierCV(base_svc, cv=5, method="sigmoid")),
    ])

    _model.fit(X, y)

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(_model, f)

    print(f"Model trained on {len(X)} samples and saved to {MODEL_PATH}")


# ---------------------------------------------------------------------------
# Loading
# ---------------------------------------------------------------------------

def load_model():
    global _model

    if _model is None:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, "rb") as f:
                _model = pickle.load(f)
        else:
            train_model()

    return _model


# ---------------------------------------------------------------------------
# Prediction
# ---------------------------------------------------------------------------

SCAM_CONFIDENCE_THRESHOLD = 0.80


def predict_scam(text: str) -> dict:
    mdl = load_model()

    cleaned = clean_text(text)
    prediction = mdl.predict([cleaned])[0]
    probabilities = mdl.predict_proba([cleaned])[0]
    classes = list(mdl.classes_)

    predicted_confidence = float(probabilities[classes.index(prediction)])

    # --- Keyword highlighting (word-boundary matching) -----------------------
    text_lower = text.lower()
    matched_keywords = [
        w for w in SUSPICIOUS_WORDS
        if re.search(rf"\b{re.escape(w)}\b", text_lower)
    ]

    # --- Low-confidence scam override ----------------------------------------
    # If model predicts scam but confidence is weak AND no suspicious keywords
    # are found, override to legitimate. This prevents false positives on short
    # casual messages where the model is uncertain.
    overridden = False
    if (
        prediction != "legitimate_message"
        and predicted_confidence < SCAM_CONFIDENCE_THRESHOLD
        and not matched_keywords
    ):
        safe_idx = classes.index("legitimate_message")
        prediction = "legitimate_message"
        predicted_confidence = float(probabilities[safe_idx])
        overridden = True

    # --- Risk score ----------------------------------------------------------
    # Scam classes → risk = confidence (high confidence scam = high risk)
    # Legitimate   → risk = total scam probability (safe message = LOW risk)
    # Overridden   → cap risk low since we decided it's not a scam
    if prediction == "legitimate_message":
        if overridden:
            # Model was unsure, and no keywords found → low risk
            risk_score = round(min(predicted_confidence * 10, 3.0), 1)
        else:
            safe_idx = classes.index("legitimate_message")
            scam_probability = 1.0 - float(probabilities[safe_idx])
            risk_score = round(scam_probability * 10, 1)
        confidence = predicted_confidence
    else:
        confidence = predicted_confidence
        risk_score = round(confidence * 10, 1)

    # --- Verdict -------------------------------------------------------------
    friendly_label = SCAM_TYPE_LABELS.get(
        prediction,
        prediction.replace("_", " ").title(),
    )

    if prediction == "legitimate_message":
        if risk_score >= 5.0:
            verdict = "This message is likely safe, but could not be fully verified."
        else:
            verdict = "This message appears to be safe and legitimate."
    else:
        article = "an" if friendly_label[0].lower() in "aeiou" else "a"
        verdict = f"This message appears to be {article} {friendly_label.lower()}."

    return {
        "scam_type": prediction,
        "confidence": round(confidence, 2),
        "risk_score": risk_score,
        "verdict": verdict,
        "matched_keywords": matched_keywords,
    }

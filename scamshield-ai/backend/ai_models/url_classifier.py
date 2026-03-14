import os
import pickle

import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier

# Reuse feature extraction from the service layer
import sys
sys.path.insert(0, os.path.join(os.path.dirname(__file__), ".."))
from services.link_checker import extract_url_features, features_to_array

MODEL_PATH = os.path.join(os.path.dirname(__file__), "url_model.pkl")
DATASET_PATH = os.path.join(
    os.path.dirname(__file__),
    "../../data/phishing_url_dataset.csv",
)

_url_model = None


# ---------------------------------------------------------------------------
# Training
# ---------------------------------------------------------------------------

def train_url_model():
    global _url_model

    if os.path.exists(MODEL_PATH):
        os.remove(MODEL_PATH)

    data = pd.read_csv(DATASET_PATH)
    data = data.dropna(subset=["link", "label"])

    # Extract features for every URL
    feature_rows = data["link"].apply(lambda u: features_to_array(extract_url_features(str(u))))
    X = np.array(feature_rows.tolist())

    # Map labels: fraud → 1, safe → 0
    y = (data["label"].str.strip().str.lower() == "fraud").astype(int)

    _url_model = RandomForestClassifier(
        n_estimators=100,
        max_depth=15,
        class_weight="balanced",
        random_state=42,
        n_jobs=-1,
    )
    _url_model.fit(X, y)

    with open(MODEL_PATH, "wb") as f:
        pickle.dump(_url_model, f)

    print(f"[URL Model] Trained on {len(X)} samples and saved to {MODEL_PATH}")


# ---------------------------------------------------------------------------
# Loading
# ---------------------------------------------------------------------------

def load_url_model():
    global _url_model

    if _url_model is None:
        if os.path.exists(MODEL_PATH):
            with open(MODEL_PATH, "rb") as f:
                _url_model = pickle.load(f)
            print(f"[URL Model] Loaded from {MODEL_PATH}")
        else:
            print("[URL Model] No saved model found. Training now...")
            train_url_model()

    return _url_model


# ---------------------------------------------------------------------------
# Prediction
# ---------------------------------------------------------------------------

def predict_url(url: str) -> dict:
    model = load_url_model()

    features = extract_url_features(url)
    X = np.array([features_to_array(features)])

    proba = model.predict_proba(X)[0]  # [prob_safe, prob_fraud]
    classes = list(model.classes_)      # [0, 1]

    fraud_idx = classes.index(1)
    fraud_prob = float(proba[fraud_idx])
    safe_prob = 1.0 - fraud_prob

    if fraud_prob >= 0.5:
        verdict = "fraud"
        confidence = round(fraud_prob, 4)
    else:
        verdict = "safe"
        confidence = round(safe_prob, 4)

    risk_score = round(fraud_prob * 10, 1)

    return {
        "verdict": verdict,
        "confidence": confidence,
        "risk_score": risk_score,
    }

import re
from urllib.parse import urlparse

SUSPICIOUS_KEYWORDS = [
    "login", "verify", "secure", "account", "update",
    "bank", "payment", "confirm", "signin"
]


def extract_url_features(url: str) -> dict:
    """Extract numerical features from a URL for ML prediction."""
    parsed = urlparse(url if "://" in url else "http://" + url)
    hostname = parsed.hostname or ""

    features = {
        "url_length": len(url),
        "domain_length": len(hostname),
        "count_dots": url.count("."),
        "count_hyphens": url.count("-"),
        "count_digits": sum(c.isdigit() for c in url),
        "count_subdomains": max(len(hostname.split(".")) - 2, 0),
        "has_ip_address": 1 if re.match(r"^\d{1,3}(\.\d{1,3}){3}$", hostname) else 0,
        "contains_suspicious_keywords": 1 if any(kw in url.lower() for kw in SUSPICIOUS_KEYWORDS) else 0,
    }
    return features


FEATURE_ORDER = [
    "url_length", "domain_length", "count_dots", "count_hyphens",
    "count_digits", "count_subdomains", "has_ip_address",
    "contains_suspicious_keywords",
]


def features_to_array(features: dict) -> list:
    """Convert feature dict to ordered list for model input."""
    return [features[f] for f in FEATURE_ORDER]


def _build_explanation(url: str, features: dict) -> list:
    """Generate human-readable explanations based on extracted features."""
    reasons = []

    if features["has_ip_address"]:
        reasons.append("URL uses IP address instead of domain")

    if features["contains_suspicious_keywords"]:
        matched = [kw for kw in SUSPICIOUS_KEYWORDS if kw in url.lower()]
        reasons.append(f"URL contains phishing keyword: {', '.join(matched)}")

    if features["count_subdomains"] >= 3:
        reasons.append("Suspicious number of subdomains")

    if features["url_length"] > 75:
        reasons.append("Unusually long URL")

    if features["count_hyphens"] >= 4:
        reasons.append("Excessive use of hyphens in URL")

    return reasons


def analyze_link(url: str) -> dict:
    from ai_models.url_classifier import predict_url

    result = predict_url(url)
    features = extract_url_features(url)
    explanation = _build_explanation(url, features)

    return {
        "verdict": result["verdict"],
        "confidence": result["confidence"],
        "risk_score": result["risk_score"],
        "explanation": explanation,
    }
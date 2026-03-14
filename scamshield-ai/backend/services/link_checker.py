import re
import socket
import requests
from urllib.parse import urlparse

SUSPICIOUS_KEYWORDS = [
"login","verify","secure","account","update",
"bank","payment","confirm","signin",
"refund","otp","registration","fee","dob"
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


# ----------- NEW NETWORK CHECKS (SAFE ADDITION) -----------

def _domain_exists(url: str) -> bool:
    """Check if the domain resolves via DNS."""
    try:
        parsed = urlparse(url if "://" in url else "http://" + url)
        domain = parsed.hostname
        socket.gethostbyname(domain)
        return True
    except:
        return False


def _url_reachable(url: str):
    """Check if the website responds to HTTP request."""
    try:
        if not url.startswith(("http://", "https://")):
            url = "http://" + url
        r = requests.get(url, timeout=4)
        return r.status_code
    except:
        return None


# ----------- MAIN ANALYSIS FUNCTION -----------

def analyze_link(url: str) -> dict:
    from ai_models.url_classifier import predict_url

    result = predict_url(url)
    features = extract_url_features(url)
    explanation = _build_explanation(url, features)

    risk_score = result.get("risk_score", 5.0)

    parsed = urlparse(url if "://" in url else "http://" + url)
    domain = parsed.hostname

    # ---------------- DNS CHECK ----------------
    domain_ok = _domain_exists(url)

    if not domain_ok:
        risk_score = max(risk_score, 9.0)
        explanation.append("Domain DNS lookup failed — site likely does not exist")

    # ---------------- HTTP CHECK ----------------
    status = None
    if domain_ok:
        status = _url_reachable(url)

        if status is None:
            risk_score = max(risk_score, 8.0)
            explanation.append("Website server not responding")

        elif status >= 500:
            risk_score = max(risk_score, 7.5)
            explanation.append(f"Server error detected (HTTP {status})")

        elif status >= 400:
            risk_score = max(risk_score, 7.0)
            explanation.append(f"Broken or suspicious endpoint (HTTP {status})")

    # ---------------- EXTRA PHISHING HEURISTICS ----------------
    if domain:
        parts = domain.split(".")

        # suspicious TLDs often used in phishing
        suspicious_tlds = ["xyz", "top", "click", "gq", "tk", "work"]

        if parts[-1] in suspicious_tlds:
            risk_score = max(risk_score, 6.5)
            explanation.append("Suspicious top-level domain")

        # fake brand domains
        brand_keywords = ["paypal", "amazon", "bank", "apple", "google"]

        if any(b in domain.lower() for b in brand_keywords) and domain.count("-") >= 1:
            risk_score = max(risk_score, 7.5)
            explanation.append("Brand impersonation pattern detected")

    risk_score = min(risk_score, 10.0)

    # ---------------- FINAL VERDICT ----------------
    if risk_score >= 7:
        verdict = "fraud"
    elif risk_score >= 4:
        verdict = "suspicious"
    else:
        verdict = "safe"

    return {
        "verdict": verdict,
        "confidence": result.get("confidence", 0.5),
        "risk_score": risk_score,
        "explanation": explanation,
    }
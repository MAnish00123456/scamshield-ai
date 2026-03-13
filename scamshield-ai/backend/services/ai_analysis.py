scam_keywords = {
    "otp": 20,
    "kyc": 20,
    "verify": 15,
    "urgent": 10,
    "click": 10,
    "account": 10,
    "bank": 15,
    "lottery": 20,
    "reward": 20,
    "prize": 20,

    # job scam patterns
    "work from home": 25,
    "earn money": 20,
    "earn": 10,
    "income": 15,
    "no experience": 25,
    "part time": 15,
    "job opportunity": 20,
    "smart phone": 15,
    "tap here": 15,

    # financial bait
    "5000": 15,
    "usd": 10,
    "per month": 10
}
def analyze_text_for_scam(text):

    score = 0
    found_keywords = []

    text = text.lower()
    text = text.replace("\n", " ")

    for word, weight in scam_keywords.items():
        if word in text:
            score += weight
            found_keywords.append(word)

    risk = "Low"

    if score >= 40:
        risk = "High"
    elif score >= 20:
        risk = "Medium"

    return {
        "risk_score": score,
        "risk_level": risk,
        "matched_keywords": found_keywords
    }
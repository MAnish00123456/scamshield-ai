import re

scam_keywords = {

    # common scam
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

    # job scam
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
    "per month": 10,

    # social engineering / money scam
    "borrow": 25,
    "transfer": 20,
    "send money": 25,
    "help me": 20,
    "wrong card": 20,
    "need money": 20,
    "bsb": 25,
    "acc": 20,
    "account number": 20,
    "tonight": 10,
    "please transfer": 20,

    # crypto / trading scam
    "trading": 20,
    "crypto": 25,
    "profit": 20,
    "profits": 20,
    "investment": 25,
    "auto trading": 25,
    "passive income": 25,
    "made $": 20,
    "earn daily": 25,
    "investment opportunity": 25,
    "show you how": 20
}


def analyze_text_for_scam(text):

    score = 0
    found_keywords = set()

    if not text:
        return {
            "risk_score": 0,
            "label": "SAFE",
            "matched_keywords": [],
            "explanation": "No text detected in image.",
            "advice": "Try uploading a clearer screenshot."
        }

    # clean OCR noise
    text = text.lower()
    text = re.sub(r"\s+", " ", text)

    # keyword detection
    for word, weight in scam_keywords.items():

        if word in text:
            score += weight
            found_keywords.add(word)

    # OTP pattern detection
    otp_pattern = r"\b\d{4,6}\b"

    if re.search(otp_pattern, text):
        score += 15
        found_keywords.add("otp_code")

    # bank account number detection
    account_pattern = r"\b\d{8,14}\b"

    if re.search(account_pattern, text):
        score += 15
        found_keywords.add("bank_account_number")

    # money amount detection ($3200 etc)
    money_pattern = r"\$\d+"

    if re.search(money_pattern, text):
        score += 20
        found_keywords.add("money_amount")

    # suspicious URL detection
    url_pattern = r"(http|https)://"

    if re.search(url_pattern, text):
        score += 10
        found_keywords.add("suspicious_link")

    # money request pattern
    money_request_pattern = r"(borrow|send money|transfer)"

    if re.search(money_request_pattern, text):
        score += 20
        found_keywords.add("money_request")

    # normalize score
    risk_score = min(round(score / 10, 1), 10)

    # classification
    if risk_score >= 7:
        label = "MALICIOUS"
    elif risk_score >= 4:
        label = "SUSPICIOUS"
    else:
        label = "SAFE"

    # explanation
    if found_keywords:
        explanation = "Detected scam indicators: " + ", ".join(found_keywords)
    else:
        explanation = "No suspicious scam indicators detected."

    # advice
    if label == "MALICIOUS":
        advice = "Do NOT interact with this message. Block and report the sender."
    elif label == "SUSPICIOUS":
        advice = "Be cautious. Verify the sender before responding."
    else:
        advice = "This message appears safe."

    return {
        "risk_score": risk_score,
        "label": label,
        "matched_keywords": list(found_keywords),
        "explanation": explanation,
        "advice": advice
    }
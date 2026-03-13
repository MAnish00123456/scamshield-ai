import re

suspicious_domains = [
    "login",
    "verify",
    "secure",
    "bank",
    "update",
    "account"
]


def analyze_link(url):

    score = 0
    found = []

    for word in suspicious_domains:

        if word in url:
            score += 2
            found.append(word)

    if "http://" in url:
        score += 2
        found.append("no_https")

    label = "SAFE"

    if score >= 6:
        label = "MALICIOUS"
    elif score >= 3:
        label = "SUSPICIOUS"

    return {
        "risk_score": score,
        "label": label,
        "indicators": found
    }
from fastapi import APIRouter
from pydantic import BaseModel

from ai_models.scam_classifier import predict_scam

router = APIRouter()


class ChatRequest(BaseModel):
    message: str


@router.post("/chat")
async def chat(request: ChatRequest):
    result = predict_scam(request.message)

    scam_type = result["scam_type"]
    confidence = result["confidence"]
    risk_score = result["risk_score"]
    verdict = result["verdict"]
    matched_keywords = result["matched_keywords"]

    confidence_pct = int(confidence * 100)

    if scam_type == "legitimate_message":
        reply = (
            f"✅ Scam Analysis\n\n"
            f"Verdict: {verdict}\n"
            f"Confidence: {confidence_pct}%\n"
            f"Risk Score: {risk_score} / 10"
        )
    else:
        friendly = scam_type.replace("_", " ").title()
        reply = (
            f"⚠ Scam Analysis\n\n"
            f"Verdict: Possible {friendly}\n"
            f"Confidence: {confidence_pct}%\n"
            f"Risk Score: {risk_score} / 10"
        )

    if matched_keywords:
        keywords_str = ", ".join(matched_keywords)
        reply += f"\n\nSuspicious keywords detected: {keywords_str}"

    return {
        "reply": reply,
        "analysis": result,
    }

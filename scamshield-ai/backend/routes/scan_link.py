from fastapi import APIRouter
from pydantic import BaseModel

from services.link_checker import analyze_link

router = APIRouter()


class LinkRequest(BaseModel):
    url: str


@router.post("/scan-link")
async def scan_link(data: LinkRequest):

    result = analyze_link(data.url)

    return {
        "url": data.url,
        "verdict": result["verdict"],
        "confidence": result["confidence"],
        "risk_score": result["risk_score"],
        "explanation": result["explanation"],
    }
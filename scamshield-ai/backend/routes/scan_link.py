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
        "status": "success",
        "url": data.url,
        "analysis": result
    }
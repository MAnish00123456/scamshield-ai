from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
import uuid

from services.speech_service import process_audio
from services.ai_analysis import analyze_text_for_scam

router = APIRouter()

UPLOAD_FOLDER = "temp"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/scan-audio")
async def scan_audio(file: UploadFile = File(...)):

    try:

        file_id = str(uuid.uuid4())
        file_ext = os.path.splitext(file.filename)[1]

        file_path = os.path.join(UPLOAD_FOLDER, file_id + file_ext)

        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # speech → text
        transcript = await process_audio(file_path)

        # AI scam detection
        analysis = analyze_text_for_scam(transcript)

        return {
            "status": "success",
            "transcript": transcript,
            "analysis": analysis
        }

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))
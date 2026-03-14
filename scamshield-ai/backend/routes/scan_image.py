from fastapi import APIRouter, UploadFile, File, HTTPException
import shutil
import os
import uuid

from services.ocr_service import detect_and_extract
from services.ai_analysis import analyze_text_for_scam

router = APIRouter()

UPLOAD_FOLDER = "temp"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/scan-image")
async def scan_image(file: UploadFile = File(...)):

    try:

        # unique filename
        file_id = str(uuid.uuid4())
        file_ext = os.path.splitext(file.filename)[1]
        file_path = os.path.join(UPLOAD_FOLDER, file_id + file_ext)

        # save file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        # OCR or text extraction
        extracted_text = detect_and_extract(file_path)
        print("OCR TEXT:", extracted_text)

        # AI analysis
        analysis_result = analyze_text_for_scam(extracted_text)

        return {
            "status": "success",
            "file_type": file_ext,
            "extracted_text": extracted_text[:500],
            "analysis": analysis_result
        }

    except Exception as e:

        raise HTTPException(status_code=500, detail=str(e))
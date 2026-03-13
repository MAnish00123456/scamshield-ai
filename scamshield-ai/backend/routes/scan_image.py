from fastapi import APIRouter, UploadFile, File
import shutil
import os

from services.ocr_service import extract_text
from services.ai_analysis import analyze_text_for_scam

router = APIRouter()

UPLOAD_FOLDER = "temp"

# Create temp folder if it doesn't exist

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

@router.post("/scan-image")
async def scan_image(file: UploadFile = File(...)):

    # Save uploaded image
    file_path = os.path.join(UPLOAD_FOLDER, str(file.filename))

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # OCR
    extracted_text = extract_text(file_path)

    # AI scam detection
    analysis_result = analyze_text_for_scam(extracted_text)

    return {
        "extracted_text": extracted_text,
        "analysis": analysis_result
    }
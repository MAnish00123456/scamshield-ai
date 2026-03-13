from services.ocr_service import detect_and_extract
from services.ai_analysis import analyze_text_for_scam


def analyze_file(file_path):

    text = detect_and_extract(file_path)

    result = analyze_text_for_scam(text)

    result["extracted_text"] = text[:300]

    return result
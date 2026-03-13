import pdfplumber
from ai_models.scam_classifier import detect_scam

def scan_pdf(file_path):

    text = ""

    with pdfplumber.open(file_path) as pdf:
        for page in pdf.pages:
            page_text = page.extract_text()

            if page_text:
                text += page_text

    result = detect_scam(text)

    return result
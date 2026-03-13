import pytesseract
import cv2
import os
import pdfplumber
import whisper

# tesseract path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# whisper model load once
speech_model = whisper.load_model("base")


def extract_text_from_image(image_path):

    img = cv2.imread(image_path)

    if img is None:
        return ""

    img = cv2.resize(img, None, fx=1.5, fy=1.5, interpolation=cv2.INTER_CUBIC)

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    gray = cv2.medianBlur(gray, 3)

    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        11,
        2
    )

    config = "--oem 3 --psm 6"

    text = pytesseract.image_to_string(thresh, config=config)

    return text.strip()


def extract_text_from_pdf(pdf_path):

    text = ""

    with pdfplumber.open(pdf_path) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + " "

    return text.strip()


def extract_text_from_audio(audio_path):

    result = speech_model.transcribe(audio_path)

    return result["text"]


def detect_and_extract(file_path):

    ext = os.path.splitext(file_path)[1].lower()

    if ext in [".png", ".jpg", ".jpeg", ".webp"]:

        return extract_text_from_image(file_path)

    elif ext == ".pdf":

        return extract_text_from_pdf(file_path)

    elif ext in [".mp3", ".wav", ".m4a"]:

        return extract_text_from_audio(file_path)

    elif ext in [".txt"]:

        with open(file_path, "r", encoding="utf-8") as f:
            return f.read()

    else:

        return ""
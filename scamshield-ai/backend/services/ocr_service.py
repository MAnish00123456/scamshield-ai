import pytesseract
import cv2
import os
import pdfplumber
import whisper
import re
import numpy as np

# tesseract path
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

# whisper model load once
speech_model = whisper.load_model("base")

# scam keywords to strengthen detection
SCAM_KEYWORDS = [
    "otp",
    "bank account",
    "refund",
    "dob",
    "share details",
    "account number",
    "verification code",
    "urgent",
    "asap",
    "transfer money",
    "job interview fee",
]


def clean_text(text):
    text = text.lower()
    text = re.sub(r"\s+", " ", text)
    return text.strip()


def boost_scam_signals(text):
    detected = []

    for word in SCAM_KEYWORDS:
        if word in text:
            detected.append(word)

    if detected:
        text += " " + " ".join(detected)

    return text


def extract_text_from_image(image_path):

    img = cv2.imread(image_path)

    if img is None:
        return ""

    # upscale image (helps OCR)
    img = cv2.resize(img, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)

    # convert to grayscale
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # remove noise
    gray = cv2.bilateralFilter(gray, 9, 75, 75)

    # strong threshold
    thresh = cv2.adaptiveThreshold(
        gray,
        255,
        cv2.ADAPTIVE_THRESH_GAUSSIAN_C,
        cv2.THRESH_BINARY,
        31,
        2
    )

    # invert (better for dark UI screenshots)
    thresh = cv2.bitwise_not(thresh)

    config = "--oem 3 --psm 6"

    text = pytesseract.image_to_string(thresh, config=config)

    print("\n===== OCR TEXT =====")
    print(text)
    print("====================\n")

    return text.strip()


def extract_text_from_pdf(pdf_path):

    text = ""

    with pdfplumber.open(pdf_path) as pdf:

        for page in pdf.pages:

            page_text = page.extract_text()

            if page_text:
                text += page_text + " "

    text = clean_text(text)
    text = boost_scam_signals(text)

    return text.strip()


def extract_text_from_audio(audio_path):

    result = speech_model.transcribe(audio_path)

    text = result["text"]

    text = clean_text(text)
    text = boost_scam_signals(text)

    return text


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
            text = f.read()

        text = clean_text(text)
        text = boost_scam_signals(text)

        return text

    else:

        return ""
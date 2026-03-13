import pytesseract
import cv2

# Tell pytesseract where tesseract.exe is
pytesseract.pytesseract.tesseract_cmd = r"C:\Program Files\Tesseract-OCR\tesseract.exe"

def extract_text(image_path):

    img = cv2.imread(image_path)

    # convert to grayscale (better OCR)
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

    # optional: threshold for clearer text
    gray = cv2.threshold(gray, 150, 255, cv2.THRESH_BINARY)[1]

    text = pytesseract.image_to_string(gray)

    return text
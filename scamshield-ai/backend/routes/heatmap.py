from fastapi import APIRouter
import random

router = APIRouter()

states = [
"Delhi","Maharashtra","Uttar Pradesh","Bihar","West Bengal","Tamil Nadu",
"Karnataka","Gujarat","Rajasthan","Madhya Pradesh","Punjab","Haryana",
"Odisha","Kerala","Assam","Jharkhand","Chhattisgarh","Uttarakhand",
"Himachal Pradesh","Goa","Tripura","Meghalaya","Manipur","Nagaland",
"Mizoram","Sikkim","Arunachal Pradesh"
]

scam_types = [
    "OTP Scam",
    "KYC Scam",
    "Lottery Scam",
    "Job Scam",
    "Investment Scam",
    "Phishing Link"
]

@router.get("/heatmap")
def get_heatmap():

    data = []

    for state in states:

        entry = {
            "state": state,
            "OTP Scam": random.randint(0,50),
            "KYC Scam": random.randint(0,50),
            "Lottery Scam": random.randint(0,50),
            "Job Scam": random.randint(0,50),
            "Investment Scam": random.randint(0,50),
            "Phishing Link": random.randint(0,50)
        }

        data.append(entry)

    return data
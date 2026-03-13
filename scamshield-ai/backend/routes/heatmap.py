from fastapi import APIRouter
import random

router = APIRouter()

# List of Indian states

states = [
"Delhi","Maharashtra","Uttar Pradesh","Bihar","West Bengal","Tamil Nadu",
"Karnataka","Gujarat","Rajasthan","Madhya Pradesh","Punjab","Haryana",
"Odisha","Kerala","Assam","Jharkhand","Chhattisgarh","Uttarakhand",
"Himachal Pradesh","Goa","Tripura","Meghalaya","Manipur","Nagaland",
"Mizoram","Sikkim","Arunachal Pradesh"
]

@router.get("/heatmap")
def get_heatmap():
    data = []

    for state in states:
        entry = {
        "state": state,
        "cases": random.randint(5,100)
    }
    data.append(entry)

    return data

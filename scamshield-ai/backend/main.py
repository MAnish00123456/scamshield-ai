from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes.scan_image import router as scan_image_router

# Create FastAPI app
app = FastAPI()

# Enable CORS so React frontend can call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow all origins (good for development)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register image scanning route
app.include_router(scan_image_router)

# Root route to check if backend is running
@app.get("/")
def home():
    return {"message": "ScamShield AI Backend Running"}
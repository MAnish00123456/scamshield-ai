from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Import routers
from routes.scan_image import router as scan_image_router
from routes.scan_audio import router as scan_audio_router
from routes.scan_link import router as scan_link_router
from routes.heatmap import router as heatmap_router
from routes.chat import router as chat_router


# Create FastAPI app
app = FastAPI(
    title="ScamShield AI API",
    description="Multi-modal scam detection system (image, audio, links)",
    version="1.0"
)


# Enable CORS so React frontend can call backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],   # allow frontend during development
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Register API routes
app.include_router(scan_image_router, tags=["Image Scan"])
app.include_router(scan_audio_router, tags=["Audio Scan"])
app.include_router(scan_link_router, tags=["Link Scan"])
app.include_router(heatmap_router, tags=["Heatmap"])
app.include_router(chat_router, tags=["Chat AI"])


# Root route
@app.get("/")
def home():
    return {
        "message": "ScamShield AI Backend Running",
        "services": [
            "Image Scam Detection",
            "Audio Scam Detection",
            "Link Phishing Detection",
            "Scam Heatmap",
            "AI Chat Assistant"
        ]
    }


# Health check endpoint
@app.get("/health")
def health():
    return {"status": "ok"}
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import models
from .auth import router as auth_router
from .users import router as users_router
from .subscription import router as subscription_router
import uvicorn

# Create all tables in the database on startup
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CareFlow API",
    description="Enterprise Healthcare Operating System Backend API",
    version="1.0.0",
)

# CORS — allow Next.js dev server
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(auth_router)
app.include_router(users_router)
app.include_router(subscription_router)


@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "CareFlow API"}

@app.get("/")
def read_root():
    return {"message": "Welcome to CareFlow API"}

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)

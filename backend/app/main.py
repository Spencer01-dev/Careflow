from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine, Base
from . import models
from .auth import router as auth_router
from .users import router as users_router
from .subscription import router as subscription_router
import uvicorn
import logging

logger = logging.getLogger(__name__)


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create tables if they don't exist
    try:
        from .config import settings
        import os
        db_url = settings.DATABASE_URL
        # Log masked URL so we can debug without exposing credentials
        masked = db_url[:20] + "..." if len(db_url) > 20 else db_url
        logger.info(f"DATABASE_URL starts with: {masked}")
        logger.info(f"DATABASE_URL env var present: {'DATABASE_URL' in os.environ}")
        models.Base.metadata.create_all(bind=engine)
        logger.info("Database tables created/verified successfully.")
    except Exception as e:
        logger.error(f"Failed to connect to the database on startup: {e}")
        raise
    yield
    # Shutdown: nothing to clean up for sync engine


app = FastAPI(
    title="CareFlow API",
    description="Enterprise Healthcare Operating System Backend API",
    version="1.0.0",
    lifespan=lifespan,
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

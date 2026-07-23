from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    # Default postgres connection string (change in .env file)
    DATABASE_URL: str = "postgresql://postgres:postgres@localhost:5432/careflow"
    SECRET_KEY: str = "supersecretkey_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 1440 # 24 hours

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

settings = Settings()

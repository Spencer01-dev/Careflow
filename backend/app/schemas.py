from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# Token Schemas
class Token(BaseModel):
    access_token: str
    token_type: str
    user_name: str
    role: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: str
    department: Optional[str] = "General Outpatient"
    status: Optional[str] = "active"

class UserCreate(UserBase):
    password: str
    hospital_id: Optional[int] = None

class UserCreateByAdmin(BaseModel):
    email: EmailStr
    first_name: str
    last_name: str
    role: str
    department: str
    password: str

class UserUpdateStatus(BaseModel):
    status: str

class User(UserBase):
    id: int
    is_active: bool
    hospital_id: Optional[int]
    created_at: datetime

    class Config:
        from_attributes = True

# Hospital Schemas
class HospitalBase(BaseModel):
    name: str
    type: str
    country: str
    city: str
    email: EmailStr
    phone: str

class HospitalCreate(HospitalBase):
    pass

class Hospital(HospitalBase):
    id: int
    plan: Optional[str] = "professional"
    max_users: Optional[int] = 200
    subscription_status: Optional[str] = "active"
    unlocked_modules: Optional[str] = "All Modules"
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True

class SubscriptionInfo(BaseModel):
    hospital_name: str
    plan: str
    max_users: int
    used_seats: int
    subscription_status: str
    unlocked_modules: str

class UpgradePlanRequest(BaseModel):
    plan: str


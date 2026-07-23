from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from .database import Base

class Hospital(Base):
    __tablename__ = "hospitals"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String)
    country = Column(String)
    city = Column(String)
    email = Column(String, unique=True, index=True)
    phone = Column(String)
    plan = Column(String, default="professional")  # starter, professional, enterprise
    max_users = Column(Integer, default=200)       # seat limit
    subscription_status = Column(String, default="active") # active, trial, expired
    unlocked_modules = Column(String, default="OPD, IPD, Laboratory, Pharmacy, Radiology, ICU, Billing")
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    users = relationship("User", back_populates="hospital")

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    hashed_password = Column(String)
    role = Column(String, default="staff") # super_admin, hospital_admin, doctor, nurse, etc.
    department = Column(String, default="General Outpatient")
    status = Column(String, default="active") # active, disabled, invited
    is_active = Column(Boolean, default=True)
    hospital_id = Column(Integer, ForeignKey("hospitals.id"), nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    hospital = relationship("Hospital", back_populates="users")


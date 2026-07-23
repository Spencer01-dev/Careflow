from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
import bcrypt

from . import models, schemas
from .database import get_db
from .auth import get_current_user

router = APIRouter(prefix="/api/users", tags=["Staff & User Management"])

PLAN_SEAT_LIMITS = {
    "starter": 20,
    "professional": 200,
    "enterprise": 9999,
}

@router.get("", response_model=List[schemas.User])
def get_all_users(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # Fetch all users belonging to the same hospital workspace (or all users if super admin)
    if current_user.hospital_id:
        users = db.query(models.User).filter(models.User.hospital_id == current_user.hospital_id).all()
    else:
        users = db.query(models.User).all()
    return users


@router.post("", response_model=schemas.User, status_code=201)
def create_staff_user(
    payload: schemas.UserCreateByAdmin,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    # 1. Check if current user is authorized to grant access
    if current_user.role not in ["Super Admin", "Hospital Admin", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Only Admins can grant staff access."
        )

    # 2. Check if email already exists
    existing_user = db.query(models.User).filter(models.User.email == payload.email).first()
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="An account with this email address already exists."
        )

    # 3. Check seat limit enforcement
    hospital = None
    if current_user.hospital_id:
        hospital = db.query(models.Hospital).filter(models.Hospital.id == current_user.hospital_id).first()

    if hospital:
        active_seats = db.query(models.User).filter(models.User.hospital_id == hospital.id).count()
        max_seats = hospital.max_users or PLAN_SEAT_LIMITS.get((hospital.plan or "professional").lower(), 200)
        if active_seats >= max_seats:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Seat limit reached ({active_seats}/{max_seats} users used). Please upgrade your package subscription to add more staff."
            )

    # 4. Hash password & create user
    hashed_pwd = bcrypt.hashpw(payload.password.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")
    
    new_user = models.User(
        email=payload.email,
        first_name=payload.first_name,
        last_name=payload.last_name,
        hashed_password=hashed_pwd,
        role=payload.role,
        department=payload.department,
        status="active",
        is_active=True,
        hospital_id=current_user.hospital_id,
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.patch("/{user_id}/status", response_model=schemas.User)
def toggle_user_status(
    user_id: int,
    payload: schemas.UserUpdateStatus,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role not in ["Super Admin", "Hospital Admin", "admin"]:
        raise HTTPException(status_code=403, detail="Permission denied.")

    target_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found.")

    target_user.status = payload.status
    target_user.is_active = (payload.status == "active")
    db.commit()
    db.refresh(target_user)
    return target_user


@router.delete("/{user_id}", status_code=204)
def delete_user(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role not in ["Super Admin", "Hospital Admin", "admin"]:
        raise HTTPException(status_code=403, detail="Permission denied.")

    target_user = db.query(models.User).filter(models.User.id == user_id).first()
    if not target_user:
        raise HTTPException(status_code=404, detail="User not found.")

    if target_user.id == current_user.id:
        raise HTTPException(status_code=400, detail="Cannot delete your own admin account.")

    db.delete(target_user)
    db.commit()
    return None

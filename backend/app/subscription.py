from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from . import models, schemas
from .database import get_db
from .auth import get_current_user

router = APIRouter(prefix="/api/subscription", tags=["Package & Subscription Management"])

PLAN_DETAILS = {
    "starter": {
        "name": "Starter",
        "max_users": 20,
        "unlocked_modules": "OPD, Pharmacy, Billing",
    },
    "professional": {
        "name": "Professional",
        "max_users": 200,
        "unlocked_modules": "OPD, IPD, Laboratory, Pharmacy, Radiology, ICU, Billing",
    },
    "enterprise": {
        "name": "Enterprise",
        "max_users": 9999,
        "unlocked_modules": "All Modules (OPD, IPD, Lab, Pharmacy, Radiology, ICU, Telemedicine, AI Diagnostics, Billing, HR)",
    },
}

@router.get("", response_model=schemas.SubscriptionInfo)
def get_subscription_info(
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    hospital = None
    if current_user.hospital_id:
        hospital = db.query(models.Hospital).filter(models.Hospital.id == current_user.hospital_id).first()

    if not hospital:
        # Default fallback for standalone super admin
        used_seats = db.query(models.User).count()
        return schemas.SubscriptionInfo(
            hospital_name="CareFlow Primary Network",
            plan="Professional",
            max_users=200,
            used_seats=used_seats,
            subscription_status="active",
            unlocked_modules="OPD, IPD, Laboratory, Pharmacy, Radiology, ICU, Billing",
        )

    used_seats = db.query(models.User).filter(models.User.hospital_id == hospital.id).count()
    plan_key = (hospital.plan or "professional").lower()
    details = PLAN_DETAILS.get(plan_key, PLAN_DETAILS["professional"])

    return schemas.SubscriptionInfo(
        hospital_name=hospital.name,
        plan=details["name"],
        max_users=hospital.max_users or details["max_users"],
        used_seats=used_seats,
        subscription_status=hospital.subscription_status or "active",
        unlocked_modules=hospital.unlocked_modules or details["unlocked_modules"],
    )


@router.post("/upgrade", response_model=schemas.SubscriptionInfo)
def upgrade_subscription_plan(
    payload: schemas.UpgradePlanRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user),
):
    if current_user.role not in ["Super Admin", "Hospital Admin", "admin"]:
        raise HTTPException(status_code=403, detail="Only Admins can upgrade the package subscription.")

    plan_key = payload.plan.lower()
    if plan_key not in PLAN_DETAILS:
        raise HTTPException(status_code=400, detail="Invalid plan selected.")

    plan_data = PLAN_DETAILS[plan_key]

    hospital = None
    if current_user.hospital_id:
        hospital = db.query(models.Hospital).filter(models.Hospital.id == current_user.hospital_id).first()

    if hospital:
        hospital.plan = plan_data["name"]
        hospital.max_users = plan_data["max_users"]
        hospital.unlocked_modules = plan_data["unlocked_modules"]
        hospital.subscription_status = "active"
        db.commit()
        db.refresh(hospital)

    used_seats = db.query(models.User).filter(models.User.hospital_id == current_user.hospital_id).count() if current_user.hospital_id else db.query(models.User).count()

    return schemas.SubscriptionInfo(
        hospital_name=hospital.name if hospital else "CareFlow Primary Network",
        plan=plan_data["name"],
        max_users=plan_data["max_users"],
        used_seats=used_seats,
        subscription_status="active",
        unlocked_modules=plan_data["unlocked_modules"],
    )

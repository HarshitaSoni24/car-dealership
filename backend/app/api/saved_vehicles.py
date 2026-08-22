from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.database import get_db
from app.models.saved_vehicle import SavedVehicle
from app.schemas.saved_vehicle import SavedVehicleCreate, SavedVehicleResponse
from app.core.dependencies import get_current_user
from app.models.user import User

router = APIRouter(prefix="/api/saved-vehicles", tags=["Saved Vehicles"])

@router.post("", response_model=SavedVehicleResponse, status_code=status.HTTP_201_CREATED)
def save_vehicle(
    save_in: SavedVehicleCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Check if already saved
    existing = db.query(SavedVehicle).filter(
        SavedVehicle.user_id == current_user.id,
        SavedVehicle.vehicle_id == save_in.vehicle_id
    ).first()
    
    if existing:
        raise HTTPException(status_code=400, detail="Vehicle already saved")
    
    saved = SavedVehicle(user_id=current_user.id, vehicle_id=save_in.vehicle_id)
    db.add(saved)
    db.commit()
    db.refresh(saved)
    return saved

@router.delete("/{vehicle_id}", status_code=status.HTTP_204_NO_CONTENT)
def unsave_vehicle(
    vehicle_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    saved = db.query(SavedVehicle).filter(
        SavedVehicle.user_id == current_user.id,
        SavedVehicle.vehicle_id == vehicle_id
    ).first()
    
    if not saved:
        raise HTTPException(status_code=404, detail="Vehicle not saved")
    
    db.delete(saved)
    db.commit()
    return None

@router.get("", response_model=List[SavedVehicleResponse])
def get_my_garage(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(SavedVehicle).filter(SavedVehicle.user_id == current_user.id).all()

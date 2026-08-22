from pydantic import BaseModel

class SavedVehicleCreate(BaseModel):
    vehicle_id: int

class SavedVehicleResponse(BaseModel):
    id: int
    user_id: int
    vehicle_id: int

    class Config:
        from_attributes = True

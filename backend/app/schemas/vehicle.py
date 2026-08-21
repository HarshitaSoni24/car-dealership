from pydantic import BaseModel
from typing import Optional
from pydantic import Field

class VehicleCreate(BaseModel):
    make: str
    model: str
    category: str
    price: float
    quantity: int

class VehicleUpdate(BaseModel):
    make: Optional[str] = None
    model: Optional[str] = None
    category: Optional[str] = None
    price: Optional[float] = None
    quantity: Optional[int] = None

class VehicleResponse(BaseModel):
    id: int
    make: str
    model: str
    category: str
    price: float
    quantity: int

    class Config:
        from_attributes = True

class RestockRequest(BaseModel):
    amount: int = Field(gt=0, description="Amount to add to stock, must be greater than 0")
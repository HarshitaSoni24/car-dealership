from pydantic import BaseModel, Field
from typing import Optional

class VehicleCreate(BaseModel):
    make: str = Field(..., min_length=1, max_length=50)
    model: str = Field(..., min_length=1, max_length=50)
    category: str = Field(..., min_length=1, max_length=30)
    price: float = Field(..., gt=0, description="Price must be > 0")
    quantity: int = Field(..., ge=0, description="Quantity must be >= 0")

class VehicleUpdate(BaseModel):
    make: Optional[str] = Field(None, min_length=1, max_length=50)
    model: Optional[str] = Field(None, min_length=1, max_length=50)
    category: Optional[str] = Field(None, min_length=1, max_length=30)
    price: Optional[float] = Field(None, gt=0, description="Price must be > 0")
    quantity: Optional[int] = Field(None, ge=0, description="Quantity must be >= 0")

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
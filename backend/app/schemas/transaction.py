from pydantic import BaseModel
from datetime import datetime

class TransactionResponse(BaseModel):
    id: int
    user_id: int
    vehicle_id: int
    purchase_price: float
    timestamp: datetime

    class Config:
        from_attributes = True

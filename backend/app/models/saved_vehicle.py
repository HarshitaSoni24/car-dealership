from sqlalchemy import Column, Integer, ForeignKey
from app.database import Base

class SavedVehicle(Base):
    __tablename__ = "saved_vehicles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=False)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.api import auth, vehicles, saved_vehicles, transactions
from app.models.user import User
from app.models.vehicle import Vehicle
from app.models.transaction import Transaction
from app.models.saved_vehicle import SavedVehicle

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Car Dealership Inventory API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(vehicles.router)
app.include_router(saved_vehicles.router)
app.include_router(transactions.router)
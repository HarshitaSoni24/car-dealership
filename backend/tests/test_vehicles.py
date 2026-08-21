import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db

SQLALCHEMY_DATABASE_URL = "sqlite:///./test_dealership.db"
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

@pytest.fixture(scope="function", autouse=True)
def setup_db():
    Base.metadata.create_all(bind=engine)
    yield
    Base.metadata.drop_all(bind=engine)

def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

app.dependency_overrides[get_db] = override_get_db
client = TestClient(app)

def get_auth_token(username="user1", role="user"):
    client.post("/api/auth/register", json={
        "username": username,
        "email": f"{username}@test.com",
        "password": "password123",
        "role": role
    })
    res = client.post("/api/auth/login", json={
        "username": username,
        "password": "password123"
    })
    return res.json()["access_token"]

def test_create_and_get_vehicles():
    token = get_auth_token("admin1", "admin")
    headers = {"Authorization": f"Bearer {token}"}

    payload = {
        "make": "Toyota",
        "model": "Camry",
        "category": "Sedan",
        "price": 26000.0,
        "quantity": 5
    }
    create_res = client.post("/api/vehicles", json=payload, headers=headers)
    assert create_res.status_code == 201
    vehicle_id = create_res.json()["id"]

    # Get list of vehicles
    get_res = client.get("/api/vehicles", headers=headers)
    assert get_res.status_code == 200
    assert len(get_res.json()) == 1
    assert get_res.json()[0]["id"] == vehicle_id

def test_search_vehicles():
    token = get_auth_token("admin2", "admin")
    headers = {"Authorization": f"Bearer {token}"}

    # Seed two vehicles
    client.post("/api/vehicles", json={"make": "Toyota", "model": "RAV4", "category": "SUV", "price": 32000.0, "quantity": 3}, headers=headers)
    client.post("/api/vehicles", json={"make": "Honda", "model": "Civic", "category": "Sedan", "price": 24000.0, "quantity": 4}, headers=headers)

    # Search by category and price range
    res = client.get("/api/vehicles/search?category=SUV&min_price=30000&max_price=35000", headers=headers)
    assert res.status_code == 200
    results = res.json()
    assert len(results) == 1
    assert results[0]["model"] == "RAV4"

def test_update_vehicle():
    token = get_auth_token("admin3", "admin")
    headers = {"Authorization": f"Bearer {token}"}

    create_res = client.post("/api/vehicles", json={"make": "Ford", "model": "F-150", "category": "Truck", "price": 40000.0, "quantity": 2}, headers=headers)
    vehicle_id = create_res.json()["id"]

    update_res = client.put(f"/api/vehicles/{vehicle_id}", json={"price": 38500.0, "quantity": 3}, headers=headers)
    assert update_res.status_code == 200
    assert update_res.json()["price"] == 38500.0
    assert update_res.json()["quantity"] == 3

def test_delete_vehicle_permissions():
    admin_token = get_auth_token("admin4", "admin")
    user_token = get_auth_token("normal_user", "user")

    # Create vehicle as admin
    create_res = client.post(
        "/api/vehicles",
        json={"make": "Tesla", "model": "Model 3", "category": "Electric", "price": 39000.0, "quantity": 1},
        headers={"Authorization": f"Bearer {admin_token}"}
    )
    vehicle_id = create_res.json()["id"]

    # Normal user should be rejected (403 Forbidden)
    delete_user_res = client.delete(f"/api/vehicles/{vehicle_id}", headers={"Authorization": f"Bearer {user_token}"})
    assert delete_user_res.status_code == 403

    # Admin should be allowed (200 OK)
    delete_admin_res = client.delete(f"/api/vehicles/{vehicle_id}", headers={"Authorization": f"Bearer {admin_token}"})
    assert delete_admin_res.status_code == 200
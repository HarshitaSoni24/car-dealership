import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.main import app
from app.database import Base, get_db

# Use an isolated test database file
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

def test_register_user_success():
    payload = {
        "username": "john_doe",
        "email": "john@example.com",
        "password": "password123",
        "role": "user"
    }
    response = client.post("/api/auth/register", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "john_doe"
    assert data["email"] == "john@example.com"
    assert "password" not in data
    assert data["role"] == "user"

def test_login_user_success():
    # Register first
    client.post("/api/auth/register", json={
        "username": "jane_doe",
        "email": "jane@example.com",
        "password": "securepassword",
        "role": "admin"
    })
    
    # Attempt login
    response = client.post("/api/auth/login", json={
        "username": "jane_doe",
        "password": "securepassword"
    })
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["role"] == "admin"

def test_login_invalid_password():
    client.post("/api/auth/register", json={
        "username": "sam_doe",
        "email": "sam@example.com",
        "password": "correctpassword",
        "role": "user"
    })
    
    response = client.post("/api/auth/login", json={
        "username": "sam_doe",
        "password": "wrongpassword"
    })
    assert response.status_code == 401
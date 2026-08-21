# Apex Motors — Car Dealership Inventory System

A full-stack Car Dealership Inventory & Purchasing Management System built with **Python (FastAPI)**, **SQLAlchemy**, **React (Vite)**, and **Tailwind CSS**. Designed and developed under strict **Test-Driven Development (TDD)** principles with a verified Red-Green-Refactor commit history.

---

## Key Features

- **Authentication & RBAC:** Token-based JWT authentication with role-based access control (`user` vs `admin`).
- **Vehicle Catalog & Dynamic Search:** Multi-parameter search filtering by make, model, category (Sedan, SUV, Electric, etc.), and custom price boundaries.
- **Inventory Engine:** Atomic vehicle purchasing that auto-decrements stock, disables actions on zero inventory, and restricts restocking to administrators.
- **Admin Management Suite:** Full CRUD capabilities with dedicated modals for adding, updating, and deleting vehicles.

---

## Tech Stack

- **Backend:** Python 3.12, FastAPI, SQLAlchemy ORM, Pydantic v2, Pytest, Python-Jose (JWT), Passlib (Bcrypt)
- **Frontend:** React 19, Vite, Tailwind CSS v4, Axios, Lucide React
- **Database:** SQLite (Persistent file-based `dealership.db`)

---

## Local Setup & Installation

### 1. Prerequisites
- Python 3.10+
- Node.js 18+ & npm

### 2. Backend Setup
```bash
cd backend
python -m venv venv

# Activate virtual environment
# Windows (PowerShell):
venv\Scripts\Activate.ps1
# Mac/Linux:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
# AI Interaction Logs (PROMPTS.md)

## Log 1: Architecture Planning & TDD Strategy
- **Tool:** Gemini
- **User Prompt:** "TDD Kata: Car Dealership Inventory System... I want to use Python for backend this is for assignment submission in 2 days what and how to do"
- **AI Response Summary:** Recommended Python (FastAPI) + SQLite (persistent file) + React (Vite/Tailwind) stack. Outlined the Red-Green-Refactor phase schedule, database entity relations, and required Git commit trailer conventions.

## Log 2: Auth Endpoints Test Scaffolding
- **Tool:** Gemini
- **User Prompt:** "Walk me through creating the backend files and writing the first failing auth test for pytest."
- **AI Response Summary:** Provided `test_auth.py` test suite covering `POST /api/auth/register` and `POST /api/auth/login`, followed by SQLAlchemy User model, bcrypt security utilities, and FastAPI routers.

## Log 3: Vehicle CRUD & Search Implementation
- **Tool:** Gemini
- **User Prompt:** "Let's proceed to TDD Cycle 2: write the failing tests and code for Vehicle management and search filtering."
- **AI Response Summary:** Generated unit tests for vehicle creation, dynamic query parameter filtering (`make`, `model`, `category`, `price`), and admin-restricted deletion in `test_vehicles.py`, followed by the corresponding SQLAlchemy model and routes.

## Log 4: Inventory Engine & Boundary Testing
- **Tool:** Gemini
- **User Prompt:** "Let's proceed to TDD Cycle 3: write tests and implementation for vehicle purchasing and restocking."
- **AI Response Summary:** Drafted tests and route logic for decrementing stock on purchase, handling out-of-stock 400 errors, and validating positive-integer admin restocking.

## Log 5: React Frontend & Tailwind Integration
- **Tool:** Gemini
- **User Prompt:** "Let's build the React UI components: Navbar, VehicleCard with Purchase logic, Search filters, and Admin Modals."
- **AI Response Summary:** Provided complete React component code utilizing Tailwind CSS, AuthContext with JWT storage, and Axios interceptors.
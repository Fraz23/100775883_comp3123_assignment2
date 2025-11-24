# COMP3123 Assignment 2 — Employee Management

Student: 100775883

Project overview
----------------
This repository contains a full-stack employee management application for COMP3123 Assignment 2.

- `backend/` — Node.js + Express API with MongoDB (Mongoose). Features: signup/login, JWT authentication, employee CRUD, image upload (multer), search, and Dockerfile.
- `frontend/` — React app (Create React App) with Login/Signup, Employee list, Add/Edit/Details screens, Axios service, and routing.

Quick status
------------
- Backend: implemented and tested locally with Docker Compose. JWT auth, file upload, search, and image cleanup implemented.
- Frontend: implemented pages and routing; uses Axios for API calls and stores JWT in `localStorage`.

Prerequisites
-------------
- Node.js (v18+ recommended) — for local runs
- Docker & Docker Compose (for running with containers)
- Git

Environment (.env)
-------------------
Create a `.env` file in `backend/` with these variables (example):

```env
MONGODB_URI=mongodb+srv://<user>:<pw>@cluster0.example.mongodb.net/comp3123_assigment1
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

Do NOT commit `.env` to the repo. It is listed in `.gitignore`.

Running the application
-----------------------
Run locally without Docker

1. Backend

```powershell
cd backend
npm install
# ensure .env present
npm run dev   # uses nodemon
```

2. Frontend

```powershell
cd frontend
npm install
npm start
```

Run with Docker Compose (recommended)

```powershell
cd <project-root>
docker compose build --no-cache
docker compose up -d

# view logs
docker compose logs -f backend
docker compose logs -f frontend
```

Service URLs
------------
- Backend API base: http://localhost:3000/api/v1
- Frontend: http://localhost:3001 (when running via docker-compose)

API endpoints (summary)
-----------------------
- POST `/api/v1/user/signup`
  - Body JSON: { username, email, password }
- POST `/api/v1/user/login`
  - Body JSON: { email, password }
  - Response: { token }
- GET `/api/v1/emp/employees`
  - Query params: `department`, `position`, `q` (search)
- POST `/api/v1/emp/employees` (protected)
  - Multipart form-data: first_name, last_name, email, position, salary, date_of_joining, department, `image` (file)
- GET `/api/v1/emp/employees/:id`
- PUT `/api/v1/emp/employees/:id` (protected)
  - Multipart form-data as for POST; `image` optional
- DELETE `/api/v1/emp/employees?eid=<id>` (protected)

Sample curl commands
--------------------
Signup:

```powershell
curl -X POST http://localhost:3000/api/v1/user/signup -H "Content-Type: application/json" -d '{"username":"student1","email":"student1@example.com","password":"Password1"}'
```

Login (save token):

```powershell
curl -X POST http://localhost:3000/api/v1/user/login -H "Content-Type: application/json" -d '{"email":"student1@example.com","password":"Password1"}'
```

Create employee with image:

```powershell
curl -X POST http://localhost:3000/api/v1/emp/employees \
  -H "Authorization: Bearer <TOKEN>" \
  -F "first_name=John" -F "last_name=Smith" -F "email=j.smith@example.com" \
  -F "position=Developer" -F "salary=70000" -F "date_of_joining=2023-01-01" \
  -F "department=IT" -F "image=@/full/path/to/photo.jpg"
```

Notes on images
---------------
- Uploaded images are stored in `backend/uploads` and served at `/uploads/<filename>`.
- The backend removes previous images when updating and deletes images when removing an employee.

Testing and validation
----------------------
- The backend validates required fields and returns clear error messages for validation and duplicate key errors.
- Protected endpoints require `Authorization: Bearer <token>` from the login response.

Screenshots and submission
--------------------------
For submission, provide a single PDF named `100775883_assignment2_screenshots.pdf` containing the required screenshots (see `SCREENSHOTS_TEMPLATE.md` for exact filenames and captions). Save the PDF in the repo root.

Packaging for submission (D2L)
-----------------------------
Before creating the ZIP for submission, remove `node_modules` folders:

```powershell
# from project root
Remove-Item -Recurse -Force .\backend\node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\frontend\node_modules -ErrorAction SilentlyContinue
```

Create the ZIP (example):

```powershell
Compress-Archive -Path .\* -DestinationPath ..\100775883_comp3123_assignment2.zip
```

Submission checklist
--------------------
- GitHub repository link (single repo)
- `README.md` with run instructions
- `100775883_assignment2_screenshots.pdf` in repo root
- ZIP package (no `node_modules`) uploaded to D2L

Postman collection
-----------------
If you want to include the Postman collection and environment files, export them and add them to the repo before finalizing the ZIP.

Contact
-------
If any run instructions need updating or if you want the Postman collection generated and added to the repo, I can update the files on request.

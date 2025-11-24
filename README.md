# COMP3123 Assignment 2 — Full Stack App

Student: 100775883

Project: employee management (frontend + backend)

Overview
--------
This repository contains a full-stack application for COMP3123 Assignment 2. The project includes:

- `backend/` — Node.js + Express API with MongoDB (Mongoose). Features: signup/login, JWT auth, employee CRUD, image upload (multer), search, and Dockerfile.
- `frontend/` — React app (Create React App) with Login/Signup, Employee list, Add/Edit/Details screens, Axios service, routing, and Dockerfile.

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
Create a `.env` file in `backend/` with the following variables (example):

```
MONGODB_URI=mongodb+srv://<user>:<pw>@cluster0.example.mongodb.net/comp3123_assigment1
PORT=3000
JWT_SECRET=your_jwt_secret_here
```

Do NOT commit `.env` to the repo. It is included in `.gitignore`.

Run Locally (without Docker)
---------------------------
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
-----------------------------------
From the project root:

```powershell
docker compose build --no-cache
docker compose up -d

# view logs
docker compose logs -f backend
docker compose logs -f frontend
```

Services and URLs
-----------------
- Backend API: http://localhost:3000
- Frontend: http://localhost:3001

API Endpoints (summary)
------------------------
- POST /api/v1/user/signup
  - Body JSON: { username, email, password }
- POST /api/v1/user/login
  - Body JSON: { email | username, password }
  - Response: { token }
- GET /api/v1/emp/employees
  - Query params: `department`, `position`, `q` (search)
- POST /api/v1/emp/employees (protected)
  - Multipart form-data: fields first_name,last_name,email,position,salary,date_of_joining,department and file field `image`
- GET /api/v1/emp/employees/:id
- PUT /api/v1/emp/employees/:id (protected)
  - Multipart form-data: same fields as POST; `image` optional
- DELETE /api/v1/emp/employees?eid=<id> (protected)

Sample curl commands
--------------------
Signup:
```
curl -X POST http://localhost:3000/api/v1/user/signup -H "Content-Type: application/json" -d '{"username":"student1","email":"student1@example.com","password":"Password1"}'
```

Login (save token):
```
curl -X POST http://localhost:3000/api/v1/user/login -H "Content-Type: application/json" -d '{"email":"student1@example.com","password":"Password1"}'
```

Create employee with image:
```
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

Testing and Validation
----------------------
- The backend validates required fields and returns helpful error messages for validation and duplicate key errors.
- Protected endpoints require `Authorization: Bearer <token>` header from login response.

Screenshots required for submission (single PDF)
------------------------------------------------
You must provide one single file (PDF) containing the following screenshots (with short captions):

- MongoDB data (1 screenshot)
- REST API tests with Postman or curl (5–8 screenshots): signup, login (token), create employee, get employees, update, delete, search
- Frontend CRUD operations (5–8 screenshots): Login screen, Employee List, Add Employee (form), View Details (image visible), Edit Employee, Delete confirmation
- Search screen (2–3 screenshots)

Packaging for D2L
-----------------
Before zipping your submission:

1. Remove `node_modules` folders from both backend and frontend
```
# from project root (PowerShell)
Remove-Item -Recurse -Force .\backend\node_modules -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force .\frontend\node_modules -ErrorAction SilentlyContinue
```
2. Create a ZIP containing the project files and the screenshots PDF and README

```powershell
Compress-Archive -Path .\* -DestinationPath ..\100775883_comp3123_assignment2.zip
```

Submission checklist
--------------------
- [ ] GitHub repository link(s) (frontend and backend or single repo)
- [ ] README.md included in repo with setup/run instructions
- [ ] Single screenshots PDF (named `100775883_assignment2_screenshots.pdf`)
- [ ] ZIP package (no node_modules) uploaded to D2L
- [ ] (Optional) Live deployment links included in README

What I can do next for you
-------------------------
- Draft and commit this README to the repo (done).
- Provide a screenshots template file to paste images into (created next).
- Help you push the repo to GitHub and create the ZIP for D2L.

Contact
-------
If you want me to push changes, prepare the ZIP, or deploy the app, tell me and I will continue.

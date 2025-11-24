# COMP 3123 Assignment – I Backend (10%)

## COMP 3123 — Assignment 1 (Backend, 10%)

**Due:** **Sunday, Oct 12, 2025 at 11:59 PM (Week 06)**\
**Late policy:** No late submissions.

***

## 1) Goal

Build a small **RESTful API** using **Node.js**, **Express**, and **MongoDB** that supports **user management** and **employee management**. You’ll practice CRUD, validation, proper HTTP status codes, and (optionally) JWT auth. Manage your work in Git and push to GitHub throughout.

***

## 2) What to Build

#### Tech / Constraints

* **Server:** Node.js + Express
* **DB:** MongoDB (Database name: **`comp3123_assigment1`**)
* **Data format:** All requests/responses must be **JSON**
* **Version control:** Commit regularly to a public GitHub repo named\
  \&#xNAN;**`Student#_COMP3123_Assignment1`** (replace `Student#` with your student number)
* **Organization:** Use Express **Router** and a modular structure (routes/controllers/models/middleware)

### Sample Collections (Schemas)

**Users**

```json
{
  "_id": "ObjectId",
  "username": "String",
  "email": "String",
  "password": "String",      // must be hashed
  "created_at": "Date",
  "updated_at": "Date"
}
```

> Login should accept **username OR email** plus password.

**Employees**

```json
{
  "_id": "ObjectId",
  "first_name": "String",
  "last_name": "String",
  "email": "String",
  "position": "String",
  "salary": "Number",
  "date_of_joining": "Date",
  "department": "String",
  "created_at": "Date",
  "updated_at": "Date"
}
```

***

## 3) Required API Endpoints

Base path suggestions:

* User routes: `/api/v1/user`
* Employee routes: `/api/v1/emp`

| # | Method | Endpoint                        | Status  | Purpose                                |
| - | ------ | ------------------------------- | ------- | -------------------------------------- |
| 1 | POST   | `/api/v1/user/signup`           | **201** | Create a new user                      |
| 2 | POST   | `/api/v1/user/login`            | **200** | Login with username/email + password   |
| 3 | GET    | `/api/v1/emp/employees`         | **200** | List all employees                     |
| 4 | POST   | `/api/v1/emp/employees`         | **201** | Create a new employee                  |
| 5 | GET    | `/api/v1/emp/employees/{eid}`   | **200** | Get one employee by ID                 |
| 6 | PUT    | `/api/v1/emp/employees/{eid}`   | **200** | Update an employee by ID               |
| 7 | DELETE | `/api/v1/emp/employees?eid=xxx` | **204** | Delete an employee by ID (query param) |

> **Note:** Return the **exact** status codes listed above.

***

## 4) Sample Payloads & Responses

#### Signup

**Request**

```json
{
  "username": "johndoe",
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response (201)**

```json
{
  "message": "User created successfully.",
  "user_id": "64c9e5a3d9f3c1a5c9b4e8a1"
}
```

#### Login (email or username)

**Request**

```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

**Response (200)**

```json
{
  "message": "Login successful.",
  "jwt_token": "Optional implementation"
}
```

#### List Employees

**Response (200)**

```json
[
  {
    "employee_id": "64c9e5a3d9f3c1a5c9b4e8a2",
    "first_name": "Jane",
    "last_name": "Doe",
    "email": "jane.doe@example.com",
    "position": "Software Engineer",
    "salary": 90000,
    "date_of_joining": "2023-08-01T00:00:00.000Z",
    "department": "Engineering"
  }
]
```

#### Create Employee

**Request**

```json
{
  "first_name": "Alice",
  "last_name": "Johnson",
  "email": "alice.johnson@example.com",
  "position": "Designer",
  "salary": 85000,
  "date_of_joining": "2023-08-10T00:00:00.000Z",
  "department": "Design"
}
```

**Response (201)**

```json
{
  "message": "Employee created successfully.",
  "employee_id": "64c9e5a3d9f3c1a5c9b4e8a4"
}
```

#### Get Employee by ID

**Response (200)**

```json
{
  "employee_id": "64c9e5a3d9f3c1a5c9b4e8a4",
  "first_name": "Alice",
  "last_name": "Johnson",
  "email": "alice.johnson@example.com",
  "position": "Designer",
  "salary": 85000,
  "date_of_joining": "2023-08-10T00:00:00.000Z",
  "department": "Design"
}
```

#### Update Employee

**Request**

```json
{
  "position": "Senior Designer",
  "salary": 95000
}
```

**Response (200)**

```json
{
  "message": "Employee details updated successfully."
}
```

#### Delete Employee

**Request:** `DELETE /api/v1/emp/employees?eid=64c9e5a3d9f3c1a5c9b4e8a4`\
**Response (204):** no body

***

## 5) Validation, Errors, and Security

* Use **validation** (e.g., `express-validator`) for required fields, email format, numeric salary, valid dates, and valid Mongo IDs.
* Hash passwords before storing (e.g., `bcrypt`).
* Return helpful error messages:

  ```json
  {
    "status": false,
    "message": "Invalid Username and password"
  }
  ```
* **Optional (recommended):** Protect Employee endpoints with **JWT**. If implemented, include the token in `Authorization: Bearer <jwt>`.

***

## 6) Testing

* Use **Postman** to test **every endpoint**.
* Export your **Postman collection** and include it in your submission.
* Take **screenshots** of successful tests (and relevant error cases).

***

## 7) Deliverables (Submission Checklist)

1. **GitHub repository link**: `Student#_COMP3123_Assignment1`
2. **Project ZIP**: remove `node_modules` before zipping
3. **Postman collection**: exported JSON file
4. **Screenshots**:
   * MongoDB showing the database and collections
   * Postman tests for all endpoints + responses
5. **Sample user credentials** for marking (e.g., email/username + password)
6. **README**: how to run the project, environment variables, and any notes
7. **(If hosted)** URL of your deployed API (Render/Heroku/Vercel/Docker, etc.)
8. **Comments/notes**: anything helpful to the marker

***

## 8) Marking (see full rubric on Brightspace)

* **70 pts**
  * 5 pts × 7 endpoints (without DB)
  * 10 pts × 7 endpoints (with DB)
* **10 pts** Validation & error messages
* **10 pts** GitHub hygiene + README
* **10 pts** Screenshots & documentation

***

## 9) Communication

Questions? Email [**pritesh.patel2@georgebrown.ca**](mailto:pritesh.patel2@georgebrown.ca) or use the course Slack channel.\
**No communication within 3 days of the deadline.**

***

#### Tips

* Keep commits small and frequent with meaningful messages.
* Use consistent status codes and response shapes.
* Follow the exact endpoint paths and status codes listed above.
* Name the DB **exactly** `comp3123_assigment1`.
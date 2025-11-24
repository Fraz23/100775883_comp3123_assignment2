# COMP 3123 Assignment 1 - RESTful API

## Project Description
A RESTful API built with Node.js, Express, and MongoDB for user and employee management.

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (running locally on port 27017)
- npm

### Installation
1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Make sure MongoDB is running locally
4. Start the server:
   ```
   npm start
   ```
   Or for development with auto-restart:
   ```
   npm run dev
   ```

### Environment Variables
The `.env` file contains:
- `MONGODB_URI`: MongoDB connection string
- `PORT`: Server port (default: 3000)
- `JWT_SECRET`: Secret key for JWT (optional)

## API Endpoints

### User Routes
- `POST /api/v1/user/signup` - Create a new user
- `POST /api/v1/user/login` - Login with username/email + password

### Employee Routes
- `GET /api/v1/emp/employees` - List all employees
- `POST /api/v1/emp/employees` - Create a new employee
- `GET /api/v1/emp/employees/:id` - Get employee by ID
- `PUT /api/v1/emp/employees/:id` - Update employee by ID
- `DELETE /api/v1/emp/employees?eid=xxx` - Delete employee by ID

## Database
- Database name: `comp3123_assigment1`
- Collections: `users`, `employees`

## Testing
Use Postman to test all endpoints. Import the provided Postman collection for complete testing.

## Sample User for Testing
- Username: testuser
- Email: test@example.com
- Password: password123
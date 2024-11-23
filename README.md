# Full Stack Web App

This project is a full-stack web application that showcases front-end development using Vue.js, back-end development with Node.js and Express.js, and PostgreSQL database integration. It includes functionalities for user authentication, displaying a user dashboard, CRUD operations on user data, and more.

## Features
- **Sign Up**: Create a new account.
- **Login**: Authenticate existing users.
- **Dashboard**: Display a list of users, update user details, delete users, and invite new users.
- **CRUD Operations**: Create, Read, Update, Delete user records in the PostgreSQL database.

## Tech Stack
- **Frontend**: Vue.js, Vue Router
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL
- **Authentication**: Bcrypt for password hashing, JWT for secure API communication

## Prerequisites
Before running the application, ensure you have the following installed:
- Node.js and npm (Node Package Manager)
- PostgreSQL

## Setting Up the Project

### 1. Clone the repository

Clone this repository to your local machine using the following command:

```bash
git clone https://github.com/yuktha-c-reddy/voltana.git
cd voltana
```

### 2. Install dependencies
```bash
cd frontend
npm install

cd ../backend
npm install

```
### 3. Set up postgreSQL Database 

-Refer to sql/users.sql for details 
-Change backend/models/db.js password and username.

### 4. To run locally 
```bash
cd backend
nodemon server.js
```
The backend will be available at:
http://localhost:8080

```bash
cd ../frontend
npm run dev

```
The frontend will be available at:
http://localhost:5173


# API Endpoints

| **HTTP Method** | **Endpoint**         | **Description**                                        |
|------------------|----------------------|--------------------------------------------------------|
| `POST`          | `/api/signup`        | Creates a new user account. (Handled at `/` route as "Sign Up" toggle in the frontend). |
| `POST`          | `/api/login`         | Authenticates a user and returns a JWT token. (Handled at `/` route as "Login" toggle in the frontend). |
| `GET`           | `/api/tables`         | Retrieves a list of all users (requires JWT).          |
| `PUT`           | `/api/update/:id`     | Updates details of an existing user.                  |
| `DELETE`        | `/api/delete/:id`     | Deletes a user by their ID.                           |
| `POST`          | `/api/invite`        | Adds a new user with basic details (used for invites). |

### Additional Note:
- The **`/` route** on the frontend contains a toggle for both **Login** and **Sign Up** forms. Users can create accounts or log in securely from the same page.

## Bonus Features Implemented

1. **Deployed Application Online**  
   - The application is deployed on [Platform Name] and can be accessed via [Deployed URL].

2. **JWT-Based Authentication**  
   - Implemented secure authentication using JSON Web Tokens (JWT).  
   - Tokens are generated on successful login and are required for accessing protected routes such as the dashboard (`/api/users`) and performing CRUD operations.

3. **Search and Filter Functionality**  
   - The dashboard includes a search bar and filters to easily find users by name, email, or role.

### How JWT Authentication Works:
- **Login**: On successful login, a JWT is generated and returned to the client.
- **Token Storage**: The token is stored securely in the browser (e.g., HTTP-only cookies or localStorage).
- **Token Validation**: Protected API routes validate the JWT before allowing access to resources.

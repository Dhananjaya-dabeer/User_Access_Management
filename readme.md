# 🛂 User Access Management System

A full-stack application for managing software access requests with role-based permissions (Admin, Manager, Employee).

👤 Demo User Credentials:

Admin: username: abcd | password: 123

Employee: username: John | password: 123

## ✨ Features

- **🔐 Secure Authentication**

  - JWT with HttpOnly cookies
  - Role-based protected routes
  - Password hashing with bcrypt

- **👥 Role-Based Access Control**

  - **Admin**: Create software, view all requests
  - **Manager**: Approve/reject employee requests
  - **Employee**: Request software access

- **📊 Request Workflow**
  - Employees submit access requests
  - Managers review pending requests
  - Real-time status updates

## 🚀 Tech Stack

### Frontend

| Technology   | Purpose      |
| ------------ | ------------ |
| React 18     | UI Framework |
| Vite         | Build Tool   |
| Tailwind CSS | Styling      |
| Axios        | HTTP Client  |

### Backend

| Technology | Purpose        |
| ---------- | -------------- |
| Node.js    | Runtime        |
| Express    | Web Framework  |
| TypeORM    | Database ORM   |
| PostgreSQL | Database       |
| JWT        | Authentication |

## 📂 Project Structure

user-access-management/
├── api/ # Backend
│ ├── src/
│ │ ├── controllers/ # Business logic
│ │ ├── entities/ # Database models
│ │ ├── middleware/ # Auth & role checks
│ │ └── routes/ # API endpoints
│
└── client/ # Frontend
├── src/
│ ├── components/ # Reusable UI
│ ├── context/ # Auth provider
│ ├── pages/ # Route components
│ └── utils/ # Helper functions

## 🛠️ Installation

### Prerequisites

- Node.js v16+
- PostgreSQL
- Git

### Setup Backend

```bash
cd api
npm install
npm run dev
```

### Setup Frontend

cd client
npm install
npm run dev

🌐 API Endpoints
Method Endpoint Description Access
POST /auth/signup User registration Public
POST /auth/login User login Public
GET /software List all software Role-based
POST /requests Submit access request Employee
GET /requests/pending View pending requests Manager/Admin

🖥️ UI Components
Auth Pages
Login/Signup forms with validation

Protected route redirection
Dashboard

Role-specific navigation
Request status visualization

Admin Panel
Software creation form
Access level management

🔒 Security Features
HttpOnly cookies for JWT storage
CSRF protection via same-site cookies
Password hashing with salt rounds
Role-based route middleware

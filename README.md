# Node Auth Sequelize API 🔐

Enterprise-grade Authentication & Hierarchical Team Management API built using Node.js, Express, Sequelize & MySQL.

## 🚀 Features
- JWT Authentication & Authorization
- Role-based Access Control (RBAC)
- Hierarchical Team Structure
- Company & Department Management
- User Management with Designations
- Manager-Team Lead-Developer Hierarchy
- Sequelize Migrations
- Email Notifications
- Modular Architecture

## 🛠 Tech Stack
- Node.js
- Express.js
- Sequelize ORM
- MySQL
- JWT (jsonwebtoken)
- Bcrypt.js
- Nodemailer

## 👥 Role Hierarchy

```
Super Admin
   └── Can create: Companies, Users, Departments, Designations, Teams

Admin
   └── Can manage: Users, view teams

Manager
   └── Can create: Team Leads

Team Lead
   └── Can create: Developers

Developer
   └── No subordinates

Employee
   └── Basic access
```

## 🏢 Organizational Structure

```
Company
   ├── Departments
   ├── Designations
   └── Teams
         ├── Manager
         │     └── Team Leads
         │           └── Developers
         └── Members
```

## 📦 Installation

```bash
npm install

```

## ⚙️ Configuration

Create `.env` file:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=your_database
DB_USER=your_username
DB_PASSWORD=your_password
DB_DIALECT=mysql

JWT_SECRET=your_jwt_secret_key

MAIL_USERNAME=your_email@gmail.com
MAIL_PASSWORD=your_app_password
```

## 🗄️ Database Setup

Run migrations:

```bash
npx sequelize-cli db:migrate
```

## 🚀 Start Server

```bash
npm start
```

Server runs on `http://localhost:5000`

## 📡 API Endpoints

### Authentication

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/auth/register` | Public | Register new user |
| POST | `/api/auth/login` | Public | Login user |
| POST | `/api/auth/logout` | Authenticated | Logout user |
| POST | `/api/auth/change-password` | Authenticated | Change password |

### Company Management (Super Admin Only)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/companies` | Super Admin | Create company |
| GET | `/api/companies` | Super Admin | Get all companies |
| GET | `/api/companies/:id` | Super Admin | Get company by ID |
| PUT | `/api/companies/:id` | Super Admin | Update company |
| DELETE | `/api/companies/:id` | Super Admin | Delete company |

### User Management (Super Admin Only)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/admin/users` | Super Admin | Create user |
| GET | `/api/admin/users` | Super Admin | Get all users |
| GET | `/api/admin/users/:id` | Super Admin | Get user by ID |
| PUT | `/api/admin/users/:id` | Super Admin | Update user |
| DELETE | `/api/admin/users/:id` | Super Admin | Delete user |

### Department Management (Super Admin Only)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/admin/departments` | Super Admin | Create department |
| GET | `/api/admin/departments` | Super Admin | Get all departments |
| PUT | `/api/admin/departments/:id` | Super Admin | Update department |
| DELETE | `/api/admin/departments/:id` | Super Admin | Delete department |

### Designation Management (Super Admin Only)

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/admin/designations` | Super Admin | Create designation |
| GET | `/api/admin/designations` | Super Admin | Get all designations |
| PUT | `/api/admin/designations/:id` | Super Admin | Update designation |
| DELETE | `/api/admin/designations/:id` | Super Admin | Delete designation |

### Team Management

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/teams` | Super Admin | Create team |
| GET | `/api/teams` | Super Admin, Admin | Get all teams |
| GET | `/api/teams/:id/hierarchy` | Authenticated | Get team hierarchy |
| POST | `/api/teams/subordinates` | Manager, Team Lead | Create subordinate |
| GET | `/api/teams/my-subordinates` | Manager, Team Lead | Get my subordinates |

## 📝 Usage Examples

### 1. Register User

```json
POST /api/auth/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "roles": ["employee"]
}
```

### 2. Login

```json
POST /api/auth/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

Response:
```json
{
  "msg": "Login success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "roles": ["employee"]
}
```

### 3. Create Company (Super Admin)

```json
POST /api/companies
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "Acme Corp",
  "userId": 1
}
```

### 4. Create User with Department & Designation (Super Admin)

```json
POST /api/admin/users
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "mobile": "1234567890",
  "password": "password123",
  "departmentId": 1,
  "designationId": 2,
  "roles": ["manager"]
}
```

### 5. Manager Creates Team Lead

```json
POST /api/teams/subordinates
Headers: { "Authorization": "Bearer <manager_token>" }
{
  "name": "Team Lead Name",
  "email": "lead@example.com",
  "mobile": "9876543210",
  "password": "password123",
  "role": "team-lead",
  "teamId": 1
}
```

### 6. Team Lead Creates Developer

```json
POST /api/teams/subordinates
Headers: { "Authorization": "Bearer <teamlead_token>" }
{
  "name": "Developer Name",
  "email": "dev@example.com",
  "mobile": "5555555555",
  "password": "password123",
  "role": "developer",
  "teamId": 1
}
```

## 🔐 Authorization Headers

All protected routes require JWT token:

```
Authorization: Bearer <your_jwt_token>
```

## 📂 Project Structure

```
node-auth-sequelize/
├── config/
│   ├── config.js
│   └── db.js
├── controllers/
│   ├── auth.controller.js
│   ├── company.controller.js
│   ├── user.controller.js
│   ├── department.controller.js
│   ├── designation.controller.js
│   └── team.controller.js
├── middlewares/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── migrations/
├── models/
│   ├── index.js
│   ├── user.js
│   ├── role.js
│   ├── company.js
│   ├── department.js
│   ├── designation.js
│   └── team.js
├── routes/
│   ├── user.js
│   ├── company.js
│   ├── admin.js
│   └── team.js
├── services/
│   └── mailService.js
├── .env
├── server.js
└── package.json
```

## 🎯 Key Features Explained

### Hierarchical Team Structure
- Managers can only create Team Leads
- Team Leads can only create Developers
- Developers cannot create subordinates
- Each user has a `managerId` linking to their superior

### Role-Based Access Control
- Super Admin: Full system access
- Admin: User and team management
- Manager: Create and manage Team Leads
- Team Lead: Create and manage Developers
- Developer/Employee: Basic access

### Self-Referencing User Model
Users can have managers and subordinates through the `managerId` field, creating a hierarchical structure.

## 📧 Email Notifications

Login notifications are automatically sent via Nodemailer when users log in.

## 🔒 Security Features

- Password hashing with bcrypt
- JWT token authentication
- Role-based authorization
- Protected routes with middleware
- SQL injection prevention via Sequelize ORM

## 📄 License

MIT

## 👨‍💻 Author

Your Name

---

**Note:** Make sure to run migrations before starting the server to create all necessary database tables and seed initial roles.

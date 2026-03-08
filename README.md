# Collabify 🎯
> Team goals, made simple.

A full stack collaborative goal tracking app where teams can create workspaces, set shared goals, assign tasks, and leave comments — all behind secure user authentication.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Authentication | Bcrypt + JWT |
| Frontend | HTML, CSS, Vanilla JS |
| API Testing | Postman |
| Visual DB Tool | MongoDB Compass |

---

## ✨ Features

- 🔐 User registration & login with hashed passwords (Bcrypt)
- 🔑 JWT-protected API routes
- 🏢 Create and manage team workspaces
- 🎯 Set and track goals inside workspaces
- ✅ Create and assign tasks under goals
- 💬 Comment on goals and tasks
- 🖥️ Clean responsive frontend dashboard

---

## 📁 Project Structure

```
collabify/
├── server/
│   ├── models/
│   │   ├── User.js
│   │   ├── Workspace.js
│   │   ├── Goal.js
│   │   ├── Task.js
│   │   └── Comment.js
│   ├── routes/
│   │   ├── auth.js
│   │   ├── workspaces.js
│   │   ├── goals.js
│   │   ├── tasks.js
│   │   └── comments.js
│   ├── middleware/
│   │   └── auth.js
│   └── index.js
├── client/
│   ├── index.html
│   ├── style.css
│   └── app.js
├── .gitignore
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js
- MongoDB (running locally)

### Installation

1. Clone the repo
```bash
git clone https://github.com/MufasaTryingCOMS/collabify.git
cd collabify
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/collabify
JWT_SECRET=your_super_secret_key
```

4. Start the server
```bash
npm run dev
```

5. Open your browser and go to:
```
http://localhost:5000
```

---

## 🔁 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | /api/auth/register | Register a new user |
| POST | /api/auth/login | Login and get JWT token |

### Workspaces
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/workspaces | Get all workspaces |
| POST | /api/workspaces | Create a workspace |
| PUT | /api/workspaces/:id | Update a workspace |
| DELETE | /api/workspaces/:id | Delete a workspace |

### Goals
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/goals/:workspaceId | Get all goals in a workspace |
| POST | /api/goals | Create a goal |
| PUT | /api/goals/:id | Update a goal |
| DELETE | /api/goals/:id | Delete a goal |

### Tasks
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/tasks/:goalId | Get all tasks for a goal |
| POST | /api/tasks | Create a task |
| PUT | /api/tasks/:id | Update a task |
| DELETE | /api/tasks/:id | Delete a task |

### Comments
| Method | Endpoint | Description |
|---|---|---|
| GET | /api/comments/goal/:goalId | Get comments for a goal |
| GET | /api/comments/task/:taskId | Get comments for a task |
| POST | /api/comments | Create a comment |
| DELETE | /api/comments/:id | Delete a comment |

---

## 🛠️ Built With Purpose

This project was built as a portfolio piece to demonstrate full stack JavaScript development skills including REST API design, database modeling, authentication, and frontend integration.

---


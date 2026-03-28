# 🚀 Live Demo

🔗 Live Website: https://my-nextjs-auth-crud-app.vercel.app/

---

# 📌 Project Overview

**Next.js Auth CRUD App** is a full-stack web application that provides secure user authentication and basic CRUD functionality using modern web technologies.

The application demonstrates **JWT authentication, role-based access control, and protected routes**, making it a scalable and production-ready system.

---

# 🛠️ Tech Stack

## 🎨 Frontend

* Next.js (App Router)
* React.js
* TypeScript
* Tailwind CSS

## ⚙️ Backend

* Next.js API Routes (Serverless Functions)
* MongoDB
* Mongoose
* JWT (jsonwebtoken + jose)
* Zod (Validation)
* bcryptjs (Password hashing)

## ☁️ Deployment

* Vercel

---

# ✨ Features

## 🔐 Authentication

* User Registration
* User Login
* JWT-based authentication
* HTTP-only cookie session handling

## 🔑 Authorization

* Role-based access control (User/Admin)
* Protected dashboard routes
* Admin route restriction

## 📊 CRUD Functionality

* Create user data
* Read user details
* Update user profile
* Delete (extendable)

## 🛡️ Security

* Password hashing using bcrypt
* JWT token authentication
* Secure cookies in production
* Input validation using Zod

## 🎯 User Experience

* Clean and responsive UI
* Protected dashboard
* Redirect handling for authenticated users

---

# 📁 Project Structure

src/
├── app/ → UI + API Routes
├── app/api/ → Backend APIs
├── components/ → Reusable UI Components
├── lib/ → Auth, DB connection, validation
├── models/ → MongoDB Schemas

---

# 🔗 API Endpoints

## 🔐 Auth APIs

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/logout

## 👤 User APIs

* GET /api/users/:id
* PUT /api/users/:id

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

git clone https://github.com/Shivamcode10/my-nextjs-auth-crud-app.git
cd my-nextjs-auth-crud-app

## 2️⃣ Install Dependencies

npm install

## 3️⃣ Setup Environment Variables

Create `.env.local` file:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

## 4️⃣ Run Project

npm run dev

👉 Open: http://localhost:3000

---

# 🧪 API Testing

* APIs tested using Postman
* Collection included in repository

---

# 📈 Scalability

* Modular architecture (can be converted to microservices)
* Serverless API design using Next.js
* Can integrate Redis caching
* Supports load balancing
* Optimized database queries

---

# 💡 Key Highlights

This project follows REST principles and is designed with scalability and modular architecture in mind.

---

# 👨‍💻 Author

Shivam Lahane

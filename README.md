# 🚀 Next.js Auth CRUD App

🔗 Live Demo: https://my-nextjs-auth-crud-app.vercel.app/

---

# 📌 Project Overview

This project is a **scalable full-stack web application** built with Next.js that implements secure authentication and CRUD operations.

It demonstrates real-world backend concepts such as **JWT authentication, role-based access control, protected APIs, and modular architecture**, making it production-ready.

---

# 🛠️ Tech Stack

## Frontend

* Next.js (App Router)
* React.js
* TypeScript
* Tailwind CSS

## Backend

* Next.js API Routes (Serverless)
* MongoDB + Mongoose
* JWT (jsonwebtoken + jose)
* Zod (Validation)
* bcryptjs (Password Hashing)

## Deployment

* Vercel

---

# ✨ Features

## 🔐 Authentication

* User Registration & Login
* JWT-based authentication
* Secure cookie handling

## 🔑 Authorization

* Role-based access (User/Admin)
* Protected routes via middleware

## 📊 CRUD APIs

* Create, Read, Update, Delete user data
* RESTful API design with proper status codes

## 🛡️ Security

* Password hashing (bcrypt)
* Input validation (Zod)
* Token verification & middleware protection

---

# 📁 Project Structure

src/
├── app/ → UI & API routes
├── components/ → Reusable UI
├── lib/ → Auth, DB, validation
├── models/ → MongoDB schemas

---

# 🔗 API Endpoints

## Auth

* POST /api/auth/register
* POST /api/auth/login
* POST /api/auth/logout

## Users

* GET /api/users/:id
* PUT /api/users/:id

---

# ⚙️ Setup

git clone https://github.com/Shivamcode10/my-nextjs-auth-crud-app.git
cd my-nextjs-auth-crud-app
npm install

Create `.env.local`:

MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_secret

Run:

npm run dev

---

# 🧪 API Testing

* Postman collection included
* Covers all endpoints with JWT authentication

---

# 📈 Scalability

* Modular architecture
* Serverless API design
* Easily extendable to microservices
* Supports caching (Redis) and load balancing

---

# 💡 Highlights

* Clean architecture
* Production-ready authentication system
* Strong focus on security and scalability

---

# 👨‍💻 Author

Shivam Lahane

# ✅ Project Overview

- LeetLab is a fullstack coding platform similar to LeetCode, built with modern technologies. It supports user authentication, problem-solving, and more to come.

## 📁 Project Structure

leetlab/
├── leetlab-backend/ # Node.js/Express Backend
├── leetlab-frontend/ # React Frontend
└── README.md

## 🔐 Backend - Authentication Module

The backend for LeetLab handles user registration, login, and protected routes using JWT-based authentication.

### 📦 Features Implemented

- User Registration (with email and password)
- Password hashing using `bcrypt`
- Login with JWT Token generation
- Protected routes with JWT verification
- Error handling for invalid credentials or duplicate users

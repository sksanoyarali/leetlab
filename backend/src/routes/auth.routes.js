import express, { Router } from 'express'
import {
  check,
  login,
  logout,
  register,
} from '../controller/auth.controller.js'
const authRoutes = Router()

authRoutes.post('/register', register)
authRoutes.post('/login', login)
authRoutes.get('/logout', logout)
authRoutes.get('/check', check)
export default authRoutes

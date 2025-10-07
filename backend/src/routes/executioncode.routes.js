import express, { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import { executeCode } from '../controller/executeCode.controller.js'
const executeRoutes = Router()

executeRoutes.post('/', authMiddleware, executeCode)

export default executeRoutes

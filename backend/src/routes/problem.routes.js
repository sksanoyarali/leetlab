import express from 'express'
import { authMiddleware, checkAdmin } from '../middlewares/auth.middleware.js'
import {
  createProblem,
  deleteProblem,
  getAllproblemsSolvedByUser,
  getProblemById,
  updateProblem,
} from '../controller/problem.controller.js'
const problemRoutes = express.Router()
problemRoutes.post('/create-problem', authMiddleware, checkAdmin, createProblem)
problemRoutes.get(
  '/get-all-problems',
  authMiddleware,
  getAllproblemsSolvedByUser
)
problemRoutes.get('/get-problem/:id', authMiddleware, getProblemById)
problemRoutes.put(
  '/update-problem/:id',
  authMiddleware,
  checkAdmin,
  updateProblem
)
problemRoutes.delete(
  '/delete-problem/:id',
  authMiddleware,
  checkAdmin,
  deleteProblem
)
problemRoutes.get(
  'get-solved-problems',
  authMiddleware,
  getAllproblemsSolvedByUser
)
export default problemRoutes

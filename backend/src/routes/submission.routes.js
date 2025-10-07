import express from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'
import {
  getAllSubmission,
  getAllTheSubmissionForProblem,
  getSubmissionForProblem,
} from '../controller/submission.controller.js'

const submissionRoutes = express.Router()

submissionRoutes.get('/get-all-submmissions', authMiddleware, getAllSubmission)
submissionRoutes.get(
  '/get-submission/:ProblemId',
  authMiddleware,
  getSubmissionForProblem
)

submissionRoutes.get(
  '/get-submission-count/:ProblemId',
  authMiddleware,
  getAllTheSubmissionForProblem
)
export default submissionRoutes

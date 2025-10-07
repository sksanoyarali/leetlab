import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
import problemRoutes from './routes/problem.routes.js'
import executeRoutes from './routes/executioncode.routes.js'
import submissionRoutes from './routes/submission.routes.js'
dotenv.config()
const app = express()
const port = process.env.PORT
app.get('/', (req, res) => {
  res.send('main route')
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/problems', problemRoutes)
app.use('/api/v1/execute-code', executeRoutes)
app.use('/api/v1/submission', submissionRoutes)
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

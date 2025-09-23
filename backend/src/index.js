import express from 'express'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes.js'
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
app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})

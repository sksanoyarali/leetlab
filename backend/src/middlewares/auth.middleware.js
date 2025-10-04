import jwt from 'jsonwebtoken'
import { db } from '../libs/db.js'
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.jwt
    if (!token) {
      return res.status(401).json({
        message: 'Unauthorized access',
      })
    }
    let decoded
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
      return res.status(401).json({
        message: 'Unauthorized access',
      })
    }
    const user = await db.user.findUnique({
      where: {
        id: decoded.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    })
    if (!user) {
      return res.status(404).json({
        message: 'User not found',
      })
    }
    req.user = user
    next()
  } catch (error) {
    console.error('Error in user authentication')
    return res.status(404).json({
      error: 'Error is isloggedin',
    })
  }
}
const checkAdmin = async (req, res, next) => {
  try {
    const userId = req.user.id
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        role: true,
      },
    })
    if (!user || user.role !== 'ADMIN') {
      return res.status(403).json({
        message: 'Forbidden-you dont have permission to access this resource ',
      })
    }
    next()
  } catch (error) {
    console.error('Error checking admin role')
    return res.status(500).json({
      error: 'Error checking user role',
    })
  }
}
export { authMiddleware, checkAdmin }

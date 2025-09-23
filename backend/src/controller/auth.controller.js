import bcrypt from 'bcryptjs'
import { db } from '../libs/db.js'
import { UserRole } from '../generated/prisma/index.js'
import jwt from 'jsonwebtoken'
export const register = async (req, res) => {
  const { email, password, name } = req.body
  try {
    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })
    if (existingUser) {
      return res.status(400).json({
        error: 'User already exist',
      })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await db.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        role: UserRole.USER,
      },
    })
    const token = jwt.sign({ id: newUser.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })
    return res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        role: newUser.role,
      },
    })
  } catch (error) {
    console.error('Error creating User', error)
    return res.status(500).json({
      error: 'Error creating user',
    })
  }
}
export const login = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await db.user.findUnique({
      where: {
        email,
      },
    })
    if (!user) {
      return res.status(401).json({
        error: 'user not found',
      })
    }
    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) {
      return res.status(401).json({
        error: 'Invalid credential',
      })
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    })

    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: process.env.NODE_ENV !== 'development',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    })

    return res.status(201).json({
      message: 'User login successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    })
  } catch (error) {
    console.error('Error login User', error)
    return res.status(500).json({
      error: 'Error login user',
    })
  }
}
export const logout = async (req, res) => {}
export const check = async (req, res) => {}

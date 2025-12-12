import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import { prisma } from './db'

const JWT_SECRET = process.env.JWT_SECRET || 'default-secret-change-in-production'

export interface JWTPayload {
  userId: number
  username: string
  role: string
}

export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return await bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return await bcrypt.compare(password, hashedPassword)
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch {
    return null
  }
}

export async function createSession(userId: number, token: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  return await prisma.session.create({
    data: {
      userId,
      token,
      expiresAt
    }
  })
}

export async function getUserFromToken(token: string) {
  const payload = verifyToken(token)
  if (!payload) return null

  const session = await prisma.session.findUnique({
    where: { token },
    include: { user: true }
  })

  if (!session || session.expiresAt < new Date()) {
    return null
  }

  return session.user
}

export async function deleteSession(token: string) {
  await prisma.session.delete({
    where: { token }
  })
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'
import { verifyPassword, generateToken, createSession, getUserFromToken } from '../../../lib/auth'
import { z } from 'zod'

const loginSchema = z.object({
  username: z.string().min(1, '用户名不能为空'),
  password: z.string().min(1, '密码不能为空')
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, password } = loginSchema.parse(body)

    // 查找用户
    const user = await prisma.user.findUnique({
      where: { username }
    })

    if (!user) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      )
    }

    // 验证密码
    const isValidPassword = await verifyPassword(password, user.password)
    if (!isValidPassword) {
      return NextResponse.json(
        { error: '用户名或密码错误' },
        { status: 401 }
      )
    }

    // 生成token和创建session
    const token = generateToken({
      userId: user.id,
      username: user.username,
      role: user.role
    })

    await createSession(user.id, token)

    // 返回用户信息（不包含密码）
    const { password: _, ...userWithoutPassword } = user
    
    return NextResponse.json({
      message: '登录成功',
      user: userWithoutPassword,
      token
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
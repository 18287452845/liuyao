import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'
import { hashPassword, generateToken, createSession } from '../../../lib/auth'
import { z } from 'zod'

const registerSchema = z.object({
  username: z.string().min(3, '用户名至少需要3个字符'),
  email: z.string().email('请输入有效的邮箱地址'),
  password: z.string().min(6, '密码至少需要6个字符'),
  invitationCode: z.string().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { username, email, password, invitationCode } = registerSchema.parse(body)

    // 检查用户名是否已存在
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { username },
          { email }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: '用户名或邮箱已存在' },
        { status: 400 }
      )
    }

    // 检查邀请码（如果需要）
    if (invitationCode) {
      const code = await prisma.invitationCode.findUnique({
        where: { code: invitationCode }
      })

      if (!code) {
        return NextResponse.json(
          { error: '邀请码不存在' },
          { status: 400 }
        )
      }

      if (code.used) {
        return NextResponse.json(
          { error: '邀请码已被使用' },
          { status: 400 }
        )
      }

      if (code.expiresAt < new Date()) {
        return NextResponse.json(
          { error: '邀请码已过期' },
          { status: 400 }
        )
      }
    }

    // 哈希密码
    const hashedPassword = await hashPassword(password)

    // 创建用户
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        role: 'USER'
      }
    })

    // 如果使用邀请码，标记为已使用
    if (invitationCode) {
      await prisma.invitationCode.update({
        where: { code: invitationCode },
        data: {
          used: true,
          usedBy: user.id,
          usedAt: new Date()
        }
      })
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
      message: '注册成功',
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
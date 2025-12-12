import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

export async function GET(request: NextRequest) {
  try {
    const userId = parseInt(request.headers.get('x-user-id') || '0')
    const userRole = request.headers.get('x-user-role') || ''

    if (!userId || userRole !== 'ADMIN') {
      return NextResponse.json({ error: '权限不足' }, { status: 403 })
    }

    const users = await prisma.user.findMany({
      include: {
        divinationRecords: true,
        mbtiResults: true,
        zodiacPreferences: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // 不返回密码
    const usersWithoutPasswords = users.map(user => {
      const { password, ...userWithoutPassword } = user
      return userWithoutPassword
    })

    return NextResponse.json({
      success: true,
      users: usersWithoutPasswords
    })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

export async function POST(request: NextRequest) {
  try {
    const userId = parseInt(request.headers.get('x-user-id') || '0')
    const userRole = request.headers.get('x-user-role') || ''

    if (!userId || userRole !== 'ADMIN') {
      return NextResponse.json({ error: '权限不足' }, { status: 403 })
    }

    // 生成邀请码
    const generateCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
      let result = ''
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      return result
    }

    const code = generateCode()

    // 检查邀请码是否已存在
    let existingCode = await prisma.invitationCode.findUnique({
      where: { code }
    })

    let attempts = 0
    while (existingCode && attempts < 5) {
      const newCode = generateCode()
      existingCode = await prisma.invitationCode.findUnique({
        where: { code: newCode }
      })
      if (!existingCode) {
        return await createCode(newCode)
      }
      attempts++
    }

    // 如果尝试次数过多，使用时间戳
    const finalCode = `DIV${Date.now()}`
    return await createCode(finalCode)

    async function createCode(codeValue: string) {
      const invitationCode = await prisma.invitationCode.create({
        data: {
          code: codeValue,
          createdBy: userId,
          expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30天后过期
        }
      })

      return NextResponse.json({
        success: true,
        invitationCode: {
          id: invitationCode.id,
          code: invitationCode.code,
          expiresAt: invitationCode.expiresAt,
          createdAt: invitationCode.createdAt
        }
      })
    }
  } catch (error) {
    console.error('生成邀请码错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { deleteSession } from '../../../lib/auth'

export async function POST(request: NextRequest) {
  try {
    // 从请求头中获取token
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: '未提供认证token' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7)

    // 删除session
    await deleteSession(token)

    return NextResponse.json({
      message: '退出成功'
    })
  } catch {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
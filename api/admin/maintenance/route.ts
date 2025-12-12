import { NextRequest, NextResponse } from 'next/server'
import { runDatabaseCleanup } from '../../../lib/db-cleanup'

export async function POST(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')
    
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: '权限不足' },
        { status: 403 }
      )
    }

    const result = await runDatabaseCleanup()

    return NextResponse.json({
      message: '数据库清理完成',
      result,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('数据库清理失败:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

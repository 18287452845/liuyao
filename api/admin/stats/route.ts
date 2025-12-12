import { NextRequest, NextResponse } from 'next/server'
import { getSystemStatistics, getDatabaseMetrics } from '../../../lib/db-utils'

export async function GET(request: NextRequest) {
  try {
    const userRole = request.headers.get('x-user-role')
    
    if (userRole !== 'ADMIN') {
      return NextResponse.json(
        { error: '权限不足' },
        { status: 403 }
      )
    }

    const [systemStats, dbMetrics] = await Promise.all([
      getSystemStatistics(),
      getDatabaseMetrics()
    ])

    return NextResponse.json({
      systemStatistics: systemStats,
      databaseMetrics: dbMetrics,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('获取统计信息失败:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

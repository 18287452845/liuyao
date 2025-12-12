import { NextResponse } from 'next/server'
import { checkDatabaseConnection } from '../../lib/db'

export async function GET() {
  try {
    const dbHealthy = await checkDatabaseConnection()
    
    if (!dbHealthy) {
      return NextResponse.json(
        { 
          status: 'unhealthy',
          database: 'disconnected',
          timestamp: new Date().toISOString()
        },
        { status: 503 }
      )
    }

    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      timestamp: new Date().toISOString()
    })
  } catch {
    return NextResponse.json(
      { 
        status: 'error',
        error: 'Health check failed',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

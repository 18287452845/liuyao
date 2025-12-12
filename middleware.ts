import { NextRequest, NextResponse } from 'next/server'
import { getUserFromToken } from '../../../lib/auth'

export async function middleware(request: NextRequest) {
  // 跳过公开路径
  const publicPaths = ['/auth', '/api/auth/login', '/api/auth/register', '/api/auth/logout', '/']
  const path = request.nextUrl.pathname

  const isPublicPath = publicPaths.some(publicPath => 
    path === publicPath || path.startsWith(publicPath + '/')
  )

  if (isPublicPath) {
    return NextResponse.next()
  }

  // 检查认证token
  const authHeader = request.headers.get('authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return NextResponse.json(
      { error: '需要登录认证' },
      { status: 401 }
    )
  }

  const token = authHeader.substring(7)
  const user = await getUserFromToken(token)

  if (!user) {
    return NextResponse.json(
      { error: 'Token无效或已过期' },
      { status: 401 }
    )
  }

  // 将用户信息添加到请求中
  const requestWithUser = new Request(request.url, {
    headers: request.headers,
    method: request.method,
    body: request.body,
    redirect: request.redirect
  })

  requestWithUser.headers.set('x-user-id', user.id.toString())
  requestWithUser.headers.set('x-user-role', user.role)

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/:path*',
    '/divination/:path*',
    '/mbti/:path*',
    '/zodiac/:path*',
    '/admin/:path*'
  ]
}
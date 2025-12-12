import { NextRequest, NextResponse } from 'next/server'
import { zodiacSigns } from '../../../lib/zodiac'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sign = searchParams.get('sign')
    
    if (sign) {
      const signInfo = zodiacSigns[sign as keyof typeof zodiacSigns]
      if (!signInfo) {
        return NextResponse.json({ error: '星座不存在' }, { status: 404 })
      }
      
      return NextResponse.json({
        success: true,
        sign: signInfo
      })
    }
    
    // 返回所有星座
    return NextResponse.json({
      success: true,
      signs: zodiacSigns
    })
  } catch {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
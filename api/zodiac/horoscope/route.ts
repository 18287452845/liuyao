import { NextRequest, NextResponse } from 'next/server'
import { zodiacSigns, zodiacCompatibility } from '../../../lib/zodiac'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sign = searchParams.get('sign')
    const period = searchParams.get('period') || 'daily' // daily, weekly, monthly, yearly

    if (!sign) {
      return NextResponse.json({ error: '请提供星座' }, { status: 400 })
    }

    const signInfo = zodiacSigns[sign as keyof typeof zodiacSigns]
    if (!signInfo) {
      return NextResponse.json({ error: '星座不存在' }, { status: 404 })
    }

    // 生成运势（模拟数据）
    const horoscope = {
      love: generateHoroscopeForPeriod(period, 'love'),
      career: generateHoroscopeForPeriod(period, 'career'),  
      health: generateHoroscopeForPeriod(period, 'health'),
      wealth: generateHoroscopeForPeriod(period, 'wealth')
    }

    return NextResponse.json({
      success: true,
      sign: signInfo,
      period,
      horoscope
    })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

function generateHoroscopeForPeriod(period: string, category: string): string {
  const templates = {
    daily: {
      love: "今日爱情运势良好，单身者有望遇到心仪对象，恋爱中的人感情升温。",
      career: "工作中需要保持专注，不要被琐事分心。适合处理重要决策。",
      health: "身体状况良好，注意劳逸结合，避免过度疲劳。",
      wealth: "财运平稳，适合理财规划，避免冲动消费。"
    },
    weekly: {
      love: "本周爱情运势上升，真诚的交流能增进彼此理解。",
      career: "事业运势稳定上升，与同事合作愉快，项目进展顺利。",
      health: "本周健康运势良好，保持规律作息，适量运动有益身心。",
      wealth: "本周财运稳中有升，合理规划消费，投资需谨慎。"
    },
    monthly: {
      love: "本月感情生活丰富，可能会有重要的感情进展或决定。",
      career: "本月事业运势强劲，适合启动新项目或寻求职业发展机会。",
      health: "本月需要注意身体健康，特别是情绪管理和压力释放。",
      wealth: "本月财运不错，但需注意理财策略，避免不必要的开支。"
    },
    yearly: {
      love: "今年感情运势整体向好，可能是脱单或关系稳定发展的好年份。",
      career: "今年事业运势旺盛，是实现职业目标的重要年份。",
      health: "今年健康运势平稳，保持良好的生活习惯即可。",
      wealth: "今年财运不错，年底可能有意外收获，但需注意风险控制。"
    }
  }

  return templates[period as keyof typeof templates]?.[category as keyof typeof templates.daily] || "运势平稳。"
}
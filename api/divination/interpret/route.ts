import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'

export async function POST(request: NextRequest) {
  try {
    const userId = parseInt(request.headers.get('x-user-id') || '0')
    if (!userId) {
      return NextResponse.json({ error: '用户未认证' }, { status: 401 })
    }

    const { hexagram, question } = await request.json()

    // 这里应该调用DeepSeek API进行解释
    // 目前先用简单的模拟
    let mockInterpretation = `
      卦象：${hexagram?.name || '未知'}
      
      传统解释：
      ${hexagram?.interpretation || '暂无解释'}
      
      详细分析：
      此卦象征着当前的情况和趋势。根据卦象的含义，建议您在处理相关事务时要谨慎行事，
      把握时机，顺势而为。具体来说，这个卦象提示您需要保持冷静的头脑，不要急于做出决定，
      而应该仔细分析当前的情况，寻找最佳的解决方案。
      
      建议：
      1. 保持耐心，不要急躁
      2. 多听取他人意见，集思广益
      3. 注重实际行动，而非空谈
      4. 关注细节，精益求精
    `

    // 如果有question，可以针对具体问题给出更详细的解释
    if (question) {
      mockInterpretation += `\n\n针对您的问题"${question}"：\n这个卦象显示此事需要您以平和的心态去面对，不要过于焦虑。最好的策略是先观察形势变化，再采取适当的行动。记住，耐心和智慧是解决当前问题的关键。`
    }

    // 更新占卜记录的解释
    if (hexagram?.name) {
      await prisma.divinationRecord.updateMany({
        where: {
          userId,
          hexagram: hexagram.name,
          interpretation: null
        },
        data: {
          interpretation: mockInterpretation
        }
      })
    }

    return NextResponse.json({
      success: true,
      interpretation: mockInterpretation,
      aiEnhanced: true,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('解释生成错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { hexagrams } from '../../../lib/hexagrams'
import { prisma } from '../../../lib/db'

export async function POST(request: NextRequest) {
  try {
    const userId = parseInt(request.headers.get('x-user-id') || '0')
    if (!userId) {
      return NextResponse.json({ error: '用户未认证' }, { status: 401 })
    }

    const { question } = await request.json()

    // 模拟传统的起卦过程
    const lines: string[] = []
    
    // 六次投掷，生成六爻
    for (let i = 0; i < 6; i++) {
      const number1 = Math.floor(Math.random() * 4) + 1  // 第一组
      const number2 = Math.floor(Math.random() * 4) + 1  // 第二组
      
      // 模拟筮草法
      const remainder1 = number1 % 4
      const remainder2 = number2 % 4
      const total = remainder1 + remainder2
      
      if (total === 1 || total === 2) {
        lines.push('6') // 老阴（变爻）
      } else if (total === 3) {
        lines.push('7') // 少阳
      } else if (total === 0) {
        lines.push('9') // 老阳（变爻）
      }
    }

    // 构建卦象的二进制表示
    const hexagramNumber = parseInt(lines.join(''), 3) + 1
    
    // 如果卦象编号超出范围，使用随机选择
    const finalHexagram = hexagramNumber > 64 ? Math.floor(Math.random() * 64) + 1 : hexagramNumber
    const hexagram = hexagrams[finalHexagram as keyof typeof hexagrams]

    if (!hexagram) {
      return NextResponse.json({ error: '卦象数据错误' }, { status: 500 })
    }

    // 保存占卜记录
    const divinationRecord = await prisma.divinationRecord.create({
      data: {
        userId,
        method: 'ZENG_SHAN_BU_YI',
        hexagram: hexagram.name,
        question: question || '',
        interpretation: hexagram.interpretation
      }
    })

    return NextResponse.json({
      message: '占卜完成',
      hexagram: {
        number: finalHexagram,
        name: hexagram.name,
        symbol: hexagram.symbol,
        description: hexagram.description,
        interpretation: hexagram.interpretation,
        lines: lines
      },
      record: divinationRecord
    })
  } catch (error) {
    console.error('占卜错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { hexagrams } from '../../../lib/hexagrams'
import { prisma } from '../../../lib/db'
import { z } from 'zod'

const manualDivinationSchema = z.object({
  hexagramNumber: z.number().min(1).max(64),
  question: z.string().optional(),
  method: z.enum(['ZENG_SHAN_BU_YI', 'BU_SHI_ZHENG_ZONG'])
})

export async function POST(request: NextRequest) {
  try {
    const userId = parseInt(request.headers.get('x-user-id') || '0')
    if (!userId) {
      return NextResponse.json({ error: '用户未认证' }, { status: 401 })
    }

    const body = await request.json()
    const { hexagramNumber, question, method } = manualDivinationSchema.parse(body)

    const hexagram = hexagrams[hexagramNumber as keyof typeof hexagrams]
    if (!hexagram) {
      return NextResponse.json({ error: '卦象不存在' }, { status: 400 })
    }

    // 保存占卜记录
    const divinationRecord = await prisma.divinationRecord.create({
      data: {
        userId,
        method,
        hexagram: hexagram.name,
        question: question || '',
        interpretation: hexagram.interpretation
      }
    })

    return NextResponse.json({
      message: '占卜记录保存成功',
      hexagram: {
        number: hexagramNumber,
        name: hexagram.name,
        symbol: hexagram.symbol,
        description: hexagram.description,
        interpretation: hexagram.interpretation
      },
      record: divinationRecord
    })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
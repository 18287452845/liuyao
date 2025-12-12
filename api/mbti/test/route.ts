import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '../../../lib/db'
import { mbtiTypes } from '../../../lib/mbti'

export async function POST(request: NextRequest) {
  try {
    const userId = parseInt(request.headers.get('x-user-id') || '0')
    if (!userId) {
      return NextResponse.json({ error: '用户未认证' }, { status: 401 })
    }

    const { answers } = await request.json()

    // 计算各个维度的分数
    let eScore = 0 // Extraversion
    let sScore = 0 // Sensing
    let tScore = 0 // Thinking
    let jScore = 0 // Judging

    // 统计各维度得分（这里简化处理）
    for (const answer of answers) {
      if (answer.dimension === 'E') eScore++
      if (answer.dimension === 'S') sScore++
      if (answer.dimension === 'T') tScore++
      if (answer.dimension === 'J') jScore++
    }

    // 确定MBTI类型
    const eOrI = eScore > answers.length / 2 ? 'E' : 'I'
    const sOrN = sScore > answers.length / 2 ? 'S' : 'N'
    const tOrF = tScore > answers.length / 2 ? 'T' : 'F'
    const jOrP = jScore > answers.length / 2 ? 'J' : 'P'

    const mbtiType = eOrI + sOrN + tOrF + jOrP

    // 获取类型详情
    const typeInfo = mbtiTypes[mbtiType as keyof typeof mbtiTypes]
    if (!typeInfo) {
      return NextResponse.json({ error: 'MBTI类型不存在' }, { status: 400 })
    }

    // 保存MBTI结果
    const mbtiResult = await prisma.mbtiResult.create({
      data: {
        userId,
        mbtiType,
        eScore,
        sScore,
        tScore,
        jScore,
        answers
      }
    })

    // 生成兼容性匹配
    const matches = []
    for (const [compatibleType, compatibility] of Object.entries(typeInfo.compatibleWith)) {
      if (mbtiTypes[compatibleType as keyof typeof mbtiTypes]) {
        // 计算兼容性评分
        const score = typeof compatibility === 'number' ? compatibility : 0
        // 可以根据实际情况调整评分逻辑
        
        const match = await prisma.mbtiMatch.create({
          data: {
            userId,
            resultId: mbtiResult.id,
            matchedType: compatibleType,
            compatibility: score,
            details: `与${typeInfo.name}的兼容性：${score}%`
          }
        })
        matches.push(match)
      }
    }

    return NextResponse.json({
      success: true,
      result: {
        id: mbtiResult.id,
        type: mbtiType,
        typeInfo,
        scores: {
          extraversion: eScore,
          sensing: sScore,
          thinking: tScore,
          judging: jScore
        },
        matches
      }
    })
  } catch (error) {
    console.error('MBTI测试错误:', error)
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}
import { NextRequest, NextResponse } from 'next/server'
import { zodiacCompatibility, zodiacSigns } from '../../../lib/zodiac'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const sign1 = searchParams.get('sign1')
    const sign2 = searchParams.get('sign2')

    if (!sign1 || !sign2) {
      return NextResponse.json({ error: '请提供两个星座进行比较' }, { status: 400 })
    }

    const sign1Info = zodiacSigns[sign1 as keyof typeof zodiacSigns]
    const sign2Info = zodiacSigns[sign2 as keyof typeof zodiacSigns]

    if (!sign1Info || !sign2Info) {
      return NextResponse.json({ error: '星座不存在' }, { status: 404 })
    }

    // 获取兼容性评分
    const compatibilityScore = zodiacCompatibility[sign1 as keyof typeof zodiacCompatibility]?.[sign2] || 50

    // 生成详细的兼容性分析
    const compatibilityAnalysis = generateCompatibilityAnalysis(sign1, sign2, compatibilityScore)

    return NextResponse.json({
      success: true,
      compatibility: {
        sign1: sign1Info,
        sign2: sign2Info,
        score: compatibilityScore,
        level: getCompatibilityLevel(compatibilityScore),
        analysis: compatibilityAnalysis,
        advice: getCompatibilityAdvice(compatibilityScore)
      }
    })
  } catch (error) {
    return NextResponse.json(
      { error: '服务器错误' },
      { status: 500 }
    )
  }
}

function getCompatibilityLevel(score: number): string {
  if (score >= 90) return '极佳'
  if (score >= 80) return '很好'
  if (score >= 70) return '良好'
  if (score >= 60) return '一般'
  if (score >= 50) return '较差'
  return '不佳'
}

function generateCompatibilityAnalysis(sign1: string, sign2: string, score: number): string {
  const baseAnalysis = `根据星座学理论，${sign1}和${sign2}的兼容性为${score}%。`
  
  let detailedAnalysis = ""
  
  if (score >= 80) {
    detailedAnalysis = "这两个星座在性格特质、价值观和生活方式上有很多共同点，容易产生共鸣和理解。彼此能够很好地配合，在关系中相互支持，共同成长。"
  } else if (score >= 60) {
    detailedAnalysis = "这两个星座虽然有些差异，但总体上能够相互包容和理解。关系中有互补的成分，通过沟通和妥协可以建立良好的互动。"
  } else if (score >= 40) {
    detailedAnalysis = "这两个星座在某些方面存在较大差异，需要更多的理解、包容和沟通。虽然挑战较大，但如果双方都愿意努力，也可以建立稳定的关系。"
  } else {
    detailedAnalysis = "这两个星座在性格和需求上存在较大冲突，需要双方付出更多努力和理解。建议多花时间了解彼此的特点，寻找共同点。"
  }

  return `${baseAnalysis} ${detailedAnalysis}`
}

function getCompatibilityAdvice(score: number): string[] {
  if (score >= 80) {
    return [
      "珍惜彼此的共同点，相互支持",
      "保持良好的沟通，及时解决问题", 
      "给彼此足够的个人空间",
      "共同规划未来，设定共同目标"
    ]
  } else if (score >= 60) {
    return [
      "学会欣赏彼此的差异",
      "加强沟通，耐心倾听对方",
      "寻找共同兴趣和爱好",
      "在分歧时保持冷静和理性"
    ]
  } else if (score >= 40) {
    return [
      "需要更多的时间和耐心",
      "学会换位思考，理解对方立场",
      "建立清晰的关系边界",
      "寻求专业建议或参加情侣咨询"
    ]
  } else {
    return [
      "需要谨慎考虑关系的可行性",
      "如果决定在一起，需要充分的心理准备",
      "学习关系修复技能",
      "保持开放的沟通渠道"
    ]
  }
}
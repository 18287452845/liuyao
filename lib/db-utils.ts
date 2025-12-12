import { prisma } from './db'

export async function cleanExpiredSessions(): Promise<number> {
  const result = await prisma.session.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      }
    }
  })
  return result.count
}

export async function cleanExpiredInvitationCodes(): Promise<number> {
  const result = await prisma.invitationCode.deleteMany({
    where: {
      expiresAt: {
        lt: new Date()
      },
      used: false
    }
  })
  return result.count
}

export async function getUserStatistics(userId: number) {
  const [divinationCount, mbtiCount, zodiacPreferenceCount, zodiacReadingCount] = await Promise.all([
    prisma.divinationRecord.count({ where: { userId } }),
    prisma.mbtiResult.count({ where: { userId } }),
    prisma.zodiacPreference.count({ where: { userId } }),
    prisma.zodiacReading.count({ where: { userId } })
  ])

  return {
    divinationCount,
    mbtiCount,
    zodiacPreferenceCount,
    zodiacReadingCount
  }
}

export async function getSystemStatistics() {
  const [
    totalUsers,
    totalDivinations,
    totalMbtiTests,
    totalZodiacReadings,
    activeInvitations
  ] = await Promise.all([
    prisma.user.count(),
    prisma.divinationRecord.count(),
    prisma.mbtiResult.count(),
    prisma.zodiacReading.count(),
    prisma.invitationCode.count({
      where: {
        used: false,
        expiresAt: {
          gte: new Date()
        }
      }
    })
  ])

  return {
    totalUsers,
    totalDivinations,
    totalMbtiTests,
    totalZodiacReadings,
    activeInvitations
  }
}

export async function batchDeleteUserData(userId: number): Promise<void> {
  await prisma.$transaction([
    prisma.session.deleteMany({ where: { userId } }),
    prisma.divinationRecord.deleteMany({ where: { userId } }),
    prisma.mbtiMatch.deleteMany({ where: { userId } }),
    prisma.mbtiResult.deleteMany({ where: { userId } }),
    prisma.zodiacPreference.deleteMany({ where: { userId } }),
    prisma.zodiacReading.deleteMany({ where: { userId } }),
    prisma.invitationCode.updateMany({
      where: { usedBy: userId },
      data: { usedBy: null, usedAt: null, used: false }
    }),
    prisma.user.delete({ where: { id: userId } })
  ])
}

export async function getDatabaseMetrics() {
  try {
    const tableStats = await prisma.$queryRaw<Array<{
      table_name: string
      table_rows: number
      data_length: number
      index_length: number
    }>>`
      SELECT 
        table_name,
        table_rows,
        data_length,
        index_length
      FROM information_schema.TABLES
      WHERE table_schema = DATABASE()
      ORDER BY data_length DESC
    `

    return tableStats
  } catch (error) {
    console.error('Failed to get database metrics:', error)
    return []
  }
}

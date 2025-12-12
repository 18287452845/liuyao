import { cleanExpiredSessions, cleanExpiredInvitationCodes } from './db-utils'

export async function runDatabaseCleanup(): Promise<{
  expiredSessions: number
  expiredInvitations: number
}> {
  console.log('[DB Cleanup] Starting database cleanup...')
  
  const [expiredSessions, expiredInvitations] = await Promise.all([
    cleanExpiredSessions(),
    cleanExpiredInvitationCodes()
  ])

  console.log(`[DB Cleanup] Cleaned ${expiredSessions} expired sessions`)
  console.log(`[DB Cleanup] Cleaned ${expiredInvitations} expired invitations`)
  
  return {
    expiredSessions,
    expiredInvitations
  }
}

export function startCleanupScheduler(intervalMs: number = 3600000) {
  console.log(`[DB Cleanup] Starting cleanup scheduler (interval: ${intervalMs}ms)`)
  
  const interval = setInterval(async () => {
    try {
      await runDatabaseCleanup()
    } catch (error) {
      console.error('[DB Cleanup] Cleanup failed:', error)
    }
  }, intervalMs)

  return () => {
    clearInterval(interval)
    console.log('[DB Cleanup] Cleanup scheduler stopped')
  }
}

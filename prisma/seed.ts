import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('开始数据库初始化...')

  const adminPassword = await bcrypt.hash('admin123456', 10)
  
  const admin = await prisma.user.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@example.com',
      password: adminPassword,
      role: 'ADMIN'
    }
  })

  console.log('管理员账户创建成功:', admin.username)

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + 30)

  const invitationCode = await prisma.invitationCode.create({
    data: {
      code: 'WELCOME2024',
      createdBy: admin.id,
      expiresAt,
      used: false
    }
  })

  console.log('初始邀请码创建成功:', invitationCode.code)
  console.log('')
  console.log('===========================================')
  console.log('数据库初始化完成！')
  console.log('===========================================')
  console.log('管理员账户:')
  console.log('  用户名: admin')
  console.log('  密码: admin123456')
  console.log('  邮箱:', admin.email)
  console.log('')
  console.log('初始邀请码:', invitationCode.code)
  console.log('有效期至:', expiresAt.toISOString())
  console.log('===========================================')
  console.log('')
  console.log('⚠️  请在生产环境中修改默认密码！')
}

main()
  .catch((e) => {
    console.error('数据库初始化失败:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

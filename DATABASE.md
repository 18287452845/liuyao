# 数据库优化文档

本文档详细说明了数据库结构优化和最佳实践。

## 📊 数据库优化特性

### 1. 索引优化

#### 用户表 (users)
- `username` - 唯一索引（已有）
- `email` - 唯一索引 + 普通索引（用于查询）
- `role` - 普通索引（用于权限过滤）
- `createdAt` - 普通索引（用于时间范围查询）

#### 会话表 (sessions)
- `token` - 唯一索引（已有）
- `userId` - 外键索引（用于关联查询）
- `expiresAt` - 普通索引（用于清理过期会话）

#### 邀请码表 (invitation_codes)
- `code` - 唯一索引（已有）
- `usedBy` - 外键索引
- `createdBy` - 外键索引
- `used` - 普通索引（用于查询未使用的邀请码）
- `expiresAt` - 普通索引（用于清理过期邀请码）

#### 占卜记录表 (divination_records)
- `userId` - 外键索引
- `method` - 普通索引（用于按方法分类）
- `createdAt` - 普通索引（用于时间排序）

#### MBTI结果表 (mbti_results)
- `userId` - 外键索引
- `mbtiType` - 普通索引（用于类型统计）
- `createdAt` - 普通索引

#### MBTI匹配表 (mbti_matches)
- `userId` - 外键索引
- `resultId` - 外键索引
- `matchedType` - 普通索引

#### 星座偏好表 (zodiac_preferences)
- `userId` + `sign` - 复合唯一索引（已有）
- `userId` - 外键索引
- `sign` - 普通索引

#### 星座解读表 (zodiac_readings)
- `userId` - 外键索引
- `sign` - 普通索引
- `readingType` - 普通索引
- `createdAt` - 普通索引

### 2. 字段类型优化

#### 字符串字段优化
- 短字符串使用 `@db.VarChar(N)` 代替默认的 `String`
- 长文本使用 `@db.Text` 以支持更大容量

#### 日期时间优化
- 使用 `@db.DateTime(0)` 精确到秒，节省存储空间
- 统一使用 UTC 时区

#### 数据类型映射
```prisma
String            -> @db.VarChar(N)    // 固定长度字符串
String (长文本)   -> @db.Text          // 可变长度文本
DateTime          -> @db.DateTime(0)   // 精确到秒的时间戳
```

### 3. 级联删除规则

所有关联关系都配置了适当的 `onDelete` 行为：

- **Cascade**: 删除用户时，自动删除其所有相关数据
  - Sessions
  - DivinationRecords
  - MbtiResults & MbtiMatches
  - ZodiacPreferences & ZodiacReadings
  
- **SetNull**: 删除用户时，将引用设为 NULL
  - InvitationCode.usedBy（保留邀请码历史）

### 4. 连接池配置

DATABASE_URL 支持连接池参数：

```env
DATABASE_URL="mysql://user:pass@host:3306/db?connection_limit=10&pool_timeout=20&connect_timeout=10"
```

参数说明：
- `connection_limit`: 最大连接数（默认10）
- `pool_timeout`: 连接池超时时间（秒）
- `connect_timeout`: 连接超时时间（秒）

### 5. Prisma 客户端配置

#### 日志配置
- 开发环境：记录 query, error, warn
- 生产环境：仅记录 error

#### 错误格式
- 使用 `pretty` 格式便于调试

### 6. 数据库性能优化

MySQL 8.0 初始化设置：

```sql
-- 字符集
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_unicode_ci

-- 性能参数
max_connections = 200
innodb_buffer_pool_size = 256MB
innodb_log_file_size = 64MB
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT
```

## 🛠 实用工具函数

### 数据库健康检查

```typescript
import { checkDatabaseConnection } from '@/lib/db'

const isHealthy = await checkDatabaseConnection()
```

### 清理过期数据

```typescript
import { cleanExpiredSessions, cleanExpiredInvitationCodes } from '@/lib/db-utils'

// 清理过期会话
const sessionCount = await cleanExpiredSessions()

// 清理过期邀请码
const invitationCount = await cleanExpiredInvitationCodes()
```

### 用户统计信息

```typescript
import { getUserStatistics } from '@/lib/db-utils'

const stats = await getUserStatistics(userId)
// {
//   divinationCount,
//   mbtiCount,
//   zodiacPreferenceCount,
//   zodiacReadingCount
// }
```

### 系统统计信息

```typescript
import { getSystemStatistics } from '@/lib/db-utils'

const stats = await getSystemStatistics()
// {
//   totalUsers,
//   totalDivinations,
//   totalMbtiTests,
//   totalZodiacReadings,
//   activeInvitations
// }
```

### 批量删除用户数据

```typescript
import { batchDeleteUserData } from '@/lib/db-utils'

// 删除用户及其所有相关数据
await batchDeleteUserData(userId)
```

### 数据库指标

```typescript
import { getDatabaseMetrics } from '@/lib/db-utils'

const metrics = await getDatabaseMetrics()
// 返回各表的行数和存储大小
```

## 🔄 自动清理任务

### 启动清理调度器

```typescript
import { startCleanupScheduler } from '@/lib/db-cleanup'

// 每小时清理一次（默认）
const stopCleanup = startCleanupScheduler()

// 自定义间隔（30分钟）
const stopCleanup = startCleanupScheduler(30 * 60 * 1000)

// 停止清理
stopCleanup()
```

## 🔌 API 端点

### 健康检查
```
GET /api/health
```

返回数据库连接状态。

### 系统统计（管理员）
```
GET /api/admin/stats
Authorization: Bearer <token>
```

返回系统统计信息和数据库指标。

### 数据库维护（管理员）
```
POST /api/admin/maintenance
Authorization: Bearer <token>
```

手动触发数据库清理任务。

## 📈 性能建议

### 1. 查询优化

- 使用索引字段进行查询
- 避免 SELECT *，只查询需要的字段
- 使用 `take` 和 `skip` 进行分页
- 使用 `select` 和 `include` 精确控制返回数据

### 2. 批量操作

使用事务处理批量操作：

```typescript
await prisma.$transaction([
  prisma.user.create({ data: ... }),
  prisma.session.create({ data: ... })
])
```

### 3. 连接管理

- 在 serverless 环境中注意连接数限制
- 使用连接池参数控制并发连接
- 定期清理过期连接

### 4. 监控建议

- 监控慢查询
- 定期检查索引使用情况
- 监控数据库大小和增长率
- 设置自动备份策略

## 🔧 维护操作

### 生成 Prisma 客户端
```bash
npm run db:generate
```

### 同步数据库结构
```bash
npm run db:push
```

### 创建迁移
```bash
npm run db:migrate
```

### 打开 Prisma Studio
```bash
npm run db:studio
```

## 🚨 注意事项

1. **级联删除**: 删除用户会自动删除所有相关数据，操作前请确认
2. **时区统一**: 所有时间统一使用 UTC，显示时转换为本地时间
3. **连接池**: 根据实际负载调整连接池大小
4. **定期维护**: 建议定期执行清理任务和数据库优化
5. **备份策略**: 生产环境务必配置自动备份

## 📚 参考资源

- [Prisma 文档](https://www.prisma.io/docs)
- [MySQL 8.0 参考手册](https://dev.mysql.com/doc/refman/8.0/en/)
- [数据库索引最佳实践](https://use-the-index-luke.com/)

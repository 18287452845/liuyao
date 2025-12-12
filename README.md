# 卜易堂 - 多模块占卜星座平台

一个基于 Next.js 16 的现代化占卜、星座、MBTI性格测试平台，融合传统文化与现代技术。

## 🌟 项目特色

### 📜 传统文化与现代技术融合
- **传统占卜体系**：集成增删卜易、卜筮正宗两大经典占卜方法
- **AI智能解读**：结合DeepSeek AI技术，为传统卦象提供现代化解读
- **现代化界面**：采用 Tailwind CSS 4，提供优雅的用户体验

### 🔐 安全的用户管理系统
- **邀请码注册**：限制性注册机制，防止恶意注册
- **权限分级**：管理员和普通用户双重权限体系
- **数据隔离**：每个用户的数据完全独立

## 🎯 功能模块

### 📿 模块1：占卜预测
- **随机起卦**：模拟传统筮草起卦过程
- **手动输入卦象**：支持从64卦中手动选择
- **AI智能解卦**：集成DeepSeek API，提供深度解读
- **占卜记录**：完整的占卜历史记录系统

### 🧠 模块2：MBTI性格测试
- **16种性格类型**：完整的MBTI性格分类
- **科学测试体系**：基于心理学理论的测试方法
- **性格匹配分析**：提供性格兼容性分析
- **个人发展建议**：详细的性格分析报告

### ⭐ 模块3：星座服务
- **星座信息查询**：详细的十二星座特质介绍
- **星座运势**：日、周、月、年运势查询
- **星座匹配**：星座间兼容性分析
- **个性化推荐**：基于星座的用户推荐

### ⚙️ 模块5：用户管理
- **用户权限管理**：管理员和用户分级管理
- **邀请码生成**：管理员可生成和管理邀请码
- **使用统计**：用户活跃度和功能使用情况统计
- **数据安全**：用户数据完全隔离保护

## 🛠 技术架构

### 前端技术栈
- **Next.js 16** - React框架与App Router
- **React 19** - 最新React版本
- **TypeScript** - 类型安全开发
- **Tailwind CSS 4** - 现代化CSS框架
- **React Hook Form** - 表单状态管理

### 后端技术栈
- **Next.js API Routes** - 服务端API
- **Prisma ORM** - 数据库操作
- **MySQL 8.0** - 关系型数据库
- **JWT** - 用户认证
- **bcryptjs** - 密码加密

### 部署技术
- **Docker** - 容器化部署
- **Docker Compose** - 容器编排
- **Multi-stage Build** - 优化镜像大小

## 📋 项目结构

```
home/engine/project/
├── app/                    # Next.js App Router 页面
│   ├── auth/              # 认证相关页面
│   ├── divination/        # 占卜功能页面
│   ├── mbti/              # MBTI测试页面
│   ├── zodiac/            # 星座功能页面
│   ├── admin/             # 管理功能页面
│   └── page.tsx           # 主页
├── components/            # React组件
│   ├── auth/              # 认证组件
│   ├── divination/        # 占卜组件
│   ├── mbti/              # MBTI组件
│   ├── zodiac/            # 星座组件
│   ├── admin/             # 管理组件
│   └── layout/            # 布局组件
├── lib/                   # 核心库文件
│   ├── db.ts              # 数据库连接
│   ├── auth.ts            # 认证工具
│   ├── hexagrams.ts       # 卦象数据
│   ├── mbti.ts            # MBTI数据
│   └── zodiac.ts          # 星座数据
├── api/                   # API路由
│   ├── auth/              # 认证API
│   ├── divination/        # 占卜API
│   ├── mbti/              # MBTI API
│   ├── zodiac/            # 星座API
│   └── user/              # 用户API
├── prisma/                # 数据库模型
│   └── schema.prisma      # Prisma模式定义
├── docker-compose.yml     # Docker编排
├── Dockerfile             # Docker镜像
└── README.md              # 项目文档
```

## 🚀 快速开始

### 环境要求
- Node.js 18+
- Docker & Docker Compose
- MySQL 8.0

### 1. 克隆项目
```bash
git clone <repository-url>
cd divination-platform
```

### 2. 环境配置
复制环境变量文件：
```bash
cp .env.example .env
```

编辑 `.env` 文件：
```env
DATABASE_URL="mysql://username:password@localhost:3306/divination_db"
JWT_SECRET="your-super-secret-jwt-key"
DEEPSEEK_API_KEY="your-deepseek-api-key"
NODE_ENV="development"
```

### 3. Docker 部署（推荐）
使用 Docker Compose 一键部署：
```bash
# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f app
```

### 4. 手动部署
如果需要手动部署：
```bash
# 安装依赖
npm install

# 生成 Prisma 客户端
npx prisma generate

# 同步数据库结构
npx prisma db push

# 构建项目
npm run build

# 启动服务
npm start
```

### 5. 数据库初始化
首次启动后，需要：
1. 创建管理员账户（通过数据库操作）
2. 生成邀请码
3. 开始正常使用

## 🗄 数据库设计

### 核心模型

#### User（用户）
```sql
- id: 主键
- username: 用户名（唯一）
- email: 邮箱（唯一）
- password: 密码（加密）
- role: 角色（ADMIN/USER）
- createdAt: 创建时间
- updatedAt: 更新时间
```

#### InvitationCode（邀请码）
```sql
- id: 主键
- code: 邀请码（唯一）
- used: 是否已使用
- usedBy: 使用者ID
- createdBy: 创建者ID
- expiresAt: 过期时间
```

#### DivinationRecord（占卜记录）
```sql
- id: 主键
- userId: 用户ID
- method: 占卜方法
- hexagram: 卦象
- question: 问题
- interpretation: 解释
```

#### MbtiResult（MBTI结果）
```sql
- id: 主键
- userId: 用户ID
- mbtiType: MBTI类型
- eScore: 外向性得分
- sScore: 感觉性得分
- tScore: 思考性得分
- jScore: 判断性得分
- answers: 答案记录
```

## 🔧 API 文档

### 认证接口
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/register` - 用户注册（需邀请码）
- `POST /api/auth/logout` - 用户登出

### 占卜接口
- `POST /api/divination/random` - 随机起卦
- `POST /api/divination/manual` - 手动输入卦象
- `POST /api/divination/interpret` - AI解读卦象

### MBTI接口
- `POST /api/mbti/test` - 提交MBTI测试

### 星座接口
- `GET /api/zodiac/info` - 获取星座信息
- `GET /api/zodiac/horoscope` - 获取星座运势
- `GET /api/zodiac/compatibility` - 星座匹配分析

### 管理接口
- `GET /api/user/manage` - 获取用户列表（管理员）
- `POST /api/user/invitation` - 生成邀请码（管理员）

## 🐳 Docker 部署

### 开发环境
```bash
# 启动开发环境
docker-compose -f docker-compose.yml up -d

# 进入容器
docker-compose exec app sh
```

### 生产环境
```bash
# 构建生产镜像
docker build -t divination-platform .

# 运行生产容器
docker run -d -p 3000:3000 \
  -e DATABASE_URL="..." \
  -e JWT_SECRET="..." \
  -e DEEPSEEK_API_KEY="..." \
  divination-platform
```

## 🔒 安全特性

### 认证安全
- JWT Token 认证
- 密码 bcrypt 加密
- Session 管理
- Token 过期机制

### 数据安全
- 用户数据隔离
- SQL 注入防护
- XSS 攻击防护
- CORS 配置

### 权限控制
- 角色基础访问控制（RBAC）
- API 权限验证
- 前端路由保护
- 管理员功能隔离

## 🧪 测试

### 单元测试
```bash
npm run test
```

### E2E 测试
```bash
npm run test:e2e
```

### 代码检查
```bash
npm run lint
npm run type-check
```

## 📈 性能优化

### 前端优化
- Next.js 自动优化
- 组件懒加载
- 图片优化
- 代码分割

### 后端优化
- 数据库索引
- 查询优化
- 缓存策略
- API 响应压缩

## 🔄 监控与日志

### 应用监控
- 错误监控
- 性能监控
- 用户行为分析
- 系统资源监控

### 日志管理
- 应用日志
- 数据库日志
- 访问日志
- 错误日志

## 🤝 贡献指南

### 开发流程
1. Fork 项目
2. 创建特性分支
3. 提交代码变更
4. 创建 Pull Request
5. 代码审查合并

### 代码规范
- TypeScript 严格模式
- ESLint 代码检查
- Prettier 代码格式化
- 组件文档注释

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🆘 常见问题

### Q: 如何创建管理员账户？
A: 目前需要通过数据库直接创建，或修改现有用户角色。

### Q: 邀请码如何生成？
A: 管理员登录后在管理界面可以生成邀请码。

### Q: DeepSeek API 如何配置？
A: 在 .env 文件中配置 DEEPSEEK_API_KEY 环境变量。

### Q: 数据库迁移如何处理？
A: 使用 Prisma 的 `npx prisma db push` 命令同步模型。

### Q: 如何备份数据？
A: 使用 Docker volumes 或直接备份 MySQL 数据文件。

## 📞 联系方式

如有问题或建议，请通过以下方式联系：
- 提交 Issue
- 发送邮件
- 在线讨论

---

**卜易堂** - 传承古老智慧，融合现代技术 🔮✨
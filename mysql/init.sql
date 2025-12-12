-- 创建数据库和用户
CREATE DATABASE IF NOT EXISTS divination_db
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE divination_db;

-- 设置时区
SET time_zone = '+00:00';

-- 设置数据库默认字符集
ALTER DATABASE divination_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- 性能优化设置
SET GLOBAL max_connections = 200;
SET GLOBAL innodb_buffer_pool_size = 268435456; -- 256MB
SET GLOBAL innodb_log_file_size = 67108864; -- 64MB
SET GLOBAL query_cache_size = 0; -- Disable query cache for MySQL 8.0+
SET GLOBAL innodb_flush_log_at_trx_commit = 2;
SET GLOBAL innodb_flush_method = O_DIRECT;

-- 创建表（这些表将通过Prisma创建）
-- 这里只是占位，实际表结构通过Prisma管理

-- 创建数据库健康检查表
CREATE TABLE IF NOT EXISTS `_health_check` (
  `id` INT PRIMARY KEY AUTO_INCREMENT,
  `status` VARCHAR(20) NOT NULL DEFAULT 'healthy',
  `checked_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_checked_at` (`checked_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO `_health_check` (`status`) VALUES ('healthy')
ON DUPLICATE KEY UPDATE `status` = 'healthy';
create DATABASE if not exists gochat CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- ================================
-- 用户表
-- ================================
use gochat;
CREATE TABLE IF NOT EXISTS `users` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `nickname` VARCHAR(50),
  `avatar_url` VARCHAR(255),
  `status_message` VARCHAR(255),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================
-- 群组表
-- ================================
CREATE TABLE IF NOT EXISTS `groups` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  `owner_id` BIGINT UNSIGNED NOT NULL,
  `avatar_url` VARCHAR(255),
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  `updated_at` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
  -- 无索引，无外键
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================
-- 群组成员表
-- ================================
CREATE TABLE IF NOT EXISTS `group_members` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `group_id` BIGINT UNSIGNED NOT NULL,
  `user_id` BIGINT UNSIGNED NOT NULL,
  `role` ENUM('member','admin','owner') DEFAULT 'member',
  `joined_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_group_user` (`group_id`, `user_id`) -- 保证同一用户不会重复加入同一群
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- ================================
-- 消息表
-- ================================
CREATE TABLE IF NOT EXISTS `messages` (
  `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
  `sender_id` BIGINT UNSIGNED NOT NULL,
  `receiver_id` BIGINT UNSIGNED DEFAULT NULL, -- 私聊使用
  `group_id` BIGINT UNSIGNED DEFAULT NULL,    -- 群聊使用
  `content` TEXT NOT NULL,
  `type` ENUM('text','image','file') DEFAULT 'text',
  `created_at` DATETIME DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
  -- 无索引
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;


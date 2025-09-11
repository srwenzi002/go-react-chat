create DATABASE if not exists gochat CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
-- ================================
-- 用户表
-- ================================
use gochat;

CREATE TABLE IF NOT EXISTS users (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '用户ID',
    email VARCHAR(255) NOT NULL UNIQUE COMMENT '用户邮箱，用于登录',
    password VARCHAR(255) NOT NULL COMMENT '加密存储的密码',
    nickname VARCHAR(50) DEFAULT '' COMMENT '用户昵称',
    avatar_url VARCHAR(255) DEFAULT '' COMMENT '头像URL',
    status_message VARCHAR(255) DEFAULT '' COMMENT '状态消息（可选）',
    settings TEXT DEFAULT '' COMMENT '个性化设置，JSON字符串存储用户偏好，如是否允许被打招呼、主题、通知偏好等',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '注册时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='用户表';


CREATE TABLE IF NOT EXISTS groups (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '群组ID',
    name VARCHAR(100) NOT NULL COMMENT '群组名称',
    description VARCHAR(255) DEFAULT '' COMMENT '群组描述',
    created_by BIGINT UNSIGNED NOT NULL COMMENT '创建用户ID',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='群组/服务器表';

CREATE TABLE IF NOT EXISTS group_members (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '群组成员ID',
    group_id BIGINT UNSIGNED NOT NULL COMMENT '所属群组ID',
    user_id BIGINT UNSIGNED NOT NULL COMMENT '用户ID',
    role VARCHAR(50) DEFAULT 'member' COMMENT '用户角色（member/admin等，可扩展权限）',
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '加入时间',
    PRIMARY KEY(id),
    UNIQUE KEY unique_group_user (group_id, user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='群组成员表';

CREATE TABLE IF NOT EXISTS categories (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '分类ID',
    group_id BIGINT UNSIGNED NOT NULL COMMENT '所属群组ID',
    name VARCHAR(100) NOT NULL COMMENT '分类名称',
    position INT DEFAULT 0 COMMENT '排序位置',
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='频道分类表';

CREATE TABLE IF NOT EXISTS channels (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '频道ID',
    category_id BIGINT UNSIGNED DEFAULT NULL COMMENT '所属分类ID',
    group_id BIGINT UNSIGNED NOT NULL COMMENT '所属群组ID',
    name VARCHAR(100) NOT NULL COMMENT '频道名称',
    type ENUM('text','voice') DEFAULT 'text' COMMENT '频道类型',
    is_public TINYINT(1) DEFAULT 1 COMMENT '是否所有成员可发言，0=以后可加权限',
    position INT DEFAULT 0 COMMENT '排序位置',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY(id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='频道表';
CREATE TABLE IF NOT EXISTS threads (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '帖子ID',
    channel_id BIGINT UNSIGNED NOT NULL COMMENT '所属频道ID',
    name VARCHAR(255) NOT NULL COMMENT '帖子标题',
    created_by BIGINT UNSIGNED NOT NULL COMMENT '创建人ID',
    is_archived TINYINT(1) DEFAULT 0 COMMENT '是否归档',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
    PRIMARY KEY(id),
    INDEX idx_channel_id (channel_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='帖子表';
CREATE TABLE IF NOT EXISTS dm_channels (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '私聊会话ID',
    user1_id BIGINT UNSIGNED NOT NULL COMMENT '用户1 ID（固定较小的ID）',
    user2_id BIGINT UNSIGNED NOT NULL COMMENT '用户2 ID（固定较大的ID）',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
    PRIMARY KEY(id),
    UNIQUE KEY unique_pair (user1_id, user2_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='私聊会话表';
CREATE TABLE IF NOT EXISTS messages (
    id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT COMMENT '消息ID',
    channel_id BIGINT UNSIGNED DEFAULT NULL COMMENT '所属频道ID（普通消息必填）',
    thread_id BIGINT UNSIGNED DEFAULT NULL COMMENT '所属帖子ID（帖子消息必填）',
    dm_channel_id BIGINT UNSIGNED DEFAULT NULL COMMENT '私聊会话ID（私聊消息必填）',
    sender_id BIGINT UNSIGNED NOT NULL COMMENT '发送消息的用户ID',
    content TEXT NOT NULL COMMENT '消息内容',
    type ENUM('text','image','system') DEFAULT 'text' COMMENT '消息类型',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT '发送时间',
    deleted_at DATETIME DEFAULT NULL COMMENT '删除/撤回时间',
    PRIMARY KEY(id),
    INDEX idx_channel_id (channel_id),
    INDEX idx_thread_id (thread_id),
    INDEX idx_dm_channel_id (dm_channel_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='消息表（普通消息+帖子消息+私聊消息）';


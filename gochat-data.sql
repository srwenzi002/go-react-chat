-- ================================
-- 插入用户
-- ================================
INSERT INTO `users` (`email`, `password_hash`, `nickname`, `avatar_url`, `status_message`)
VALUES 
('alice@example.com', '$2a$12$examplehash1', 'Alice', 'https://i.pravatar.cc/150?img=1', '在线'),
('bob@example.com', '$2a$12$examplehash2', 'Bob', 'https://i.pravatar.cc/150?img=2', '忙碌'),
('carol@example.com', '$2a$12$examplehash3', 'Carol', 'https://i.pravatar.cc/150?img=3', '离开');

-- ================================
-- 插入群组
-- ================================
INSERT INTO `groups` (`name`, `owner_id`, `avatar_url`)
VALUES
('开发组', 1, 'https://i.pravatar.cc/150?img=4'),
('设计组', 2, 'https://i.pravatar.cc/150?img=5');

-- ================================
-- 插入群组成员
-- ================================
INSERT INTO `group_members` (`group_id`, `user_id`, `role`)
VALUES
(1, 1, 'owner'),
(1, 2, 'member'),
(1, 3, 'member'),
(2, 2, 'owner'),
(2, 3, 'member');

-- ================================
-- 插入私聊消息
-- ================================
INSERT INTO `messages` (`sender_id`, `receiver_id`, `content`, `type`)
VALUES
(1, 2, 'Hi Bob, 你今天有空吗？', 'text'),
(2, 1, 'Hi Alice, 我下午可以聊。', 'text');

-- ================================
-- 插入群聊消息
-- ================================
INSERT INTO `messages` (`sender_id`, `group_id`, `content`, `type`)
VALUES
(1, 1, '大家好，今天开始新的开发任务。', 'text'),
(2, 1, '收到，我会负责前端部分。', 'text'),
(3, 1, '我负责后端接口。', 'text'),
(2, 2, '设计组开会时间定了吗？', 'text'),
(3, 2, '下午三点可以吗？', 'text');

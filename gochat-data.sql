INSERT INTO users (email, password, nickname, avatar_url, status_message, settings)
VALUES
('alice@example.com', 'hashedpwd1', 'Alice', 'https://example.com/avatar1.png', '学习日语中', '{"allow_dm": true, "theme":"light"}'),
('bob@example.com', 'hashedpwd2', 'Bob', 'https://example.com/avatar2.png', '在忙', '{"allow_dm": true, "theme":"dark"}'),
('carol@example.com', 'hashedpwd3', 'Carol', 'https://example.com/avatar3.png', '', '{"allow_dm": false, "theme":"light"}');
INSERT INTO groups (name, description, created_by)
VALUES
('日语学习', '一起学习日语的群组', 1),
('游戏交流', '讨论各种游戏', 2);
INSERT INTO group_members (group_id, user_id, role)
VALUES
(1, 1, 'admin'),
(1, 2, 'member'),
(1, 3, 'member'),
(2, 2, 'admin'),
(2, 3, 'member');
INSERT INTO categories (group_id, name, position)
VALUES
(1, '新人专区', 1),
(1, '学习讨论', 2),
(2, '游戏话题', 1);
INSERT INTO channels (category_id, group_id, name, type, is_public, position)
VALUES
(1, 1, 'welcome-channel', 'text', 1, 1),
(1, 1, 'introductions', 'text', 1, 2),
(2, 1, 'grammar', 'text', 1, 1),
(2, 1, 'vocabulary', 'text', 1, 2),
(3, 2, 'general', 'text', 1, 1),
(3, 2, 'strategy', 'text', 1, 2);
INSERT INTO threads (channel_id, name, created_by)
VALUES
(2, '日语学习技巧分享', 1),
(3, '最新游戏攻略', 2);
INSERT INTO dm_channels (user1_id, user2_id)
VALUES
(1, 2),
(2, 3);
-- 群聊消息
INSERT INTO messages (channel_id, sender_id, content, type)
VALUES
(1, 1, '大家好，我是 Alice', 'text'),
(2, 2, '大家可以互相介绍一下', 'text'),
(3, 2, '新游戏上线了，大家来讨论', 'text');

-- 帖子消息
INSERT INTO messages (thread_id, sender_id, content, type)
VALUES
(1, 1, '我分享一下学习日语的经验', 'text'),
(2, 2, '这是我的游戏攻略总结', 'text');

-- 私聊消息
INSERT INTO messages (dm_channel_id, sender_id, content, type)
VALUES
(1, 1, 'Hi Bob，你最近在学什么？', 'text'),
(1, 2, 'Hi Alice，我在学日语语法', 'text'),
(2, 2, 'Hi Carol，周末有空玩吗？', 'text'),
(2, 3, 'Hi Bob，我可以的', 'text');

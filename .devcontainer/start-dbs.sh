#!/bin/bash

# -------------------------------
# 启动 MariaDB
# -------------------------------
echo "Starting MariaDB..."
service mariadb start

# 等待数据库完全启动
sleep 5

# 初始化数据库和用户
echo "Configuring MariaDB user and database..."
mysql -u root <<EOF
-- 删除旧用户（如果存在）
DROP USER IF EXISTS 'gocuser'@'%';
DROP USER IF EXISTS 'gocuser'@'localhost';

-- 创建用户，允许任意 host 连接
CREATE USER 'gocuser'@'%' IDENTIFIED BY '123456';

-- 创建数据库
CREATE DATABASE IF NOT EXISTS gochat;

-- 授权
GRANT ALL PRIVILEGES ON gochat.* TO 'gocuser'@'%';
FLUSH PRIVILEGES;
EOF

echo "MariaDB is ready."

# -------------------------------
# 启动 Redis
# -------------------------------
echo "Starting Redis..."
service redis-server start

# -------------------------------
# 保持容器运行
# -------------------------------
echo "Dev Container services are running. Keeping container alive..."
tail -f /dev/null

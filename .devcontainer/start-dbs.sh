#!/bin/bash
set -e

echo "===== Starting MariaDB ====="
service mariadb start
sleep 5  # 等待数据库完全启动

echo "===== Initializing Database and User ====="
mysql -u root <<EOF
CREATE DATABASE IF NOT EXISTS gochat;
CREATE USER IF NOT EXISTS 'gocuser'@'%' IDENTIFIED BY '123456';
GRANT ALL PRIVILEGES ON gochat.* TO 'gocuser'@'%';
FLUSH PRIVILEGES;
EOF

echo "===== Starting Redis ====="
service redis-server start
sleep 2

echo "===== Starting Backend (Go Gin) ====="
cd /workspaces/go-react-chat/backend
# 后台运行后端
nohup go run main.go > backend.log 2>&1 &

echo "===== Starting Frontend (Vite React) ====="
cd /workspaces/go-react-chat/frontend
# 后台运行前端
nohup npm run dev > frontend.log 2>&1 &

echo "===== All services started ====="
echo "Frontend: http://127.0.0.1:5173"
echo "Backend: http://127.0.0.1:8080"
echo "MariaDB: 127.0.0.1:3306 (gocuser / 123456)"
echo "Redis: 127.0.0.1:6379"

# 保持容器不退出
tail -f /dev/null

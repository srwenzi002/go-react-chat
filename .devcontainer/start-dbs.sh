#!/bin/bash

# 启动 MariaDB
service mariadb start

# 初始化数据库和用户
mysql -e "CREATE DATABASE IF NOT EXISTS gochat;"
mysql -e "CREATE USER IF NOT EXISTS 'gocuser'@'%' IDENTIFIED BY '123456';"
mysql -e "GRANT ALL PRIVILEGES ON gochat.* TO 'gocuser'@'%';"
mysql -e "FLUSH PRIVILEGES;"

# 启动 Redis
service redis-server start

# 保持容器不退出
tail -f /dev/null

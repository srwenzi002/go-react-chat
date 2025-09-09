# 基于 Node + TypeScript devcontainer
FROM mcr.microsoft.com/devcontainers/typescript-node:1-22-bookworm

# 安装 Go
# RUN curl -OL https://golang.org/dl/go1.21.3.linux-amd64.tar.gz \
#     && tar -C /usr/local -xzf go1.21.3.linux-amd64.tar.gz \
#     && rm go1.21.3.linux-amd64.tar.gz
# ENV PATH="/usr/local/go/bin:${PATH}"

# 安装 MariaDB 和 Redis
RUN apt-get update && apt-get install -y mariadb-server redis-server \
    && rm -rf /var/lib/apt/lists/*

# 复制启动数据库脚本
COPY start-dbs.sh /usr/local/bin/start-dbs.sh
RUN chmod +x /usr/local/bin/start-dbs.sh

# 默认启动数据库脚本
CMD ["bash", "/usr/local/bin/start-dbs.sh"]

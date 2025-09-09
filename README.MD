# GoReactChat

GoReactChat 是一个基于 Web 的即时通讯平台，支持用户注册、登录、私聊、群聊、查看在线状态等功能。用户界面参考 Discord，提供频道化管理和消息实时推送体验。

## 技术栈

### 后端
- Go
- Gin (Web框架)
- MariaDB (数据存储)
- Redis (缓存和实时消息)

### 前端
- React
- TypeScript
- Vite

## 主要功能

- ✅ 用户认证
  - 注册
  - 登录
  - 状态管理
- ✅ 即时通讯
  - 私聊
  - 群聊
  - 在线状态显示
- ✅ 频道管理
  - Discord 风格的界面
  - 实时消息推送
  - 频道分类管理

## 目录结构

```
.
├── backend/              # Go 后端服务
│   ├── controllers/     # 控制器层
│   ├── models/         # 数据模型
│   ├── routes/         # 路由配置
│   ├── services/       # 业务逻辑
│   └── utils/          # 工具函数
└── frontend/            # React 前端应用
    ├── src/            # 源代码
    ├── public/         # 静态资源
    └── ...             # 其他配置文件
```

## 开发环境

- Go 1.20+
- Node.js 18+
- MariaDB
- Redis 6.0+

## 本地开发

1. 克隆仓库
```bash
git clone https://github.com/srwenzi002/go-react-chat.git
cd go-react-chat
```

2. 启动服务（dev container远程vscode中）
```bash
cd .devcontainer/
chmod +x start-dbs.sh
./start-dbs.sh
```

5. 访问应用
- 前端开发服务器: http://localhost:5173
- 后端API服务: http://localhost:8080
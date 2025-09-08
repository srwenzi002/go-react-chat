package main

import (
    "github.com/gin-gonic/gin"
    "go-react-chat-backend/routes"
)

func main() {
    r := gin.Default()

    // 注册路由
    routes.RegisterRoutes(r)

    // 启动服务，监听 8080
    r.Run(":8080")
}

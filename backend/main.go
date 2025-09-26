package main

import (
	"go-react-chat-backend/middleware"
	"go-react-chat-backend/routes"
	"go-react-chat-backend/utils"
	"log"

	"github.com/gin-gonic/gin"
)

func main() {
	r := gin.Default()
	// 注册响应中间件
	r.Use(middleware.ResponseMiddleware())
	// 连接数据库
	if err := utils.ConnectDB(); err != nil {
		log.Fatalf("Database connection failed: %v", err)
	}
	utils.InitRedis()
	// 注册路由
	routes.RegisterRoutes(r)

	// 启动服务，监听 8080
	r.Run(":8080")
}

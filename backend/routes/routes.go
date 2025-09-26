package routes

import (
	"github.com/gin-gonic/gin"
	"go-react-chat-backend/handler"
)

func RegisterRoutes(r *gin.Engine) {
	// 测试接口
	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "pong"})
	})

	// 用户接口分组
	userGroup := r.Group("/users")
	{
		userGroup.POST("/register", handler.Register)
		userGroup.POST("/login", handler.Login)
	}
}

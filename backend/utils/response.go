package utils

import "github.com/gin-gonic/gin"

// 统一设置响应
func SetResponse(c *gin.Context, code int, msg string, data interface{}) {
	c.Set("code", code)
	c.Set("message", msg)
	if data != nil {
		c.Set("data", data)
	}
}

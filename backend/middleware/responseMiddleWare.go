package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func ResponseMiddleware() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()

		if c.Writer.Written() {
			return
		}

		code, _ := c.Get("code")
		msg, _ := c.Get("message")
		data, _ := c.Get("data")

		if code == nil {
			code = 0
		}
		if msg == nil {
			msg = "success"
		}

		c.JSON(http.StatusOK, gin.H{
			"code":    code,
			"message": msg,
			"data":    data,
		})
	}
}

package controllers

import (
    "github.com/gin-gonic/gin"
    "net/http"
)

// 注册接口（示例）
func Register(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message": "register endpoint"})
}

// 登录接口（示例）
func Login(c *gin.Context) {
    c.JSON(http.StatusOK, gin.H{"message": "login endpoint"})
}

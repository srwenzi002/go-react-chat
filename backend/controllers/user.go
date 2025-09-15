package controllers

import (
	"database/sql"
	"go-react-chat-backend/utils"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)

var jwtSecret = []byte("your_secret_key")

type User struct {
	ID        int       `json:"id"`
	Email     string    `json:"email"`
	Nickname  string    `json:"nickname"`
	AvatarURL string    `json:"avatar_url"`
	StatusMsg string    `json:"status_message"`
	Settings  string    `json:"settings"`
	CreatedAt time.Time `json:"created_at"`
	Password  string    `json:"-"`
}

type RegisterRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
	Nickname string `json:"nickname"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

// 注册接口（示例）
func Register(c *gin.Context) {
	var req RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "参数错误"})
		return
	}
	// 检查邮箱是否已注册
	var exists int
	err := utils.DB.QueryRow("SELECT COUNT(*) FROM users WHERE email = ?", req.Email).Scan(&exists)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "数据库错误"})
		return
	}
	if exists > 0 {
		c.JSON(http.StatusBadRequest, gin.H{"message": "邮箱已注册"})
		return
	}
	// 密码加密
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "密码加密失败"})
		return
	}
	// 插入用户
	res, err := utils.DB.Exec("INSERT INTO users (email, password, nickname, avatar_url, status_message, settings, created_at) VALUES (?, ?, ?, '', '', '{}', NOW())", req.Email, string(hashedPwd), req.Nickname)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "注册失败"})
		return
	}
	userID, _ := res.LastInsertId()
	c.JSON(http.StatusOK, gin.H{
		"id":             userID,
		"email":          req.Email,
		"nickname":       req.Nickname,
		"avatar_url":     "",
		"status_message": "",
		"settings":       map[string]interface{}{},
		"created_at":     time.Now().Format(time.RFC3339),
	})
}

// 登录接口（示例）
func Login(c *gin.Context) {
	var req LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"message": "参数错误"})
		return
	}
	// 查询用户
	var user User
	err := utils.DB.QueryRow("SELECT id, password, nickname FROM users WHERE email = ?", req.Email).Scan(&user.ID, &user.Password, &user.Nickname)
	if err == sql.ErrNoRows {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "账号或密码错误"})
		return
	} else if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "数据库错误"})
		return
	}
	// 校验密码
	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)) != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"message": "账号或密码错误"})
		return
	}
	// 生成 JWT token
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"user_id":  user.ID,
		"nickname": user.Nickname,
		"exp":      time.Now().Add(24 * time.Hour).Unix(),
	})
	tokenString, err := token.SignedString(jwtSecret)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Token生成失败"})
		return
	}

	// 存储token到Redis
	err = utils.StoreToken(user.ID, tokenString)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"message": "Token存储失败", "error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"token": tokenString,
		"user": gin.H{
			"id":       user.ID,
			"nickname": user.Nickname,
		},
	})
}

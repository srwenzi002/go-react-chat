package handler

import (
	"database/sql"
	"go-react-chat-backend/utils"
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
		utils.SetResponse(c, -1, "参数错误", nil)
		return
	}
	// 检查邮箱是否已注册
	var exists int
	err := utils.DB.QueryRow("SELECT COUNT(*) FROM users WHERE email = ?", req.Email).Scan(&exists)
	if err != nil {
		utils.SetResponse(c, -1, "数据库错误", nil)
		return
	}
	if exists > 0 {
		utils.SetResponse(c, -1, "邮箱已注册", nil)
		return
	}
	// 密码加密
	hashedPwd, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		utils.SetResponse(c, -1, "密码加密失败", nil)
		return
	}
	// 插入用户
	res, err := utils.DB.Exec("INSERT INTO users (email, password, nickname, avatar_url, status_message, settings, created_at) VALUES (?, ?, ?, '', '', '{}', NOW())", req.Email, string(hashedPwd), req.Nickname)
	if err != nil {
		utils.SetResponse(c, -1, "数据库错误", nil)
		return
	}
	userID, _ := res.LastInsertId()
	utils.SetResponse(c, 0, "注册成功", gin.H{
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
		utils.SetResponse(c, -1, "参数错误", nil)
		return
	}
	// 查询用户
	var user User
	err := utils.DB.QueryRow("SELECT id, password, nickname FROM users WHERE email = ?", req.Email).Scan(&user.ID, &user.Password, &user.Nickname)
	if err == sql.ErrNoRows {
		utils.SetResponse(c, -1, "账号或密码错误", nil)
		return
	} else if err != nil {
		utils.SetResponse(c, -1, "数据库错误", nil)
		return
	}
	// 校验密码
	if bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(req.Password)) != nil {
		utils.SetResponse(c, -1, "账号或密码错误", nil)
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
		utils.SetResponse(c, -1, "Token生成失败", nil)
		return
	}

	// 存储token到Redis
	err = utils.StoreToken(user.ID, tokenString)
	if err != nil {
		utils.SetResponse(c, -1, "存储Token失败", nil)
		return
	}
	utils.SetResponse(c, 0, "登录成功", gin.H{
		"token": tokenString,
		"user": gin.H{
			"id":       user.ID,
			"nickname": user.Nickname,
		},
	})
}

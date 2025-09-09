package utils

import (
	"database/sql"
	"fmt"
	_ "github.com/go-sql-driver/mysql"
)

var DB *sql.DB
func ConnectDB() error{
	dsn := "gocuser:123456@tcp(127.0.0.1:3306)/gochat?charset=utf8mb4&parseTime=True&loc=Local"
	db, err := sql.Open("mysql", dsn)
	 if err != nil {
        return fmt.Errorf("failed to open database: %v", err)
    }

    // 测试连接
    if err := db.Ping(); err != nil {
        return fmt.Errorf("failed to ping database: %v", err)
    }

    DB = db
    fmt.Println("✅ Database connected")
    return nil
}
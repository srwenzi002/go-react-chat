package utils

import (
	"context"
	"fmt"
	"github.com/redis/go-redis/v9"
	"time"
)

// Redis客户端实例
var rdb *redis.Client

func InitRedis() error {
	rdb = redis.NewClient(&redis.Options{
		Addr: "127.0.0.1:6379",
	})

	ctx := context.Background()
	pong, err := rdb.Ping(ctx).Result()
	if err != nil {
		return fmt.Errorf("redis connection failed: %v", err)
	}
	fmt.Println("✅ Redis connected:", pong)
	return nil
}

func StoreToken(userID int, token string) error {
	ctx := context.Background()
	key := fmt.Sprintf("user_token:%d", userID)
	expiration := 24 * time.Hour

	err := rdb.Set(ctx, key, token, expiration).Err()
	if err != nil {
		return fmt.Errorf("failed to store token: %v", err)
	}
	return nil
}

func GetToken(userID int) (string, error) {
	ctx := context.Background()
	key := fmt.Sprintf("user_token:%d", userID)

	token, err := rdb.Get(ctx, key).Result()
	if err == redis.Nil {
		return "", fmt.Errorf("token not found")
	} else if err != nil {
		return "", fmt.Errorf("failed to get token: %v", err)
	}
	return token, nil
}

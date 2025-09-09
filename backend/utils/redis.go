package utils

import (
    "fmt"
    "github.com/redis/go-redis/v9"
    "context"
)

func TestRedis() {
    ctx := context.Background()
    rdb := redis.NewClient(&redis.Options{
        Addr: "127.0.0.1:6379",
    })

    pong, err := rdb.Ping(ctx).Result()
    if err != nil {
        fmt.Println("Redis connection failed:", err)
        return
    }
    fmt.Println("✅ Redis connected:", pong)
}

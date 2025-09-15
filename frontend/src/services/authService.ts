// AuthService 用于处理认证相关功能，包括token管理
import requestApi from '../utils/requestApi';

class AuthService {
    // 从localStorage获取token
    static getToken(): string | null {
        return localStorage.getItem('token');
    }

    // 将token存储到localStorage
    static setToken(token: string): void {
        localStorage.setItem('token', token);
    }

    // 清除token
    static clearToken(): void {
        localStorage.removeItem('token');
    }

    // 验证token是否有效
    static async verifyToken(): Promise<boolean> {
        const token = this.getToken();
        if (!token) return false;

        try {
            // 使用requestApi发送验证请求
            const response = await requestApi('/api/verify-token', {
                method: 'POST'
            });
            return response.valid;
        } catch (error) {
            console.error('Token verification failed:', error);
            this.clearToken();
            return false;
        }
    }

    static setUser(user: { id: number; nickname: string }) {
        localStorage.setItem('user', JSON.stringify(user));
    }

    static getUser() {
        return JSON.parse(localStorage.getItem('user') || '{}');
    }

    static clearUser() {
        localStorage.removeItem('user');
    }
}

export default AuthService;
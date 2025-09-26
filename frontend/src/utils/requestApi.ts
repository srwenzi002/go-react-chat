// 请求工具，用于封装token和错误处理
import AuthService from '../services/authService';
import { toaster } from '../components/ui/toaster';

const requestApi = async (url: string, options: RequestInit = {}) => {
  // 从AuthService获取token
  const token = AuthService.getToken();

  // 设置请求头
  const headers = new Headers(options.headers || {});

  if (token && url !== '/api/users/login' && url !== '/api/users/register' && url !== '/api/users/logout') {
    headers.append('Authorization', `Bearer ${token}`);
  }
  if (options.method && options.method !== 'GET' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  try {
    const response = await fetch(url, { ...options, headers });

    // 检查响应状态
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || '请求失败');
    }
    const data = await response.json();
    console.log('Response:', data); 

    if (data.code !== 0) {
      throw new Error(data.message || '请求失败');
    }

    return data.data; 
  } catch (error) {
    toaster.error({ title: '请求错误', description: (error as Error).message || '网络错误' });
    throw error;
  }
};

export default requestApi;
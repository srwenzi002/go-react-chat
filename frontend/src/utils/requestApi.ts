// 请求工具，用于封装token和错误处理
import AuthService from '../services/authService';
import { toaster } from '../components/ui/toaster';

const requestApi = async (url: string, options: RequestInit = {}) => {
  // 从AuthService获取token
  const token = AuthService.getToken();

  // 如果是GET请求，将token添加到headers
  const headers = new Headers(options.headers || {});

  if (token) {
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

    return data; 
  } catch (error) {
    toaster.error({ title: '请求错误', description: (error as Error).message || '网络错误' });
    throw error;
  }
};

export default requestApi;
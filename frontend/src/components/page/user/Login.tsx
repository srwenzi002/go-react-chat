import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button ,Input, Heading, Text } from '@chakra-ui/react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/');
      } else {
        setError(data.message || '登录失败');
      }
    } catch {
      setError('网络错误');
    }
  };

  return (
    <Box className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <Box as="form" onSubmit={handleSubmit} bg="white" p={8} rounded="xl" shadow="lg" w="full" maxW="md">
        <Heading as="h2" size="lg" mb={6} textAlign="center">登录</Heading>
        {error && <Text mb={4} color="red.600" textAlign="center">{error}</Text>}
        <Input
          type="email"
          placeholder="邮箱"
          value={email}
          onChange={e => setEmail(e.target.value)}
          mb={4}
          size="lg"
          required
        />
        <Input
          type="password"
          placeholder="密码"
          value={password}
          onChange={e => setPassword(e.target.value)}
          mb={6}
          size="lg"
          required
        />
        <Button type="submit" colorScheme="blue" w="full" size="lg" mb={2}>登录</Button>
        <Box mt={4} textAlign="center">
          <span>没有账号？</span>
          <Button variant="ghost" colorScheme="blue" ml={2} onClick={() => navigate('/register')}>注册</Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;

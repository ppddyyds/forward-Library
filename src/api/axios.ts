import axios from 'axios';
import { ElMessage } from 'element-plus';

const service = axios.create({
  baseURL: 'http://localhost:8080/api',
  timeout: 10000
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

service.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      ElMessage.error('登录已过期，请重新登录');
      window.location.href = '/login';
    } else {
      ElMessage.error(error.response?.data?.message || '请求失败，请稍后重试');
    }
    return Promise.reject(error);
  }
);

export default service;

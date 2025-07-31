import { backendHostURL } from '@/services/api';
import { getCurrentAccessToken } from '@/utils/cookie/CookiesInfo';
import axios, { AxiosInstance } from 'axios';

// 1. Create axios instance
export const apiURL: AxiosInstance = axios.create({
  baseURL: backendHostURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 2. Attach token on every request
apiURL.interceptors.request.use((config) => {
  const token = getCurrentAccessToken();
  if (token) {
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

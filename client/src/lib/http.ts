import { backendHostURL } from '@/services/api';
import { getCurrentAccessToken } from '@/utils/cookie/CookiesInfo';
import axios, { AxiosInstance } from 'axios';
import * as Sentry from '@sentry/react';

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

// 3. Improved API error visibility & Safe payloads
apiURL.interceptors.response.use(
  (response) => response,
  (error) => {
    Sentry.captureException(error, (scope) => {
      scope.setTag('type', 'api_error');

      // Helper to sanitize sensitive fields
      const sanitize = (data: any) => {
        if (!data) return null;
        try {
          // specific check if data is string (common in requests)
          let obj = data;
          if (typeof data === 'string') {
            try {
              obj = JSON.parse(data);
            } catch {
              return '[Raw String]';
            }
          }
          if (typeof obj !== 'object') return obj;

          const cleanObj = JSON.parse(JSON.stringify(obj));
          const sensitive = [
            'password',
            'token',
            'secret',
            'credential',
            'auth',
          ];

          const mask = (o: any) => {
            for (const key in o) {
              if (sensitive.some((s) => key.toLowerCase().includes(s))) {
                o[key] = '[FILTERED]';
              } else if (typeof o[key] === 'object' && o[key] !== null) {
                mask(o[key]);
              }
            }
          };

          mask(cleanObj);
          return cleanObj;
        } catch {
          return '[Data Sanitization Failed]';
        }
      };

      if (error.config) {
        scope.setContext('request', {
          url: error.config.url,
          method: error.config.method?.toUpperCase(),
          data: sanitize(error.config.data),
        });
      }

      if (error.response) {
        scope.setContext('response', {
          status: error.response.status,
          statusText: error.response.statusText,
          data: sanitize(error.response.data),
        });
      }

      return scope;
    });

    return Promise.reject(error);
  }
);

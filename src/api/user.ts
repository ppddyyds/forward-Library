import http from './http';
import type { LoginPayload, LoginResponse } from '@/types';

export const loginApi = (payload: LoginPayload) =>
  http.post<LoginResponse>('/auth/login', payload);

import service from './axios';

export interface LoginPayload {
  username: string;
  password: string;
}

export interface RegisterPayload {
  username: string;
  password: string;
  nickname: string;
}

export const loginApi = (payload: LoginPayload) => service.post('/auth/login', payload);
export const registerApi = (payload: RegisterPayload) => service.post('/auth/register', payload);

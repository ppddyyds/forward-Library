import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { loginApi } from '@/api/user';

export const useAuthStore = defineStore('auth', () => {
  const token = ref(localStorage.getItem('token') ?? '');
  const userName = ref(localStorage.getItem('userName') ?? '');

  const isLoggedIn = computed(() => Boolean(token.value));

  const setAuth = (newToken: string, name: string) => {
    token.value = newToken;
    userName.value = name;
    localStorage.setItem('token', newToken);
    localStorage.setItem('userName', name);
  };

  const logout = () => {
    token.value = '';
    userName.value = '';
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
  };

  const login = async (username: string, password: string) => {
    const { data } = await loginApi({ username, password });
    setAuth(data.token, data.userName ?? username);
  };

  return {
    token,
    userName,
    isLoggedIn,
    login,
    logout
  };
});

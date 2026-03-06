import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { loginApi, type LoginPayload } from '@/api/auth';

interface UserInfo {
  username?: string;
  nickname?: string;
}

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '');
  const userInfo = ref<UserInfo>(JSON.parse(localStorage.getItem('userInfo') || '{}'));

  const isLogin = computed(() => Boolean(token.value));

  const setUserState = (newToken: string, info: UserInfo) => {
    token.value = newToken;
    userInfo.value = info;
    localStorage.setItem('token', newToken);
    localStorage.setItem('userInfo', JSON.stringify(info));
  };

  const login = async (payload: LoginPayload) => {
    const { data } = await loginApi(payload);
    setUserState(data.token, data.userInfo || { username: payload.username, nickname: payload.username });
  };

  const logout = () => {
    token.value = '';
    userInfo.value = {};
    localStorage.removeItem('token');
    localStorage.removeItem('userInfo');
  };

  return {
    token,
    userInfo,
    isLogin,
    login,
    logout
  };
});

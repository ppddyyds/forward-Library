<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <h2>注册</h2>
      <el-form :model="form" label-position="top" @submit.prevent>
        <el-form-item label="昵称">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>
        <el-form-item label="用户名">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-button type="primary" class="full" :loading="loading" @click="handleRegister">注册</el-button>
        <el-button link class="full" @click="$router.push('/login')">已有账号？去登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRouter } from 'vue-router';
import { registerApi } from '@/api/auth';

const router = useRouter();
const loading = ref(false);

const form = reactive({
  nickname: '',
  username: '',
  password: ''
});

const handleRegister = async () => {
  if (!form.nickname || !form.username || !form.password) {
    ElMessage.warning('请完整填写注册信息');
    return;
  }

  loading.value = true;
  try {
    await registerApi(form);
    ElMessage.success('注册成功，请登录');
    router.push('/login');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.auth-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(120deg, #dbeafe, #eff6ff);
}
.auth-card {
  width: 420px;
}
.full {
  width: 100%;
}
</style>

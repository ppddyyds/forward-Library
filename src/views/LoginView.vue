<template>
  <div class="login-page">
    <el-card class="login-card">
      <template #header>
        <div class="title">智慧图书馆登录</div>
      </template>
      <el-form ref="formRef" :model="form" :rules="rules" label-position="top" @submit.prevent>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" show-password placeholder="请输入密码" />
        </el-form-item>
        <el-button type="primary" :loading="loading" class="full" @click="handleLogin">登录</el-button>
      </el-form>
      <p class="tips">演示账号可由后端自行配置。</p>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from 'vue-router';
import { ElMessage, type FormInstance, type FormRules } from 'element-plus';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const authStore = useAuthStore();
const loading = ref(false);
const formRef = ref<FormInstance>();

const form = reactive({
  username: '',
  password: ''
});

const rules: FormRules<typeof form> = {
  username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
};

const handleLogin = async () => {
  if (!formRef.value) return;
  const valid = await formRef.value.validate().catch(() => false);
  if (!valid) return;

  loading.value = true;
  try {
    await authStore.login(form.username, form.password);
    ElMessage.success('登录成功');
    router.push('/books');
  } catch (error: any) {
    const status = error.response?.status;
    if (status === 403) {
      ElMessage.error('账号或密码错误');
    } else {
      ElMessage.error(error.response?.data?.message ?? '登录失败，请稍后重试');
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e0ecff, #f4f7fb);
}

.login-card {
  width: 420px;
}

.title {
  text-align: center;
  font-size: 20px;
  font-weight: 700;
}

.full {
  width: 100%;
}

.tips {
  margin-top: 12px;
  color: #909399;
  font-size: 12px;
}
</style>

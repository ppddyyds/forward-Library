<template>
  <div class="layout">
    <el-container>
      <el-aside width="220px" class="aside">
        <div class="logo">智慧图书馆</div>
        <el-menu :default-active="activeMenu" router>
          <el-menu-item index="/books">图书列表</el-menu-item>
          <el-menu-item index="/recommend">热门推荐</el-menu-item>
          <el-menu-item index="/ai">AI 问答</el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header class="header">
          <span>欢迎，{{ authStore.userName || '读者' }}</span>
          <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const activeMenu = computed(() => route.path);

const handleLogout = () => {
  authStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.layout,
.el-container {
  min-height: 100vh;
}

.aside {
  background: #001529;
}

.logo {
  color: #fff;
  text-align: center;
  font-size: 18px;
  font-weight: 700;
  padding: 20px 0;
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  border-bottom: 1px solid #eee;
}
</style>

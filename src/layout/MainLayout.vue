<template>
  <el-container class="main-layout">
    <el-aside width="220px" class="aside">
      <div class="logo">智慧图书馆</div>
      <el-menu router :default-active="route.path">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/books">图书搜索</el-menu-item>
        <el-menu-item index="/recommend">个性化推荐</el-menu-item>
        <el-menu-item index="/ai">AI问答</el-menu-item>
        <el-menu-item index="/profile">用户画像</el-menu-item>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header class="header">
        <span>欢迎你，{{ displayName }}</span>
        <el-button type="danger" plain @click="handleLogout">退出登录</el-button>
      </el-header>
      <el-main class="content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUserStore } from '@/store/user';

const route = useRoute();
const router = useRouter();
const userStore = useUserStore();

const displayName = computed(
  () => userStore.userInfo?.nickname || userStore.userInfo?.username || '读者'
);

const handleLogout = () => {
  userStore.logout();
  router.push('/login');
};
</script>

<style scoped>
.main-layout,
.el-container {
  min-height: 100vh;
}
.aside {
  background: #001529;
}
.logo {
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 700;
  padding: 20px 0;
}
.header {
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.content {
  background: #f5f7fa;
}
</style>

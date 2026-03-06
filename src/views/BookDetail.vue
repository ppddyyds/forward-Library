<template>
  <el-card v-loading="loading">
    <template #header>
      <div>图书详情</div>
    </template>

    <template v-if="detail">
      <h2>{{ detail.title }}</h2>
      <p>作者：{{ detail.author }}</p>
      <p>分类：{{ detail.category }}</p>
      <p>借阅次数：{{ detail.borrowCount }}</p>
      <p>描述：{{ detail.description || detail.summary || '暂无描述' }}</p>
      <el-button type="primary" @click="handleBorrow">借阅图书</el-button>
    </template>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { ElMessage } from 'element-plus';
import { useRoute } from 'vue-router';
import { borrowBookApi, getBookDetailApi } from '@/api/book';

const route = useRoute();
const loading = ref(false);
const detail = ref<any>(null);

const loadDetail = async () => {
  loading.value = true;
  try {
    const { data } = await getBookDetailApi(route.params.id as string);
    detail.value = data;
  } finally {
    loading.value = false;
  }
};

const handleBorrow = async () => {
  await borrowBookApi(route.params.id as string);
  ElMessage.success('借阅成功');
  loadDetail();
};

onMounted(loadDetail);
</script>

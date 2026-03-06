<template>
  <el-card>
    <template #header>
      <div>热门推荐</div>
    </template>

    <el-row :gutter="16" v-loading="loading">
      <el-col :span="8" v-for="item in recommendations" :key="item.id" class="card-col">
        <el-card shadow="hover">
          <h3>{{ item.title }}</h3>
          <p class="reason">推荐理由：{{ item.reason }}</p>
          <el-tag type="danger">热度 {{ item.heat }}</el-tag>
        </el-card>
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getRecommendationsApi } from '@/api/library';
import type { Recommendation } from '@/types';

const loading = ref(false);
const recommendations = ref<Recommendation[]>([]);

const loadRecommendations = async () => {
  loading.value = true;
  try {
    const { data } = await getRecommendationsApi();
    recommendations.value = data;
  } finally {
    loading.value = false;
  }
};

onMounted(loadRecommendations);
</script>

<style scoped>
.card-col {
  margin-bottom: 16px;
}

.reason {
  min-height: 52px;
  color: #606266;
}
</style>

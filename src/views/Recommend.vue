<template>
  <el-card>
    <template #header>
      <div>个性化推荐</div>
    </template>
    <el-row :gutter="16" v-loading="loading">
      <el-col :span="8" v-for="item in list" :key="item.id" class="mb16">
        <BookCard :book="item" />
      </el-col>
    </el-row>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import BookCard from '@/components/BookCard.vue';
import { getPersonalRecommendationApi } from '@/api/recommend';

const loading = ref(false);
const list = ref<any[]>([]);

const loadData = async () => {
  loading.value = true;
  try {
    const { data } = await getPersonalRecommendationApi();
    list.value = data;
  } finally {
    loading.value = false;
  }
};

onMounted(loadData);
</script>

<style scoped>
.mb16 {
  margin-bottom: 16px;
}
</style>

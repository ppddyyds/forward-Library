<template>
  <el-card>
    <template #header>
      <div class="toolbar">
        <span>图书列表</span>
        <div class="search-box">
          <el-input v-model="keyword" clearable placeholder="按书名 / 作者搜索" @keyup.enter="loadBooks">
            <template #append>
              <el-button @click="loadBooks">搜索</el-button>
            </template>
          </el-input>
        </div>
      </div>
    </template>

    <el-table :data="books" v-loading="loading" stripe>
      <el-table-column prop="title" label="书名" min-width="180" />
      <el-table-column prop="author" label="作者" min-width="120" />
      <el-table-column prop="category" label="分类" width="120" />
      <el-table-column prop="score" label="评分" width="90" />
      <el-table-column prop="publishDate" label="出版日期" width="130" />
      <el-table-column prop="summary" label="简介" min-width="280" show-overflow-tooltip />
    </el-table>
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { getBooksApi } from '@/api/library';
import type { Book } from '@/types';

const loading = ref(false);
const keyword = ref('');
const books = ref<Book[]>([]);

const loadBooks = async () => {
  loading.value = true;
  try {
    const { data } = await getBooksApi(keyword.value.trim() || undefined);
    books.value = data;
  } finally {
    loading.value = false;
  }
};

onMounted(loadBooks);
</script>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}

.search-box {
  width: 340px;
}
</style>

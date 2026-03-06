<template>
  <el-card shadow="hover" class="book-card">
    <div class="cover-wrap">
      <img :src="book.cover || fallback" alt="封面" class="cover" />
    </div>
    <h4>{{ book.title }}</h4>
    <p>作者：{{ book.author }}</p>
    <p>分类：{{ book.category }}</p>
    <el-button type="primary" link @click="$router.push(`/book/${book.id}`)">查看详情</el-button>
  </el-card>
</template>

<script setup lang="ts">
defineProps<{ book: Record<string, any> }>();

const fallback = 'https://via.placeholder.com/240x320?text=Book';
</script>

<style scoped>
.book-card {
  height: 100%;
}
.cover-wrap {
  text-align: center;
}
.cover {
  width: 120px;
  height: 160px;
  object-fit: cover;
}
</style>

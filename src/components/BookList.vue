<template>
  <el-table :data="books" stripe>
    <el-table-column prop="title" label="书名" min-width="180" />
    <el-table-column prop="author" label="作者" min-width="120" />
    <el-table-column prop="category" label="分类" width="120" />
    <el-table-column prop="borrowCount" label="借阅次数" width="100" />
    <el-table-column label="操作" width="120">
      <template #default="scope">
        <el-button link type="primary" @click="$router.push(`/book/${scope.row.id}`)">详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
defineProps<{ books: Record<string, any>[] }>();
</script>

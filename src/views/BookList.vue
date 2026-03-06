<template>
  <el-card>
    <template #header>
      <div class="header-row">
        <span>图书搜索</span>
        <SearchBar :keyword="keyword" @search="onSearch" />
      </div>
    </template>
    <BookListComp :books="books" />
  </el-card>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import SearchBar from '@/components/SearchBar.vue';
import BookListComp from '@/components/BookList.vue';
import { getBooksApi } from '@/api/book';

const keyword = ref('');
const books = ref<any[]>([]);

const loadBooks = async () => {
  const { data } = await getBooksApi(keyword.value || undefined);
  books.value = data;
};

const onSearch = (val: string) => {
  keyword.value = val;
  loadBooks();
};

onMounted(loadBooks);
</script>

<style scoped>
.header-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

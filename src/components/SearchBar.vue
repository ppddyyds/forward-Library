<template>
  <div class="search-bar">
    <el-input
      v-model="innerKeyword"
      clearable
      placeholder="请输入书名或作者"
      @keyup.enter="emitSearch"
    >
      <template #append>
        <el-button @click="emitSearch">搜索</el-button>
      </template>
    </el-input>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{ keyword?: string }>();
const emit = defineEmits<{ (e: 'search', keyword: string): void }>();

const innerKeyword = ref(props.keyword || '');

watch(
  () => props.keyword,
  (val) => {
    innerKeyword.value = val || '';
  }
);

const emitSearch = () => emit('search', innerKeyword.value.trim());
</script>

<style scoped>
.search-bar {
  width: 360px;
}
</style>

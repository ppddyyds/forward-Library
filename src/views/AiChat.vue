<template>
  <el-card>
    <template #header>
      <div>AI问答助手</div>
    </template>
    <ChatBox :messages="messages" />
    <div class="input-row">
      <el-input v-model="question" placeholder="输入你的问题..." @keyup.enter="sendQuestion" />
      <el-button type="primary" :loading="loading" @click="sendQuestion">发送</el-button>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { askAiApi } from '@/api/ai';
import ChatBox from '@/components/ChatBox.vue';

const question = ref('');
const loading = ref(false);
const messages = ref<{ role: 'user' | 'ai'; content: string }[]>([]);

const sendQuestion = async () => {
  const q = question.value.trim();
  if (!q) {
    ElMessage.warning('请输入问题');
    return;
  }

  messages.value.push({ role: 'user', content: q });
  question.value = '';
  loading.value = true;
  try {
    const { data } = await askAiApi(q);
    messages.value.push({ role: 'ai', content: data.answer || '暂无回答' });
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.input-row {
  margin-top: 16px;
  display: grid;
  grid-template-columns: 1fr 88px;
  gap: 12px;
}
</style>

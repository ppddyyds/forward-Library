<template>
  <el-card>
    <template #header>
      <div>AI 问答助手</div>
    </template>

    <el-form @submit.prevent>
      <el-form-item>
        <el-input
          v-model="question"
          type="textarea"
          :rows="4"
          maxlength="500"
          show-word-limit
          placeholder="请输入你想咨询的图书相关问题..."
        />
      </el-form-item>
      <el-button type="primary" :loading="loading" @click="handleAsk">发送问题</el-button>
    </el-form>

    <el-divider />

    <div class="answer">
      <h4>AI 回复</h4>
      <el-empty v-if="!answer" description="暂无回复" />
      <el-alert v-else :title="answer" type="success" :closable="false" show-icon />
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { askAiApi } from '@/api/library';

const question = ref('');
const answer = ref('');
const loading = ref(false);

const handleAsk = async () => {
  if (!question.value.trim()) {
    ElMessage.warning('请输入问题后再发送');
    return;
  }

  loading.value = true;
  try {
    const { data } = await askAiApi({ question: question.value.trim() });
    answer.value = data.answer;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.answer h4 {
  margin: 0 0 12px;
}
</style>

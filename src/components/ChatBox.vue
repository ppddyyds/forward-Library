<template>
  <div class="chat-box" ref="boxRef">
    <div v-for="(item, index) in messages" :key="index" :class="['msg', item.role]">
      <div class="bubble">{{ item.content }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref, watch } from 'vue';

const props = defineProps<{ messages: { role: 'user' | 'ai'; content: string }[] }>();
const boxRef = ref<HTMLElement | null>(null);

watch(
  () => props.messages.length,
  async () => {
    await nextTick();
    if (boxRef.value) {
      boxRef.value.scrollTop = boxRef.value.scrollHeight;
    }
  }
);
</script>

<style scoped>
.chat-box {
  height: 420px;
  overflow-y: auto;
  background: #f5f7fa;
  border: 1px solid #ebeef5;
  border-radius: 8px;
  padding: 16px;
}
.msg {
  display: flex;
  margin-bottom: 12px;
}
.msg.user {
  justify-content: flex-end;
}
.msg.ai {
  justify-content: flex-start;
}
.bubble {
  max-width: 70%;
  padding: 10px 14px;
  border-radius: 8px;
  line-height: 1.5;
}
.user .bubble {
  background: #409eff;
  color: #fff;
}
.ai .bubble {
  background: #fff;
  border: 1px solid #dcdfe6;
}
</style>

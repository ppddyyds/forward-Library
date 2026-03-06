<template>
  <div class="profile-page" v-loading="loading">
    <el-card>
      <template #header>
        <div class="title">用户画像</div>
      </template>

      <el-row :gutter="16" class="mb16">
        <el-col :xs="24" :sm="12" :md="6">
          <el-statistic title="已读书籍" :value="profile?.persona?.totalBooksRead || 0" />
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <el-statistic title="累计借阅" :value="profile?.persona?.totalBorrows || 0" />
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <el-statistic title="用户角色" :value="profile?.role || '-'" />
        </el-col>
        <el-col :xs="24" :sm="12" :md="6">
          <el-statistic title="注册时间" :value="formatDate(profile?.createdAt)" />
        </el-col>
      </el-row>

      <el-card shadow="never" class="mb16">
        <template #header>
          <div class="sub-title">阅读偏好标签</div>
        </template>
        <div class="tag-wrap">
          <el-tag v-for="tag in profile?.persona?.readingTags || []" :key="tag" class="tag-item" effect="dark" type="success">
            {{ tag }}
          </el-tag>
          <el-empty v-if="!(profile?.persona?.readingTags || []).length" description="暂无标签数据" :image-size="80" />
        </div>
      </el-card>

      <el-row :gutter="16" class="mb16">
        <el-col :xs="24" :lg="12">
          <el-card shadow="never">
            <template #header>
              <div class="sub-title">兴趣分类分布（topCategories）</div>
            </template>
            <div ref="categoryChartRef" class="chart"></div>
          </el-card>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-card shadow="never">
            <template #header>
              <div class="sub-title">行为分布（behaviorDistribution）</div>
            </template>
            <div ref="behaviorChartRef" class="chart"></div>
          </el-card>
        </el-col>
      </el-row>

      <el-card shadow="never" class="mb16">
        <template #header>
          <div class="sub-title">人格画像</div>
        </template>
        <el-descriptions :column="1" border>
          <el-descriptions-item label="人格类型">
            {{ profile?.persona?.personalityType || '-' }}
          </el-descriptions-item>
          <el-descriptions-item label="人格描述">
            {{ profile?.persona?.personalityDescription || '-' }}
          </el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card shadow="never">
        <template #header>
          <div class="sub-title">最近阅读记录</div>
        </template>
        <el-table :data="profile?.persona?.recentBooks || []" stripe>
          <el-table-column prop="title" label="书名" min-width="180" />
          <el-table-column prop="author" label="作者" min-width="120" />
          <el-table-column prop="category" label="分类" width="120" />
          <el-table-column label="阅读时间" min-width="180">
            <template #default="scope">
              {{ formatDate(scope.row.readAt) }}
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { getUserProfileApi, type UserProfileResponse } from '@/api/user';

const loading = ref(false);
const profile = ref<UserProfileResponse | null>(null);
const categoryChartRef = ref<HTMLElement | null>(null);
const behaviorChartRef = ref<HTMLElement | null>(null);
let categoryChart: echarts.ECharts | null = null;
let behaviorChart: echarts.ECharts | null = null;

const formatDate = (date?: string) => {
  if (!date) return '-';
  return new Date(date).toLocaleString();
};

const renderCategoryChart = () => {
  const source = (profile.value?.persona?.topCategories || []).map((item) => ({
    name: item.category,
    value: item.score
  }));

  if (categoryChartRef.value) {
    categoryChart?.dispose();
    categoryChart = echarts.init(categoryChartRef.value);
    categoryChart.setOption({
      tooltip: { trigger: 'item' },
      legend: { bottom: 0 },
      series: [
        {
          name: '兴趣分类分布',
          type: 'pie',
          radius: ['40%', '70%'],
          data: source
        }
      ]
    });
  }
};

const renderBehaviorChart = () => {
  const behaviorDistribution = profile.value?.persona?.behaviorDistribution || {};
  const categories = Object.keys(behaviorDistribution);
  const values = Object.values(behaviorDistribution);

  if (behaviorChartRef.value) {
    behaviorChart?.dispose();
    behaviorChart = echarts.init(behaviorChartRef.value);
    behaviorChart.setOption({
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: categories
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'bar',
          data: values,
          itemStyle: {
            color: '#409EFF'
          }
        }
      ]
    });
  }
};

const loadProfile = async () => {
  loading.value = true;
  try {
    const { data } = await getUserProfileApi();
    profile.value = data;
    await nextTick();
    renderCategoryChart();
    renderBehaviorChart();
  } finally {
    loading.value = false;
  }
};

onMounted(loadProfile);

onBeforeUnmount(() => {
  categoryChart?.dispose();
  behaviorChart?.dispose();
});
</script>

<style scoped>
.profile-page {
  width: 100%;
}

.title,
.sub-title {
  font-weight: 600;
}

.mb16 {
  margin-bottom: 16px;
}

.tag-wrap {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  min-height: 40px;
}

.tag-item {
  border-radius: 16px;
}

.chart {
  width: 100%;
  height: 360px;
}
</style>

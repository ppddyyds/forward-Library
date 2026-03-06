<template>
  <el-card>
    <template #header>
      <div>用户画像</div>
    </template>
    <div ref="chartRef" class="chart"></div>
  </el-card>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue';
import * as echarts from 'echarts';
import { getUserProfileApi } from '@/api/user';

const chartRef = ref<HTMLElement | null>(null);
let chartInstance: echarts.ECharts | null = null;

const renderChart = async () => {
  const { data } = await getUserProfileApi();
  const categories = data.categories || {};
  const source = Object.entries(categories).map(([name, value]) => ({ name, value }));

  if (chartRef.value) {
    chartInstance = echarts.init(chartRef.value);
    chartInstance.setOption({
      tooltip: {
        trigger: 'item'
      },
      legend: {
        bottom: 0
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          data: source,
          emphasis: {
            itemStyle: {
              shadowBlur: 8,
              shadowOffsetX: 0
            }
          }
        }
      ]
    });
  }
};

onMounted(renderChart);

onBeforeUnmount(() => {
  chartInstance?.dispose();
});
</script>

<style scoped>
.chart {
  width: 100%;
  height: 420px;
}
</style>

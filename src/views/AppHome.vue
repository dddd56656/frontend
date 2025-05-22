<template>
  <!--
    AppHome 组件 —— 首页内容区
    1. 欢迎区：显示当前用户信息与典型操作按钮
    2. 典型按钮示例：演示EP主按钮/默认/危险等
    3. Table样例：可直接扩展为业务表格
    4. 所有内容布局留有扩展空间，便于后续嵌入图表/分析/卡片等
  -->
  <div class="home-box">
    <!-- 欢迎栏及右侧操作按钮 -->
    <el-row :gutter="24" class="mb-4">
      <el-col :span="12">
        <h2>欢迎，{{ userStore.displayName }}！</h2>
      </el-col>
      <el-col :span="12" style="text-align: right;">
        <el-button type="primary" @click="refreshUser">刷新用户信息</el-button>
        <el-button type="success" @click="addChart" class="ml-2">显示图表</el-button>
      </el-col>
    </el-row>

    <!-- 典型按钮示例区 -->
    <el-card class="mb-4">
      <h3>典型按钮示例</h3>
      <el-button type="primary" class="mr-2">主要按钮</el-button>
      <el-button>默认按钮</el-button>
      <el-button type="danger" class="ml-2">危险按钮</el-button>
    </el-card>

    <!-- Table 样例区 -->
    <el-card>
      <h3>Table 样例</h3>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180" />
        <el-table-column prop="name" label="姓名" width="180" />
        <el-table-column prop="address" label="地址" />
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
/**
 * AppHome.vue
 * - 首页内容区/仪表盘
 * - 展示典型按钮、表格，预留后续扩展入口
 * - 与用户Pinia状态联动（如用户信息刷新）
 * - 兼容新Store结构，业务store全部按modules分文件
 */
import { ref } from 'vue'
import { useUserStore } from '@/store/modules/user' // 新结构的用户Store

const userStore = useUserStore()

/**
 * 刷新用户信息
 * 调用store action（一般实际会发起API请求）
 */
const refreshUser = () => userStore.fetchUser()

/**
 * 显示图表
 * 实际项目可弹窗/跳转或渲染图表组件
 */
const addChart = () => {
  // TODO: 集成图表组件（如ECharts）
}

// 表格数据样例，可直接扩展为API动态获取
const tableData = ref([
  { date: '2023-05-22', name: '张三', address: '上海市普陀区金沙江路' },
  { date: '2023-05-21', name: '李四', address: '北京市海淀区西二旗' },
  { date: '2023-05-20', name: '王五', address: '广州市天河区体育西路' }
])
</script>

<style scoped>
.home-box {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}
.mb-4 {
  margin-bottom: 24px;
}
.ml-2 {
  margin-left: 8px;
}
.mr-2 {
  margin-right: 8px;
}
</style>

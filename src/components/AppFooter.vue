<!-- components/AppFooter.vue -->
<template>
  <!-- 全局底部栏 -->
  <footer class="app-footer">
    <span>Copyright © 2025 Your Company. All rights reserved.</span>
    <span class="version">v1.0.0</span>
  </footer>
</template>

<script setup lang="ts">
// 保持纯展示组件，无业务逻辑
</script>

<style scoped>
.app-footer {
  height: 48px;
  background: #f5f6fa;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  color: #888;
  font-size: 14px;
  border-top: 1px solid #e5e5e5;
}
.version {
  font-size: 12px;
  color: #bbb;
}
</style>

<template>
  <!-- 主应用外壳，包含头部、侧边栏、主内容和全局通知等 -->
  <div class="main-layout">
    <!-- 头部导航栏（可插槽自定义） -->
    <AppHeader />
    <div class="layout-body">
      <!-- 侧边栏（如有权限菜单） -->
      <AppSidebar />
      <!-- 主内容区：用slot注入实际页面内容 -->
      <main class="main-content">
        <slot />
      </main>
    </div>
    <!-- 全局底部 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// 引用复用组件
import AppHeader from '@/components/AppHeader.vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
.main-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f5f6fa;
}
.layout-body {
  flex: 1;
  display: flex;
  flex-direction: row;
}
.main-content {
  flex: 1;
  padding: 24px;
  background: #fff;
  min-height: 0;
  overflow: auto;
}
</style>

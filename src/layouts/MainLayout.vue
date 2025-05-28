<!-- layouts/MainLayout.vue -->
<template>
  <!-- 主应用外壳，包含头部、侧边栏、主内容区、底部 -->
  <div class="main-layout">
    <!-- 头部导航栏，可扩展多语言、头像、快捷操作等 -->
    <AppHeader />
    <div class="layout-body">
      <!-- 左侧多级权限菜单，菜单项和路由、权限强关联 -->
      <AppSidebar />
      <main class="main-content">
        <!-- 关键：用 router-view 渲染主内容区，不要用 slot -->
        <router-view v-slot="{ Component }">
          <component :is="Component" />
        </router-view>      </main>
    </div>
    <!-- 全局底部信息区，可插入版权、帮助等 -->
    <AppFooter />
  </div>
</template>

<script setup lang="ts">
// 引用基础组件（头部、侧边栏、底部）
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
  min-height: 0;
}
.main-content {
  flex: 1;
  padding: 24px;
  background: #fff;
  min-height: 0;
  overflow: auto;
}
</style>

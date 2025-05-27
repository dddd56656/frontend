<template>
  <header class="app-header">
    <!-- 应用LOGO -->
    <div class="logo">MyApp</div>
    <!-- 右侧用户栏 -->
    <div class="header-actions">
      <UserAvatar />
      <!-- 更多操作按钮 -->
    </div>
  </header>
</template>

<script setup lang="ts">
import UserAvatar from './UserAvatar.vue'
</script>

<style scoped>
.app-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background: #409eff;
  color: #fff;
}
.logo {
  font-size: 22px;
  font-weight: bold;
  letter-spacing: 2px;
}
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}
</style>

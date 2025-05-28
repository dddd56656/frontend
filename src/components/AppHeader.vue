<!-- components/AppHeader.vue -->
<template>
  <!-- 头部区域：LOGO、系统名、右侧操作区 -->
  <header class="app-header">
    <div class="logo-section">
      <!-- 可放公司/系统LOGO -->
      <img class="logo" src="@/assets/logo.png" alt="logo" />
      <span class="system-title">权限管理系统</span>
    </div>
    <div class="header-actions">
      <!-- 可扩展: 多语言切换、消息、用户头像、下拉菜单等 -->
      <el-dropdown>
        <span class="user-info">
          <el-avatar :size="32" src="/avatar.jpg" />
          <span>喵喵喵</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
// 此处可通过props或pinia获取用户信息、头像等
</script>

<style scoped>
.app-header {
  height: 56px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #304156;
  color: #fff;
  padding: 0 24px;
}
.logo-section {
  display: flex;
  align-items: center;
}
.logo {
  height: 32px;
  margin-right: 8px;
}
.system-title {
  font-size: 20px;
  font-weight: 700;
}
.header-actions {
  display: flex;
  align-items: center;
}
.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}
.user-info > span {
  margin-left: 8px;
}
</style>

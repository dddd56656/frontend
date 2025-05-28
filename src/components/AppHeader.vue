<!-- components/AppHeader.vue -->
<template>
  <!-- 头部区域：LOGO、系统名、右侧操作区 -->
  <header class="app-header">
    <div class="logo-section">
      <!-- 可放公司/系统LOGO -->
      <img class="logo" src="@/assets/Google_2015_logo.svg" alt="logo" />
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
            <el-dropdown-item divided @click="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
// 假设有一个用户store管理登录状态
import { useUserStore } from '@/store/modules/user'

const router = useRouter()
const userStore = useUserStore()

/**
 * 退出登录
 * - 1. 清除用户信息和token
 * - 2. 跳转到登录页
 */
function logout() {
  userStore.logout()     // 调用store层方法清空登录态
  router.push('/login')  // 跳转到登录页（路由根据你的实际路径）
}
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

.user-info>span {
  margin-left: 8px;
}
</style>

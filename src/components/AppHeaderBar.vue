<template>
  <!--
    AppHeaderBar 组件 —— 顶部全局工具栏
    1. 左侧：可放Logo、系统标题、面包屑等
    2. 右侧：用户区（头像+用户名+下拉菜单）、全局操作（如设置、切换主题、通知等）
    3. 推荐所有交互通过props/inject/Pinia进行解耦
    4. 业务区块可通过slot拓展
  -->
  <div class="header-bar-inner">
    <!-- 左侧区域：Logo/系统名（可改成slot） -->
    <div class="left">
      <span class="title">企业管理平台</span>
    </div>
    <!-- 右侧区域：用户/操作区 -->
    <div class="right">
      <!-- 用户头像，可换成后端头像或本地上传 -->
      <el-avatar size="small" style="margin-right: 8px;">
        <!-- 推荐用后端下发URL或第三方图像生成器 -->
        <img src="https://api.dicebear.com/8.x/pixel-art/svg?seed=user" alt="avatar" />
      </el-avatar>
      <!-- 用户名（可用pinia或props注入） -->
      <span style="margin-right: 16px;">{{ user.name }}</span>
      <!-- 用户操作下拉菜单：个人中心、登录/登出、设置等 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          操作 <el-icon><ArrowDown /></el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="toProfile">个人中心</el-dropdown-item>
            <!-- 登录/登出根据状态切换 -->
            <el-dropdown-item divided v-if="user.isLoggedIn" @click="logout">登出</el-dropdown-item>
            <el-dropdown-item v-else @click="login">登录</el-dropdown-item>
            <el-dropdown-item @click="openSettings">设置</el-dropdown-item>
            <!-- 可继续添加国际化/主题切换等全局操作 -->
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * AppHeaderBar.vue
 * - 顶部全局工具栏组件
 * - 最大化注释，Google级工程可扩展性
 * - 所有用户与操作均解耦（可接pinia、props或inject）
 */
import { useUserStore } from '@/store/useUserStore' // 推荐全局pinia管理用户信息
import { ArrowDown } from '@element-plus/icons-vue'

const user = useUserStore()

// 用户登录（可换成弹窗或跳OAuth）
const login = () => user.login('张三')
// 用户登出
const logout = () => user.logout()
// 跳个人中心（路由跳转或弹窗，具体业务接入）
const toProfile = () => {
  // 这里可用router.push('/profile')或emit事件
}
// 打开设置（建议弹窗或跳转设置页）
const openSettings = () => {
  // 打开设置弹窗/页面
}
</script>

<style scoped>
.header-bar-inner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%; /* 撑满header高度 */
}
.title {
  font-weight: 700;
  font-size: 20px;
  color: #333;
  letter-spacing: 1px;
}
.right {
  display: flex;
  align-items: center;
}
/* el-avatar/下拉等可自行美化 */
</style>

<template>
  <div class="toolbar">
    <el-dropdown>
      <el-icon style="margin-right: 8px;"><Setting /></el-icon>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <span>{{ user.isLoggedIn ? user.name : '未登录' }}</span>
  </div>
</template>

<script setup lang="ts">
import { Setting } from '@element-plus/icons-vue'
import { useUserStore } from '@/store/useUserStore'
const user = useUserStore()
function logout() {
  user.logout()
}
</script>

<style scoped>
.toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  right: 20px;
}
</style>

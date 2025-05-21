<template>
  <MainLayout>
    <div class="home-box">
      <h1>首页</h1>
      <p>欢迎：{{ user.name }}</p>
      <button v-if="!user.isLoggedIn" @click="user.login('张三')">登录</button>
      <button v-else @click="user.logout()">登出</button>
      <el-button type="primary">主要按钮</el-button>
      <button @click="refreshUser">刷新用户信息</button>
      <router-link to="/about">关于我们</router-link>
    </div>
  </MainLayout>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/useUserStore'
import MainLayout from '@/layouts/MainLayout.vue'
const user = useUserStore()
const refreshUser = () => user.fetchUser()
</script>

<style scoped>
.home-box {
  padding: 20px;
  background: var(--el-color-primary-light-8);
  color: var(--el-color-primary);
  border: 1px solid var(--el-color-primary);
  border-radius: 8px;
}
</style>

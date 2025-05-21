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

<style lang="scss" scoped>
@use 'sass:color';
// 无需再次 import，$primary-color 已注入
.home-box {
  padding: 20px;
  background: color.adjust($primary-color, $lightness: 40%);
  color: $primary-color;
  border: 1px solid $primary-color;
  border-radius: 8px;
}
</style>

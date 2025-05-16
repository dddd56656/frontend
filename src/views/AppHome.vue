<template>
  <div>
    <h1>首页</h1>
    <p>欢迎：{{ user.name }}</p>
    <!-- 登录/登出按钮，根据状态显示 -->
    <button v-if="!user.isLoggedIn" @click="user.login('张三')">登录</button>
    <button v-else @click="user.logout()">登出</button>
    <!-- 页面跳转演示 -->
    <router-link to="/about">关于我们</router-link>
  </div>
</template>

<script setup lang="ts">
// 组合式API，获取Pinia的user store实例
import { useUserStore } from '@/store/useUserStore'
const user = useUserStore()
</script>

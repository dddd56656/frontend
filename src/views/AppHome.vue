<template>
  <MainLayout>
    <h1>欢迎，{{ userStore.displayName }}</h1>
    <p>这是首页内容。</p>
  </MainLayout>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'

// 读取用户信息
const userStore = useUserStore()
</script>

<!-- 样式可选 -->

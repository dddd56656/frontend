<template>
  <div class="user-avatar">
    <img :src="avatarUrl" :alt="userName" />
    <span class="user-name">{{ userName }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/store/modules/user'

// 读取当前用户信息
const userStore = useUserStore()
const avatarUrl = computed(() => userStore.avatarUrl || 'https://api.dicebear.com/8.x/pixel-art/svg?seed=user')
const userName = computed(() => userStore.displayName)
</script>

<style scoped>
.user-avatar {
  display: flex;
  align-items: center;
  gap: 8px;
}
.user-avatar img {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}
.user-name {
  font-size: 15px;
  color: #333;
}
</style>

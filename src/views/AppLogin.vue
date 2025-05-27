<template>
  <AuthLayout>
    <form class="login-form" @submit.prevent="handleLogin">
      <h2>登录</h2>
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <button type="submit">登录</button>
      <div class="error" v-if="errorMsg">{{ errorMsg }}</div>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useUserStore } from '@/store/modules/user'

const userStore = useUserStore()
const username = ref('')
const password = ref('')
const errorMsg = ref('')

const handleLogin = async () => {
  try {
    await userStore.login(username.value, password.value)
    // localStorage.setItem('userInfo', JSON.stringify(isLoggedIn))

    window.location.href = '/'
  } catch {
    errorMsg.value = '用户名或密码错误'
  }
}
</script>

<style scoped>
.login-form {
  display: flex;
  flex-direction: column;
  gap: 18px;
}

.error {
  color: red;
  margin-top: 8px;
}
</style>

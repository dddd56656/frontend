<template>
  <!-- 登录页整体布局，AuthLayout只做页面壳（不含业务逻辑） -->
  <AuthLayout>
    <form class="login-form" @submit.prevent="handleLogin">
      <h2>登录</h2>
      <!-- 账号、密码绑定本地响应式变量，页面UI自动同步变化 -->
      <input v-model="username" placeholder="用户名" />
      <input v-model="password" type="password" placeholder="密码" />
      <button type="submit">登录</button>
      <!-- 错误信息只在登录失败时展示 -->
      <div class="error" v-if="errorMsg">{{ errorMsg }}</div>
    </form>
  </AuthLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AuthLayout from '@/layouts/AuthLayout.vue'
import { useUserStore } from '@/store/modules/user'

/**
 * 1. 响应式本地变量，用于双向绑定表单
 */
const userStore = useUserStore()
const username = ref('') // 用户名输入框
const password = ref('') // 密码输入框
const errorMsg = ref('') // 错误信息提示

/**
 * 2. 登录业务逻辑
 * - 只做：调用户store的login方法，不直接处理业务细节
 * - 登录成功后跳转主页，失败则提示错误
 */
const handleLogin = async () => {
  try {
    // 调用store的login方法（强制走全局业务逻辑）
    // === 调试建议：登录前打印输入 ===
    console.log('[handleLogin] 尝试登录', username.value, password.value)
    await userStore.login(username.value, password.value)
    // === 登录后调试：打印store状态 ===
    console.log('[handleLogin] 登录后 userStore:', userStore.isLoggedIn)
    
    // === 登录后通常跳转到主页，避免停留在登录页 ===
    window.location.href = '/'
    // === 如需SPA跳转用 router.push('/') 更佳 ===
  } catch (e) {
    // === 捕获store/login抛出的错误（如用户名或密码错误） ===
    errorMsg.value = '用户名或密码错误'
    // === 调试建议：打印具体错误对象 ===
    console.error('[handleLogin] 登录失败', e)
  }
}
</script>

<style scoped>
/* 页面结构与交互样式，只负责UI，无业务逻辑 */
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

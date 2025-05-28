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
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
// 如用路由跳转而非window.location，可解开以下注释：
// import { useRouter } from 'vue-router'

const userStore = useUserStore()
const username = ref('')
const password = ref('')
const errorMsg = ref('')
// const router = useRouter() // 如果你希望SPA跳转

/**
 * 登录业务逻辑，带nprogress全局进度条
 */
const handleLogin = async () => {
  errorMsg.value = ''
  NProgress.start() // 显示顶部进度条
  try {
    await userStore.login(username.value, password.value)
    NProgress.done() // 登录成功，进度条完成
    // 跳转主页，推荐SPA用router.push
    window.location.href = '/'
    // 或 router.push('/')
  } catch (e) {
    errorMsg.value = '用户名或密码错误'
    NProgress.done() // 登录失败也要关闭进度条
    console.error('[handleLogin] 登录失败', e)
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

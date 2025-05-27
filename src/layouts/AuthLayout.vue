<template>
  <!-- 登录/注册/忘记密码专用外壳，居中简约 -->
  <div class="auth-layout">
    <div class="auth-box">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * AuthLayout
 * 用于登录/注册等不需要主导航的简约页面外壳
 */
</script>

<style scoped>
.auth-layout {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #409eff 0%, #f5f6fa 100%);
}
.auth-box {
  width: 350px;
  padding: 32px 24px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 2px 16px #409eff33;
}
</style>

<template>
  <div class="about-box">
    <h1>关于我们</h1>
    <p>本网站是由 Vue 3 + Vite + TypeScript 构建的现代前端项目。</p>
    <router-link class="link" to="/">返回首页</router-link>
  </div>
</template>

<script setup lang="ts">
// 此页面目前不需要逻辑，留空 script 即可
</script>

<style lang="scss" scoped>
@use 'sass:color';
// 变量 $primary-color 已自动全局注入，无需重复 @use

.about-box {
  padding: 24px;
  max-width: 600px;
  margin: 0 auto;
  border: 1px solid $primary-color;
  border-radius: 8px;
  color: $primary-color;
  background: color.adjust($primary-color, $lightness: 42%);
  // 或 color.scale($primary-color, $lightness: 42%);
}

.link {
  display: inline-block;
  margin-top: 16px;
  color: color.adjust($primary-color, $lightness: -10%);
  // 或 color.scale($primary-color, $lightness: -10%);
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
}
</style>

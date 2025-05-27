<template>
  <aside class="app-sidebar">
    <!-- 侧边菜单栏，可根据权限/路由动态生成 -->
    <nav>
      <ul>
        <li><router-link to="/">首页</router-link></li>
        <li><router-link to="/about">关于</router-link></li>
        <!-- 可扩展更多 -->
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
/**
 * AppSidebar
 * 侧边菜单，可接入动态权限/路由管理
 */
</script>

<style scoped>
.app-sidebar {
  width: 200px;
  background: #fff;
  border-right: 1px solid #eee;
  padding-top: 18px;
  min-height: 100%;
}
.app-sidebar ul {
  list-style: none;
  padding: 0;
}
.app-sidebar li {
  margin: 12px 0;
}
.app-sidebar a {
  color: #333;
  text-decoration: none;
  padding: 8px 16px;
  display: block;
  border-radius: 8px;
}
.app-sidebar a.router-link-active {
  background: #409eff22;
  color: #409eff;
}
</style>

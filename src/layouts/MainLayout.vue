<template>
  <el-container class="layout-container-demo" style="height: 100vh">
    <el-aside width="200px">
      <el-scrollbar>
        <AppAsideMenu @select="onAsideMenuSelect" />
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <AppHeaderBar />
      </el-header>
      <el-main>
        <el-scrollbar>
          <slot /> <!-- 页面主内容插槽 -->
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppAsideMenu from '@/components/AppAsideMenu.vue'
import AppHeaderBar from '@/components/AppHeaderBar.vue'

function onAsideMenuSelect(index: string) {
  // 这里可以路由跳转或响应业务
  // 如：router.push(index)
}
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  background-color: var(--el-color-primary-light-7);
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
  background: var(--el-color-primary-light-8);
}
.layout-container-demo .el-menu {
  border-right: none;
}
.layout-container-demo .el-main {
  padding: 0;
}
</style>

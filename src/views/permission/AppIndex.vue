<script setup lang="ts">
/**
 * 业务视图入口文件
 * - 仅做页面包裹和懒加载
 * - 便于未来业务拆分和异步加载
 */
import PermissionList from './PermissionList.vue'
</script>
<template>
  <PermissionList />
</template>

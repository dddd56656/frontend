<!-- components/AppSidebar.vue -->
<template>
  <!-- 多级菜单结构，和路由/权限关联，支持递归渲染 -->
  <aside class="app-sidebar">
    <el-menu
      :default-active="activeMenu"
      class="sidebar-menu"
      :collapse="isCollapse"
      :unique-opened="true"
      router
      background-color="#263445"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <template v-for="item in menuTree" :key="item.path">
        <SubMenu :menu="item" />
      </template>
    </el-menu>
  </aside>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import SubMenu from './SubMenu.vue' // 递归菜单渲染组件
import menuTree from '@/router/menuTree'

// 是否折叠侧边栏，可做成响应式
const isCollapse = ref(false)
// 当前激活菜单项
const route = useRoute()
const activeMenu = computed(() => route.path)

</script>

<style scoped>
.app-sidebar {
  width: 220px;
  background: #263445;
  min-height: 0;
  transition: width 0.2s;
  overflow: auto;
}
.sidebar-menu {
  border-right: none;
}
</style>

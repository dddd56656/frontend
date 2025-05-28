<!-- components/SubMenu.vue -->
<template>
  <template v-if="menu.children && menu.children.length > 0">
    <!-- 有子菜单：递归渲染 -->
    <el-sub-menu :index="menu.path">
      <template #title>
        <i :class="menu.icon"></i>
        <span>{{ menu.title }}</span>
      </template>
      <template v-for="child in menu.children" :key="child.path">
        <SubMenu :menu="child" />
      </template>
    </el-sub-menu>
  </template>
  <template v-else>
    <!-- 没有子菜单：叶子节点 -->
    <el-menu-item :index="menu.path">
      <i :class="menu.icon"></i>
      <span>{{ menu.title }}</span>
    </el-menu-item>
  </template>
</template>

<script setup lang="ts">
// 正确类型，ESLint无警告
import type { MenuItem } from '@/types/menu'
import SubMenu from './SubMenu.vue'

defineProps<{
  menu: MenuItem
}>()
</script>

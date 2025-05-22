<template>
  <!--
    AppAsideMenu 组件 —— 系统侧边多级导航菜单
    - 采用 Element Plus <el-menu> 及 <el-sub-menu> 实现多级菜单结构
    - 支持路由自动高亮，icon与菜单文本自定义
    - 可作为权限系统和国际化菜单的基础
    - 推荐后期用配置数据+递归渲染（此Demo为手写静态结构，易理解）
  -->
  <el-menu
    :default-active="activeMenu"            
    class="el-menu-vertical-demo"           
    background-color="#f5f7fa"              
    text-color="#333"                       
    active-text-color="#409EFF"             
    :collapse="false"                       
    router                                  
  >
    <!-- 一级菜单，含图标及文本 -->
    <el-sub-menu index="1">
      <template #title>
        <el-icon><Menu /></el-icon>
        <span>主导航</span>
      </template>
      <!-- 二级菜单：首页（直接跳转到 /） -->
      <el-menu-item index="/">首页</el-menu-item>
      <!-- 二级菜单：带三级子菜单的演示 -->
      <el-sub-menu index="1-2">
        <template #title>
          <el-icon><Setting /></el-icon>
          <span>系统设置</span>
        </template>
        <!-- 三级菜单项，可按需扩展 -->
        <el-menu-item index="/setting1">设置1</el-menu-item>
        <el-menu-item index="/setting2">设置2</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <!-- 其它一级或多级菜单项，可继续添加 -->
    <!--
    <el-menu-item index="/profile">
      <el-icon><User /></el-icon>
      <span>个人中心</span>
    </el-menu-item>
    -->
  </el-menu>
</template>

<script setup lang="ts">
/**
 * AppAsideMenu.vue
 * - 项目侧边多级菜单组件
 * - 支持动态路由高亮、图标自定义、权限拓展
 * - 推荐后续递归化和配置驱动
 */
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { Menu, Setting } from '@element-plus/icons-vue' // Element Plus官方icon

// 1. 获取当前路由信息（用于菜单高亮）
const route = useRoute()

// 2. 计算当前激活菜单项（以route.path为基准，确保跳转/刷新自动同步高亮）
const activeMenu = computed(() => route.path)

// 3. 推荐扩展：
//    - 菜单项数组 + 递归渲染（适配权限/多语言）
//    - 支持 collapse 响应式收缩（如引入左侧折叠功能）
//    - 可注入用户角色实现动态菜单
</script>

<style scoped>
/* 侧边菜单整体样式 */
.el-menu-vertical-demo {
  border-right: none;   /* 视觉简洁，无右侧边线 */
  min-height: 100vh;    /* 高度撑满侧边 */
  width: 100%;          /* 占满aside宽度 */
  background: inherit;  /* 跟随外层背景，可自定义主题 */
}
/* 图标与文本的间距优化（EP官方推荐8px） */
.el-menu .el-icon {
  margin-right: 8px;
}
</style>

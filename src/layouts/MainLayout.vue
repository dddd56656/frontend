<template>
  <!--
    最佳实践主布局
    - 左侧侧边栏100%贴边（无缝连体）
    - 右侧el-container：头部+主内容
    - 适配移动端，保证最小宽度限制
  -->
  <el-container class="main-layout">
    <!-- 侧边栏：100%贴边 -->
    <el-aside width="220px" class="aside-menu">
      <AppAsideMenu />
    </el-aside>
    <el-container>
      <el-header height="56px" class="header-bar">
        <AppHeaderBar />
      </el-header>
      <el-main class="main-content">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import AppAsideMenu from '@/components/AppAsideMenu.vue'
import AppHeaderBar from '@/components/AppHeaderBar.vue'
</script>

<style scoped>
/* 覆盖el-container的默认行为，确保全屏无缝 */
.main-layout {
  width: 100vw;
  height: 100vh;
  min-width: 0;    /* 避免容器内子元素撑爆 */
  min-height: 0;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  overflow: hidden; /* 禁止横向滚动条 */
  background: #f5f6fa;
}

/* 侧边栏，确保贴左，视觉无间隙 */
.aside-menu {
  width: 220px !important;
  min-width: 220px !important;
  max-width: 220px !important;
  height: 100vh;
  background: #fff;
  border-right: 1px solid #ebeef5;
  box-sizing: border-box;
  position: relative;
  left: 0;
  top: 0;
  /* 保证边界无留白 */
  margin: 0;
  padding: 0;
  z-index: 10;
}

/* 头部栏同样贴边，阴影视觉提升 */
.header-bar {
  background: #fff;
  border-bottom: 1px solid #ebeef5;
  box-shadow: 0 1px 4px rgba(0,21,41,0.04);
  z-index: 20;
  margin: 0;
  padding: 0 24px;
  display: flex;
  align-items: center;
}

/* 主内容区宽度100%，绝无间隙 */
.main-content {
  width: 100%;
  min-height: calc(100vh - 56px);
  padding: 24px;
  background: #f5f6fa;
  box-sizing: border-box;
  overflow-x: auto;
  margin: 0;
}

/* 响应式：手机端侧栏折叠/抽屉（如需更极致体验可用el-drawer） */
@media (max-width: 768px) {
  .aside-menu {
    width: 56px !important;
    min-width: 56px !important;
    max-width: 56px !important;
  }
  .header-bar, .main-content {
    padding-left: 8px;
    padding-right: 8px;
  }
  .main-content {
    padding: 8px;
  }
}
</style>

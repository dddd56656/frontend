// 引入Vue Router的核心方法与类型
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// 定义所有路由规则，便于权限控制、自动化管理
const routes: RouteRecordRaw[] = [
  {
    path: '/',                // 首页路由
    name: 'Home',
    component: () => import('@/views/AppHome.vue'), // 懒加载，提升首屏性能
  },
  {
    path: '/about',           // 关于页路由
    name: 'About',
    component: () => import('@/views/AppAbout.vue'),
  },
]

// 创建并导出router实例，统一在main.ts注册
export const router = createRouter({
  history: createWebHistory(), // 使用HTML5 history模式，支持SEO与回退
  routes,
})

/**
 * 基础路由模块（router/modules/base.ts）
 * - 管理无需权限的公共页面路由
 */

import type { RouteRecordRaw } from 'vue-router'

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/AppLogin.vue'),
    meta: { layout: 'auth', public: true, title: '登录' }
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/AppHome.vue'),
    meta: { layout: 'main', requiresAuth: true, title: '首页' }
  }
  // 可扩展更多公共页面
]

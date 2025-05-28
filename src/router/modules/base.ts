/**
 * 基础路由模块（router/modules/base.ts）
 * - 管理无需权限的公共页面路由
 */

import type { RouteRecordRaw } from 'vue-router'

import MainLayout from '@/layouts/MainLayout.vue'

export const baseRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/AppLogin.vue'),
    meta: { layout: 'auth', public: true, title: '登录' }
  },
  {
    path: '/',
    component: MainLayout,
    meta: { layout: 'main', requiresAuth: true },  // 这里meta可以不用name了
    children: [
      {
        path: '',
        name: 'Home',
        component: () => import('@/views/AppHome.vue'),
        meta: { requiresAuth: true, title: '首页' }
      },
      // ⚠️ 其它业务路由都写children
      // 注意：如果你permissionRoutes里是相对路径，直接放children就行
      // ...permissionRoutes,
    ]
  }
]

/**
 * 其它业务模块路由（router/modules/other.ts）
 */

import type { RouteRecordRaw } from 'vue-router'

export const otherRoutes: RouteRecordRaw[] = [
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AppAbout.vue'),
    meta: { layout: 'main', requiresAuth: false, title: '关于我们' }
  }
]

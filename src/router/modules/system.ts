/**
 * system.ts
 * 系统设置相关路由（可对应Element Plus多级菜单中的系统设置）
 */
import { type RouteRecordRaw } from 'vue-router'

const systemRoutes: RouteRecordRaw[] = [
  {
    path: '/system',
    name: 'System',
    component: () => import('@/layouts/MainLayout.vue'), // 复用主布局
    meta: {
      title: '系统设置',
      icon: 'Setting'
    },
    children: [
      // {
      //   path: 'setting1',
      //   name: 'SystemSetting1',
      //   component: () => import('@/views/SystemSetting1.vue'),
      //   meta: { title: '设置1' }
      // },
      // {
      //   path: 'setting2',
      //   name: 'SystemSetting2',
      //   component: () => import('@/views/SystemSetting2.vue'),
      //   meta: { title: '设置2' }
      // }
    ]
  }
]

export default systemRoutes

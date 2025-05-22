/**
 * home.ts
 * 首页相关路由配置（可按需扩展更多子页面）
 */
import { type RouteRecordRaw } from 'vue-router'

const homeRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/AppHome.vue'),
    meta: {
      title: '首页',
      icon: 'Menu' // 方便和菜单系统关联
    }
  }
]

export default homeRoutes

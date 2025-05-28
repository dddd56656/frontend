// 权限管理模块路由定义
// —— 仅维护权限业务相关的路由，分模块管理，易扩展和维护
// —— 谷歌最佳实践，每行注释

import type { RouteRecordRaw } from 'vue-router' // 引入路由类型

// 路由配置数组
const permissionRoutes: RouteRecordRaw[] = [
  {
    path: '/permission',                    // 一级路由 path
    name: 'Permission',                     // 路由名称
    component: () => import('@/views/permission/PermissionList.vue'), // 懒加载权限列表页面
    meta: {
      title: '权限管理',                      // 页面标题，可用于面包屑、标签等
      requiresAuth: true,                   // 需登录权限，可用作全局守卫判断
      roles: ['admin', 'op']                // 有权限访问此页的角色，可扩展权限控制
    }
  }
]

export default permissionRoutes              // 导出供主路由入口加载

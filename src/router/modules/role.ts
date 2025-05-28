// src/router/modules/role.ts
// 角色管理相关路由
// —— 谷歌最佳实践：路由分模块管理，每行注释极致可读

import { type RouteRecordRaw } from 'vue-router'                   // 引入路由类型
// 路由表用数组方式，便于自动聚合

const roleRoutes: RouteRecordRaw[] = [
  {
    path: 'role',                                            // 访问路径
    name: 'RoleList',                                         // 路由名称，唯一标识
    component: () => import('@/views/role/RoleList.vue'),      // 路由懒加载（只加载必要页面）
    meta: {
      title: '角色管理',                                       // 页面标题
      icon: 'UserCog',                                        // 可选：用于菜单icon（如有）
      requiresAuth: true,                                     // 可选：权限控制
    }
  },
  // 可扩展更多角色相关页面
]

export default roleRoutes                                     // 导出本模块路由，供主路由聚合

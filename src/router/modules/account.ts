// router/modules/account.ts
// 用户管理模块路由 —— 谷歌CTO标准、极致注释

import { type RouteRecordRaw } from 'vue-router' // 路由类型
// 路由懒加载页面组件，提升性能
const AccountList = () => import('@/views/account/AccountList.vue') // 用户列表页
// const AccountDetail = () => import('@/views/account/AccountDetail.vue') // 用户详情页（如有）

/**
 * 用户管理路由配置
 * 单独导出，便于多模块组合
 */
const accountRoutes: RouteRecordRaw[] = [
  {
    path: '/accounts',                 // 主路由路径
    name: 'Account',                   // 路由命名，便于跳转/鉴权
    component: AccountList,            // 绑定页面组件
    meta: {
      title: '用户管理',                // 页面标题（导航/标签栏用）
      requiresAuth: true,              // 是否需要鉴权（中间件可拦截）
      icon: 'user',                    // 自定义菜单icon
      keepAlive: true                  // 是否缓存（可选）
    }
  },
//   // 可选：用户详情/编辑页
//   {
//     path: '/accounts/:id',             // 动态参数路由
//     name: 'AccountDetail',             // 详情页命名
//     component: AccountDetail,          // 详情页组件
//     meta: {
//       title: '用户详情',
//       requiresAuth: true,
//       hidden: true                    // 不在菜单中显示
//     }
//   }
]

export default accountRoutes           // 导出，供主路由合并

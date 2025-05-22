/**
 * index.ts
 * 路由主入口（Google级模块化，最大化注释）
 * 1. 按modules分文件解耦业务路由，方便维护和权限扩展
 * 2. 自动合并所有模块路由，支持无限扩展
 * 3. 挂载全局主布局，所有页面默认走统一布局
 */
import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// 1. 按模块导入路由
import homeRoutes from './modules/home.ts'
import systemRoutes from './modules/system.ts'
// import profileRoutes from './modules/profile' // 可继续扩展

// 2. 主路由结构（包含主布局和子页面）
//   - 所有页面都在MainLayout下渲染，子路由负责页面内容
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: () => import('@/layouts/MainLayout.vue'),
    children: [
      ...homeRoutes,      // 首页
      ...systemRoutes,    // 系统设置
      // ...profileRoutes, // 其它模块
      // 可扩展更多业务模块
    ]
  }
  // 可扩展如login/404等特殊路由，不走主布局
]

// 3. 创建路由实例，使用HTML5 History模式
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

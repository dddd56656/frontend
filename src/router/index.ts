/**
 * 路由主入口（router/index.ts）
 * - 自动聚合所有模块路由
 * - 全局守卫：nprogress、鉴权、动态layout等
 */

import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { baseRoutes } from './modules/base'
import { otherRoutes } from './modules/other'
import { useUserStore } from '@/store/modules/user'

// 合并所有路由
const routes = [...baseRoutes, ...otherRoutes]

const router = createRouter({
  history: createWebHistory(),
  routes
})
// === 路由全局前置守卫：统一处理页面进度条与登录权限 ===
router.beforeEach((to, _from, next) => {
  // [用户体验] 页面跳转开始时，显示顶部进度条
  NProgress.start()

  // [状态管理] 获取当前用户的登录状态
  const userStore = useUserStore()

  // [调试] 打印当前登录态，便于调试流程与排查问题
  console.log('[Router] 跳转前，isLoggedIn=', userStore.isLoggedIn)

  // [权限控制] 判断目标路由是否需要登录（约定：meta.requiresAuth=true为需登录页面）
  // 只有未登录时才拦截，已登录则直接放行
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    // [安全] 未登录访问受保护页面，强制跳转到登录页
    next('/login')
  } else {
    // [正常流程] 已登录或无需登录页面，正常跳转
    next()
  }
})

// === 路由全局后置钩子：关闭进度条 ===
router.afterEach(() => {
  // [用户体验] 页面跳转结束，隐藏顶部进度条
  NProgress.done()
})


export default router

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

// 全局前置守卫：进度条 + 登录拦截
router.beforeEach((to, _from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router

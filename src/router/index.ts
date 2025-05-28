import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { baseRoutes } from './modules/base'
import { otherRoutes } from './modules/other'
import { useUserStore } from '@/store/modules/user'
import { ElMessageBox } from 'element-plus'
import permissionRoutes from '@/router/modules/permission'
import roleRoutes from './modules/role'
import ruleRoutes from './modules/rule'
import accountRoutes from './modules/account'

// 找到 MainLayout 的 children，并把所有业务模块路由合进去
const mainLayoutChildren = baseRoutes[1]?.children ?? []

mainLayoutChildren.push(
  ...permissionRoutes,
  ...roleRoutes,  
  ...ruleRoutes, 
  ...accountRoutes,                                          // 角色模块路由
  // ...dashboardRoutes,
  // ...articleRoutes
  // ...其它业务模块
)
const routes = [
  ...baseRoutes,
  ...otherRoutes
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

let loginTipActive = false // 防止多次弹窗&跳转

router.beforeEach((to, _from, next) => {
  NProgress.start()
  const userStore = useUserStore()
  console.log('[Router] 跳转前，isLoggedIn=', userStore.isLoggedIn)

  // 只在需要登录的页面做拦截
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    if (!loginTipActive) {
      loginTipActive = true

      // 弹框提示，支持“立即登录”按钮，2秒后自动跳转
      ElMessageBox({
        title: '未登录提示',
        message: '您还未登录，请先登录后访问该页面。',
        showCancelButton: true,
        confirmButtonText: '立即登录',
        cancelButtonText: '取消',
        closeOnClickModal: true,
        closeOnPressEscape: true,
        callback: (action: string) => {
          // “立即登录” 或关闭弹窗时自动跳转
          if (action === 'confirm') {
            router.replace('/login')
          }
          loginTipActive = false // 恢复标志位
        }
      })

      // // 2秒后自动跳转并关闭弹窗
      // setTimeout(() => {
      //   if (loginTipActive) {
      //     router.replace('/login')
      //     ElMessageBox.close()
      //     loginTipActive = false
      //   }
      // }, 5000)
    }
    // 关键：此处 next(false) 阻止后续跳转（不放行当前路由），等待弹窗逻辑
    next(false)
    return
  }

  next()
})

router.afterEach(() => {
  NProgress.done()
})

export default router

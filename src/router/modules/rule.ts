// router/modules/rule.ts
// 权限规则管理路由配置
// —— 每一行都带详细注释，便于理解和团队协作

import { type RouteRecordRaw } from 'vue-router'         // 导入路由类型定义

// 权限规则相关页面的路由数组
const ruleRoutes: RouteRecordRaw[] = [
  {
    path: '/rule',                                 // 路由路径（访问 /rule）
    name: 'RuleList',                              // 路由名称（唯一，用于跳转/缓存）
    component: () => import('@/views/rule/RuleList.vue'), // 路由懒加载对应页面组件
    meta: {
      title: '权限规则管理',                         // 页面标题（用于菜单、标签等）
      requiresAuth: true,                          // 是否需要登录（权限控制用）
      icon: 'icon-rules',                         // 图标标识（自定义，用于侧边栏等）
      keepAlive: true                             // 是否缓存页面（性能优化）
    }
  }
]

export default ruleRoutes                         // 导出供主路由文件合并使用

export default [
  {
    path: 'system/permission',  // ←← 注意这里不要斜杠，保证children正确
    name: 'Permission',
    meta: {
      title: '权限管理',
      requiresAuth: true,
      icon: 'el-icon-lock',
      module: 'system'
    },
    component: () => import('@/views/permission/AppIndex.vue'),
  }
  // ...如需其它子路由可加
]

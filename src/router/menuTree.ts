// src/router/menuTree.ts
// 全局菜单树配置，支持嵌套和权限过滤
// —— 谷歌CTO标准，每行注释

import { type RouteMeta } from 'vue-router' // 类型增强

// 菜单节点类型声明
export interface MenuItem {
  path: string                  // 路由路径
  name: string                  // 路由名称
  title: string                 // 菜单标题
  icon?: string                 // 图标
  roles?: string[]              // 有权访问的角色
  children?: MenuItem[]         // 子菜单
  meta?: Partial<RouteMeta>     // 路由 meta 信息
}

// 菜单树配置
export const menuTree: MenuItem[] = [
  {
    path: '/settings',            // 一级菜单路径，聚合所有设置类
    name: 'Settings',             // 一级菜单名称
    title: '系统设置',             // 一级菜单标题
    icon: 'Settings',             // 一级菜单图标
    roles: ['admin', 'op'],       // 有权限访问的角色
    children: [                   // 子菜单数组（四大管理业务）
      {
        path: '/role',            // 子菜单路径
        name: 'Role',
        title: '角色管理',
        icon: 'UserSwitch',
        roles: ['admin', 'op'],
      },
      {
        path: '/permission',
        name: 'Permission',
        title: '权限管理',
        icon: 'Lock',
        roles: ['admin', 'op'],
      },
      {
        path: '/rule',
        name: 'Rule',
        title: '权限规则管理',
        icon: 'Key',
        roles: ['admin'],
      },
      {
        path: '/accounts',
        name: 'User',
        title: '用户管理',
        icon: 'User',
        roles: ['admin', 'op', 'viewer'],
      }
    ]
  }
  // 你还可以在此添加其它一级业务菜单
]

export default menuTree

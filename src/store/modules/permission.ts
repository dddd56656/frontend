// store/permission.ts
// 权限 Pinia Store 层，所有数据、状态、业务逻辑全在这里集中管理
// —— 谷歌最佳实践：store 负责所有数据流动和状态同步，组件零逻辑，只调 store

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import NProgress from 'nprogress'
import {
  fetchPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from '@/services/permission'
import type {
  Permission,
  PermissionQuery,
  PermissionCreatePayload,
  PermissionUpdatePayload,
} from '@/types/permission'

/**
 * 权限数据的 Pinia Store
 * 封装了：列表、分页、搜索、loading、CRUD 所有业务
 */
export const usePermissionStore = defineStore('permission', () => {
  // 权限列表数据
  const list = ref<Permission[]>([])
  // 数据总条数
  const total = ref(0)
  // 当前页码（分页）
  const page = ref(1)
  // 每页数量（分页）
  const pageSize = ref(20)
  // 搜索关键字
  const search = ref('')
  // 加载状态（适配表格、按钮等所有 loading）
  const loading = ref(false)

  // 查询参数自动计算（解耦 UI 只读 store）
  const query = computed<PermissionQuery>(() => ({
    page: page.value,
    pageSize: pageSize.value,
    search: search.value,
  }))
// menus.ts
// 支持多级菜单和权限控制
const menuTree = [
  {
    path: '/dashboard',
    title: '仪表盘',
    icon: 'el-icon-s-home',
    children: [],
  },
  {
    path: '/system',
    title: '系统管理',
    icon: 'el-icon-setting',
    children: [
      {
        path: '/system/user',
        title: '用户管理',
        icon: 'el-icon-user',
      },
      {
        path: '/system/role',
        title: '角色管理',
        icon: 'el-icon-s-custom',
      },
      {
        path: '/system/permission',
        title: '权限管理',
        icon: 'el-icon-lock',
      },
      {
        path: '/system/rule',
        title: '权限规则',
        icon: 'el-icon-document',
      },
    ],
  },
]

  /**
   * 拉取权限列表
   * 支持分页、搜索，loading 状态自动同步
   */
  async function getList() {
    loading.value = true
    NProgress.start() // 顶部 loading 条
    try {
      const res = await fetchPermissions(query.value)
      list.value = res.list
      total.value = res.total
    } catch (error) {
      // 异常可拓展: 上报/弹窗/记录日志
      console.error('权限列表获取失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 新增权限
   * 自动刷新列表
   */
  async function addPermission(payload: PermissionCreatePayload) {
    loading.value = true
    NProgress.start()
    try {
      await createPermission(payload)
      await getList() // 保证数据一致
    } catch (error) {
      console.error('权限新增失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 编辑权限
   * 自动刷新列表
   */
  async function editPermission(payload: PermissionUpdatePayload) {
    loading.value = true
    NProgress.start()
    try {
      await updatePermission(payload)
      await getList()
    } catch (error) {
      console.error('权限更新失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 删除权限
   * 自动刷新列表
   */
  async function removePermission(id: string) {
    loading.value = true
    NProgress.start()
    try {
      await deletePermission(id)
      await getList()
    } catch (error) {
      console.error('权限删除失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 设置页码，并刷新列表（分页跳转）
   * @param val - 新页码
   */
  function setPage(val: number) {
    page.value = val
    getList()
  }

  /**
   * 设置每页显示条数，并刷新列表
   * @param val - 新 pageSize
   */
  function setPageSize(val: number) {
    pageSize.value = val
    getList()
  }

  /**
   * 设置搜索关键字，重置页码并刷新列表
   * @param val - 搜索内容
   */
  function setSearch(val: string) {
    search.value = val
    page.value = 1 // 搜索后从第一页展示
    getList()
  }

  // 导出所有数据与方法，组件只需解构使用
  return {
    list,           // 权限数据列表
    total,          // 总条数
    page,           // 当前页
    pageSize,       // 每页条数
    search,         // 搜索关键字
    loading,        // 全局 loading
    getList,        // 拉取列表
    addPermission,  // 新增权限
    editPermission, // 编辑权限
    removePermission,// 删除权限
    setPage,        // 设置页码
    setPageSize,    // 设置每页条数
    setSearch,      // 设置搜索关键字
    menuTree,
  }
})

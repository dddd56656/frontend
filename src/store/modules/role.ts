// store/modules/role.ts
// 角色 Pinia Store，完全复用权限模块的管理模式
// —— 谷歌最佳实践：模块化、可复用、最大注释

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import NProgress from 'nprogress'
import {
  fetchRoles,
  createRole,
  updateRole,
  deleteRole,
} from '@/services/role'
import type {
  Role,
  RoleQuery,
  RoleCreatePayload,
  RoleUpdatePayload,
} from '@/types/role'

/**
 * 角色管理 Store
 * 包含：列表、分页、搜索、loading、CRUD
 */
export const useRoleStore = defineStore('role', () => {
  const list = ref<Role[]>([])      // 角色数据
  const total = ref(0)              // 总数
  const page = ref(1)               // 当前页
  const pageSize = ref(20)          // 每页数
  const search = ref('')            // 搜索
  const loading = ref(false)        // loading 状态

  // 查询参数
  const query = computed<RoleQuery>(() => ({
    page: page.value,
    pageSize: pageSize.value,
    search: search.value,
  }))

  /**
   * 获取角色列表
   */
  async function getList() {
    loading.value = true
    NProgress.start()
    try {
      const res = await fetchRoles(query.value)
      list.value = res.list
      total.value = res.total
    } catch (error) {
      console.error('角色列表获取失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 新增角色
   */
  async function addRole(payload: RoleCreatePayload) {
    loading.value = true
    NProgress.start()
    try {
      await createRole(payload)
      await getList()
    } catch (error) {
      console.error('角色新增失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 编辑角色
   */
  async function editRole(payload: RoleUpdatePayload) {
    loading.value = true
    NProgress.start()
    try {
      await updateRole(payload)
      await getList()
    } catch (error) {
      console.error('角色编辑失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 删除角色
   */
  async function removeRole(id: string) {
    loading.value = true
    NProgress.start()
    try {
      await deleteRole(id)
      await getList()
    } catch (error) {
      console.error('角色删除失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  // 分页与搜索同步
  function setPage(val: number) {
    page.value = val
    getList()
  }
  function setPageSize(val: number) {
    pageSize.value = val
    getList()
  }
  function setSearch(val: string) {
    search.value = val
    page.value = 1
    getList()
  }

  return {
    list,
    total,
    page,
    pageSize,
    search,
    loading,
    getList,
    addRole,
    editRole,
    removeRole,
    setPage,
    setPageSize,
    setSearch,
  }
})

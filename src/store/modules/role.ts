// store/modules/role.ts
// 角色管理 Pinia Store
// —— 谷歌最佳实践：状态、行为全部解耦，极致注释，类型单独管理

import { defineStore } from 'pinia'                       // 引入 Pinia 主函数
import { ref, computed } from 'vue'                       // Vue 响应式 API
import {
  fetchRoles,                                             // 获取角色分页列表
  createRole,                                             // 新增角色
  updateRole,                                             // 编辑角色
  deleteRole,                                             // 删除角色
  fetchAllRoles,                                          // 获取全部角色（分配用）
  assignPermissionsToRole,                                // 分配权限
  fetchRolePermissions,                                   // 获取角色已有权限
} from '@/services/role'                                  // 引入所有角色相关接口
import type {
  Role,                                                   // 角色主类型
  RoleQuery,                                              // 分页/搜索类型
  RoleCreatePayload,                                      // 新增参数类型
  RoleUpdatePayload,                                      // 编辑参数类型
} from '@/types/role'                                     // 引入所有角色类型

/**
 * 角色管理 Store
 * - 包含：列表、分页、搜索、CRUD、角色分配权限
 */
export const useRoleStore = defineStore('role', () => {
  // ========= 基础状态 =========
  const list = ref<Role[]>([])                            // 当前角色列表
  const total = ref(0)                                    // 总角色数
  const page = ref(1)                                     // 当前页
  const pageSize = ref(20)                                // 每页条数
  const search = ref('')                                  // 搜索关键字

  // 查询参数（响应式，任何分页/搜索变化自动同步接口参数）
  const query = computed<RoleQuery>(() => ({
    page: page.value,                                     // 当前页
    pageSize: pageSize.value,                             // 每页数量
    search: search.value,                                 // 搜索关键字
  }))

  // ========= 角色列表/CRUD =========

  /**
   * 拉取角色分页列表
   * - 页码、页容量、搜索内容都自动跟随
   */
  async function getList() {
    const res = await fetchRoles(query.value)             // 调用接口
    list.value = res.list                                 // 赋值列表
    total.value = res.total                               // 赋值总数
  }

  /**
   * 新增角色
   * @param payload 新角色参数
   */
  async function addRole(payload: RoleCreatePayload) {
    await createRole(payload)                             // 调用新增接口
    await getList()                                       // 新增后刷新列表
  }

  /**
   * 编辑角色
   * @param payload 编辑参数（含ID）
   */
  async function editRole(payload: RoleUpdatePayload) {
    await updateRole(payload)                             // 调用编辑接口
    await getList()                                       // 编辑后刷新列表
  }

  /**
   * 删除角色
   * @param id 角色ID
   */
  async function removeRole(id: string) {
    await deleteRole(id)                                  // 调用删除接口
    await getList()                                       // 删除后刷新列表
  }

  // ========= 分页与搜索操作 =========

  /**
   * 设置当前页并拉取新列表
   * @param val 新页码
   */
  function setPage(val: number) {
    page.value = val                                      // 更新页码
    getList()                                             // 拉取新页
  }

  /**
   * 设置每页条数并拉取新列表
   * @param val 新每页数量
   */
  function setPageSize(val: number) {
    pageSize.value = val                                  // 更新每页数
    getList()                                             // 拉取新页
  }

  /**
   * 设置搜索内容并回第一页拉新列表
   * @param val 新搜索关键字
   */
  function setSearch(val: string) {
    search.value = val                                    // 更新搜索
    page.value = 1                                        // 搜索自动回第一页
    getList()                                             // 拉取新页
  }

  // ========= 分配权限相关 =========

  const allRoles = ref<Role[]>([])                        // 所有角色（不分页，分配用）
  const assignedPermissionIds = ref<string[]>([])         // 当前角色已分配的权限ID

  /**
   * 拉取所有角色（无分页，分配时用）
   */
  async function getAllRoles() {
    allRoles.value = await fetchAllRoles()                // 赋值全部角色
  }

  /**
   * 拉取某角色当前所有已分配权限
   * @param roleId 角色ID
   */
  async function getRolePermissions(roleId: string) {
    const res = await fetchRolePermissions(roleId)        // 拉接口
    assignedPermissionIds.value = res.permissionIds || [] // 赋值权限ID
  }

  /**
   * 分配权限给角色
   * @param roleId 角色ID
   * @param permissionIds 权限ID数组
   */
  async function assignPermissions(roleId: string, permissionIds: string[]) {
    await assignPermissionsToRole(roleId, permissionIds)  // 分配权限接口
    // 通常分配权限不需要刷新角色列表，除非权限名称要在列表同步显示
  }

  // ========= 对外暴露全部状态和方法 =========

  return {
    // 角色基础列表与分页
    list, total, page, pageSize, search,
    // 基础CRUD
    getList, addRole, editRole, removeRole,
    setPage, setPageSize, setSearch,
    // 分配相关
    allRoles, getAllRoles,                  // 全部角色
    assignedPermissionIds, getRolePermissions, assignPermissions, // 角色分配权限
  }
})

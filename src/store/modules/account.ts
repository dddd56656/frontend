// store/modules/account.ts
// 用户管理 Pinia Store —— 谷歌最佳实践、极致注释、完全解耦

import { defineStore } from 'pinia'                   // 引入 Pinia
import { ref, computed } from 'vue'                    // 响应式 API
import NProgress from 'nprogress'                      // 全局进度条
import {
  fetchAccounts,        // 获取用户列表接口
  createAccount,        // 新建用户接口
  updateAccount,        // 编辑用户接口
  deleteAccount,        // 删除用户接口
  fetchAllRoles,        // 获取所有角色接口
  fetchUserRoles,       // 获取用户已有角色接口
  assignRolesToUser     // 分配角色接口
} from '@/services/account'                            // 用户管理 service 层
import type {
  Account,               // 用户类型
  AccountQuery,          // 用户查询参数类型
  AccountCreatePayload,  // 新建用户参数类型
  AccountUpdatePayload   // 编辑用户参数类型
} from '@/types/account'                               // 引入类型解耦

/**
 * 用户管理 Store
 * 包含：列表、分页、搜索、loading、CRUD、角色分配
 */
export const useAccountStore = defineStore('account', () => {
  // ========== 基础数据区 ==========
  const list = ref<Account[]>([])            // 用户数据列表
  const total = ref(0)                       // 用户总数
  const page = ref(1)                        // 当前页码
  const pageSize = ref(20)                   // 每页条数
  const search = ref('')                     // 搜索关键字
  const loading = ref(false)                 // loading 状态

  // 查询参数（自动响应式，绑定分页与搜索）
  const query = computed<AccountQuery>(() => ({
    page: page.value,                        // 当前页
    pageSize: pageSize.value,                // 每页条数
    search: search.value                     // 搜索内容
  }))

  // ========== 用户角色分配区 ==========
  const allRoles = ref<{ id: string; name: string }[]>([]) // 所有可选角色
  const selectedRoleIds = ref<string[]>([])                // 当前分配的角色

  // ========== 用户列表相关 ==========
  /**
   * 获取用户列表（分页+搜索）
   */
  async function getList() {
    loading.value = true                     // 打开loading
    NProgress.start()                        // 开始进度条
    try {
      const res = await fetchAccounts(query.value) // 调用接口
      list.value = res.list                   // 赋值用户列表
      total.value = res.total                 // 赋值总数
    } catch (error) {
      console.error('用户列表获取失败', error)   // 错误日志
    } finally {
      loading.value = false                  // 关闭loading
      NProgress.done()                       // 关闭进度条
    }
  }

  /**
   * 新建用户
   */
  async function addAccount(payload: AccountCreatePayload) {
    loading.value = true                     // 打开loading
    NProgress.start()                        // 开始进度条
    try {
      await createAccount(payload)           // 创建用户
      await getList()                        // 刷新列表
    } catch (error) {
      console.error('新建用户失败', error)     // 错误日志
    } finally {
      loading.value = false                  // 关闭loading
      NProgress.done()                       // 关闭进度条
    }
  }

  /**
   * 编辑用户
   */
  async function editAccount(payload: AccountUpdatePayload) {
    loading.value = true                     // 打开loading
    NProgress.start()                        // 开始进度条
    try {
      await updateAccount(payload)           // 编辑用户
      await getList()                        // 刷新列表
    } catch (error) {
      console.error('编辑用户失败', error)     // 错误日志
    } finally {
      loading.value = false                  // 关闭loading
      NProgress.done()                       // 关闭进度条
    }
  }

  /**
   * 删除用户
   */
  async function removeAccount(id: string) {
    loading.value = true                     // 打开loading
    NProgress.start()                        // 开始进度条
    try {
      await deleteAccount(id)                // 删除用户
      await getList()                        // 刷新列表
    } catch (error) {
      console.error('删除用户失败', error)     // 错误日志
    } finally {
      loading.value = false                  // 关闭loading
      NProgress.done()                       // 关闭进度条
    }
  }

  // ========== 分页和搜索 ==========
  /**
   * 设置页码并刷新
   */
  function setPage(val: number) {
    page.value = val                         // 设置当前页
    getList()                                // 立即刷新
  }
  /**
   * 设置每页条数并刷新
   */
  function setPageSize(val: number) {
    pageSize.value = val                     // 设置每页条数
    getList()                                // 立即刷新
  }
  /**
   * 设置搜索并刷新（重置页码为1）
   */
  function setSearch(val: string) {
    search.value = val                       // 设置搜索内容
    page.value = 1                           // 搜索自动回第一页
    getList()                                // 立即刷新
  }

  // ========== 角色分配相关 ==========
  /**
   * 获取全部角色（分配弹窗用）
   */
  async function getAllRoles() {
    try {
      allRoles.value = await fetchAllRoles() // 查询全部角色
    } catch (error) {
      allRoles.value = []                    // 出错置空
      console.error('角色列表获取失败', error)
    }
  }

  /**
   * 获取当前用户的已分配角色（弹窗回显）
   */
  async function getUserRoles(userId: string) {
    try {
      selectedRoleIds.value = await fetchUserRoles(userId) // 查询已分配角色
    } catch (error) {
      selectedRoleIds.value = []           // 出错置空
      console.error('查询用户角色失败', error)
    }
  }

  /**
   * 分配角色给用户
   */
  async function assignRoles(userId: string, roleIds: string[]) {
    loading.value = true                  // 打开loading
    NProgress.start()                     // 开始进度条
    try {
      await assignRolesToUser(userId, roleIds) // 调用分配角色接口
      await getList()                           // 刷新列表
    } catch (error) {
      console.error('分配角色失败', error)      // 错误日志
    } finally {
      loading.value = false                   // 关闭loading
      NProgress.done()                        // 关闭进度条
    }
  }

  // ========== 返回对外暴露状态和方法 ==========
  return {
    // 用户列表相关
    list, total, page, pageSize, search, loading,
    getList, addAccount, editAccount, removeAccount,
    setPage, setPageSize, setSearch,
    // 角色分配相关
    allRoles, selectedRoleIds, getAllRoles, getUserRoles, assignRoles,
  }
})

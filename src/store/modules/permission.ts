// 权限管理 Store，Pinia 方案
// —— 只负责状态和业务逻辑，数据类型完全解耦到 types 文件
// —— 符合谷歌最佳实践，极致注释

import { defineStore } from 'pinia'                   // 引入 Pinia
import { ref, computed } from 'vue'                   // 响应式工具
import {
  fetchPermissions,                                  // 拉取列表接口
  createPermission,                                  // 新增接口
  updatePermission,                                  // 编辑接口
  deletePermission,                                  // 删除接口
} from '@/services/permission'                        // 引入服务层
import type {
  Permission,                                        // 权限实体类型
  PermissionQuery,                                   // 查询参数类型
  PermissionCreatePayload,                           // 新增参数类型
  PermissionUpdatePayload,                           // 编辑参数类型
} from '@/types/permission'                           // 引入类型定义

/**
 * 权限管理 Pinia Store
 * - 包含列表、分页、搜索、CRUD
 * - 状态/类型全部解耦
 */
export const usePermissionStore = defineStore('permission', () => {
  // 权限列表（响应式）
  const list = ref<Permission[]>([])                 // 权限数据数组
  // 总数据条数
  const total = ref(0)                               // 权限总数
  // 分页相关状态
  const page = ref(1)                                // 当前页码
  const pageSize = ref(20)                           // 每页显示数量
  // 搜索关键字
  const search = ref('')                             // 搜索内容

  // 查询参数（响应式自动同步）
  const query = computed<PermissionQuery>(() => ({
    page: page.value,                                // 当前页
    pageSize: pageSize.value,                        // 每页数
    search: search.value,                            // 搜索关键词
  }))

  /**
   * 拉取权限列表（分页、搜索等自动带入）
   */
  async function getList() {
    const res = await fetchPermissions(query.value)  // 调用接口获取权限数据
    list.value = res.list                            // 赋值数据
    total.value = res.total                          // 赋值总数
  }

  /**
   * 新增权限
   * @param payload 新增参数
   */
  async function addPermission(payload: PermissionCreatePayload) {
    await createPermission(payload)                  // 新增接口
    await getList()                                  // 新增后刷新
  }

  /**
   * 编辑权限
   * @param payload 编辑参数
   */
  async function editPermission(payload: PermissionUpdatePayload) {
    await updatePermission(payload)                  // 编辑接口
    await getList()                                  // 编辑后刷新
  }

  /**
   * 删除权限
   * @param id 权限ID
   */
  async function removePermission(id: string) {
    await deletePermission(id)                       // 删除接口
    await getList()                                  // 删除后刷新
  }

  /**
   * 设置当前页
   * @param val 页码
   */
  function setPage(val: number) {
    page.value = val                                // 更新页码
    getList()                                       // 自动刷新
  }

  /**
   * 设置每页数量
   * @param val 数量
   */
  function setPageSize(val: number) {
    pageSize.value = val                            // 更新每页数量
    getList()                                       // 自动刷新
  }

  /**
   * 设置搜索内容
   * @param val 关键词
   */
  function setSearch(val: string) {
    search.value = val                              // 更新搜索关键字
    page.value = 1                                  // 搜索重置页码
    getList()                                       // 自动刷新
  }

  // 返回状态与方法，供组件调用
  return {
    list, total, page, pageSize, search,             // 状态
    getList, addPermission, editPermission, removePermission, // 操作
    setPage, setPageSize, setSearch,                 // 分页/搜索
  }
})

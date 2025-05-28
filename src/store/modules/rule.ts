// store/modules/rule.ts
// 权限规则管理 Pinia Store
// —— 完全解耦 types，最大注释，每一步都解释

import { defineStore } from 'pinia'            // 引入 Pinia 方法
import { ref, computed } from 'vue'            // 引入响应式和计算属性
import NProgress from 'nprogress'              // 引入进度条
import {
  fetchRules,         // 拉取规则列表 API
  createRule,         // 新增规则 API
  updateRule,         // 编辑规则 API
  deleteRule          // 删除规则 API
} from '@/services/rule'
import type {
  Rule,               // 规则数据类型
  RuleQuery,          // 查询参数类型
  RuleCreatePayload,  // 新增参数类型
  RuleUpdatePayload   // 编辑参数类型
} from '@/types/rule'

/**
 * 权限规则管理 Store
 * 包含：列表、分页、搜索、loading、CRUD
 */
export const useRuleStore = defineStore('rule', () => {
  // 规则数据列表
  const list = ref<Rule[]>([])      // 存储所有规则数据
  const total = ref(0)              // 总数
  const page = ref(1)               // 当前页码
  const pageSize = ref(20)          // 每页数据条数
  const search = ref('')            // 搜索关键字
  const loading = ref(false)        // 全局loading状态

  // 计算当前的查询参数（页码、条数、搜索）
  const query = computed<RuleQuery>(() => ({
    page: page.value,               // 当前页
    pageSize: pageSize.value,       // 每页条数
    search: search.value,           // 搜索关键字
  }))

  /**
   * 获取规则列表
   */
  async function getList() {
    loading.value = true            // 开启 loading
    NProgress.start()               // 开始全局进度条
    try {
      const res = await fetchRules(query.value) // 请求接口获取数据
      list.value = res.list         // 列表数据赋值
      total.value = res.total       // 总数赋值
    } catch (error) {
      console.error('规则列表获取失败', error) // 错误打印
    } finally {
      loading.value = false         // 关闭 loading
      NProgress.done()              // 结束进度条
    }
  }

  /**
   * 新增规则
   */
  async function addRule(payload: RuleCreatePayload) {
    loading.value = true            // 开启 loading
    NProgress.start()               // 开始全局进度条
    try {
      await createRule(payload)     // 调用新增接口
      await getList()               // 新增后刷新数据
    } catch (error) {
      console.error('规则新增失败', error) // 错误打印
    } finally {
      loading.value = false         // 关闭 loading
      NProgress.done()              // 结束进度条
    }
  }

  /**
   * 编辑规则
   */
  async function editRule(payload: RuleUpdatePayload) {
    loading.value = true            // 开启 loading
    NProgress.start()               // 开始全局进度条
    try {
      await updateRule(payload)     // 调用编辑接口
      await getList()               // 编辑后刷新
    } catch (error) {
      console.error('规则编辑失败', error) // 错误打印
    } finally {
      loading.value = false         // 关闭 loading
      NProgress.done()              // 结束进度条
    }
  }

  /**
   * 删除规则
   */
  async function removeRule(id: string) {
    loading.value = true            // 开启 loading
    NProgress.start()               // 开始全局进度条
    try {
      await deleteRule(id)          // 调用删除接口
      await getList()               // 删除后刷新
    } catch (error) {
      console.error('规则删除失败', error) // 错误打印
    } finally {
      loading.value = false         // 关闭 loading
      NProgress.done()              // 结束进度条
    }
  }

  // 分页与搜索方法，便于组件和UI层解耦
  function setPage(val: number) {
    page.value = val                // 设置当前页
    getList()                       // 重新拉取数据
  }
  function setPageSize(val: number) {
    pageSize.value = val            // 设置每页数量
    getList()                       // 重新拉取数据
  }
  function setSearch(val: string) {
    search.value = val              // 设置搜索
    page.value = 1                  // 搜索自动回第一页
    getList()                       // 重新拉取
  }

  // 导出给view层、组件用的所有状态和方法
  return {
    list,           // 列表
    total,          // 总数
    page,           // 页码
    pageSize,       // 每页数
    search,         // 搜索内容
    loading,        // loading
    getList,        // 获取列表
    addRule,        // 新增
    editRule,       // 编辑
    removeRule,     // 删除
    setPage,        // 设置页码
    setPageSize,    // 设置每页
    setSearch,      // 设置搜索
  }
})

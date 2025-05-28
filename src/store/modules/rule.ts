// store/modules/rule.ts
// 权限规则 Pinia Store，最大化注释与类型解耦
// —— 谷歌最佳实践：与其它模块完全一致，便于统一维护

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import NProgress from 'nprogress'
import {
  fetchRules,
  createRule,
  updateRule,
  deleteRule,
} from '@/services/rule'
import type {
  Rule,
  RuleQuery,
  RuleCreatePayload,
  RuleUpdatePayload,
} from '@/types/rule'

/**
 * 权限规则管理 Store
 * 管理规则列表、分页、搜索、CRUD 等
 */
export const useRuleStore = defineStore('rule', () => {
  const list = ref<Rule[]>([])         // 规则数据
  const total = ref(0)                 // 总数
  const page = ref(1)                  // 当前页
  const pageSize = ref(20)             // 每页数量
  const search = ref('')               // 搜索关键词
  const loading = ref(false)           // loading 状态

  // 规则支持按角色过滤，可扩展
  const roleId = ref<string | undefined>(undefined)

  const query = computed<RuleQuery>(() => ({
    page: page.value,
    pageSize: pageSize.value,
    search: search.value,
    roleId: roleId.value,
  }))

  /**
   * 获取规则列表
   */
  async function getList() {
    loading.value = true
    NProgress.start()
    try {
      const res = await fetchRules(query.value)
      list.value = res.list
      total.value = res.total
    } catch (error) {
      console.error('规则列表获取失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 新增规则
   */
  async function addRule(payload: RuleCreatePayload) {
    loading.value = true
    NProgress.start()
    try {
      await createRule(payload)
      await getList()
    } catch (error) {
      console.error('规则新增失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 编辑规则
   */
  async function editRule(payload: RuleUpdatePayload) {
    loading.value = true
    NProgress.start()
    try {
      await updateRule(payload)
      await getList()
    } catch (error) {
      console.error('规则编辑失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  /**
   * 删除规则
   */
  async function removeRule(id: string) {
    loading.value = true
    NProgress.start()
    try {
      await deleteRule(id)
      await getList()
    } catch (error) {
      console.error('规则删除失败', error)
    } finally {
      loading.value = false
      NProgress.done()
    }
  }

  // 分页、搜索、角色过滤
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
  function setRoleId(val?: string) {
    roleId.value = val
    page.value = 1
    getList()
  }

  return {
    list,
    total,
    page,
    pageSize,
    search,
    roleId,
    loading,
    getList,
    addRule,
    editRule,
    removeRule,
    setPage,
    setPageSize,
    setSearch,
    setRoleId,
  }
})

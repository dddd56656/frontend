// service/rule.ts
// 权限规则模块 API 服务层
// —— RESTful 接口设计，全部最大化注释，便于业务扩展和团队沟通

import axios from 'axios'
import type {
  RuleQuery,
  RuleListResponse,
  RuleCreatePayload,
  RuleUpdatePayload,
  Rule,
} from '@/types/rule'

/**
 * 获取权限规则列表（分页、可选角色过滤/关键字搜索）
 * @param query - 查询参数（页码、页容量、可选搜索、可选 roleId）
 * @returns 规则列表和总条数
 */
export async function fetchRules(query: RuleQuery): Promise<RuleListResponse> {
  // GET 请求，所有参数自动拼接
  const { data } = await axios.get('/api/rules', { params: query })
  return data
}

/**
 * 新增权限规则
 * @param payload - 规则参数（角色id、资源、操作、effect、描述）
 * @returns 创建后的规则实体
 */
export async function createRule(payload: RuleCreatePayload): Promise<Rule> {
  const { data } = await axios.post('/api/rules', payload)
  return data
}

/**
 * 更新权限规则
 * @param payload - 更新参数（包含 id）
 * @returns 更新后的规则对象
 */
export async function updateRule(payload: RuleUpdatePayload): Promise<Rule> {
  const { data } = await axios.put(`/api/rules/${payload.id}`, payload)
  return data
}

/**
 * 删除权限规则
 * @param id - 规则 id
 * @returns void，删除成功即完成
 */
export async function deleteRule(id: string): Promise<void> {
  await axios.delete(`/api/rules/${id}`)
}

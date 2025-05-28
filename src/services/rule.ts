// 权限规则管理 Service 层
// —— 只负责和后端接口通信，类型参数完全独立于业务

import axios from 'axios'                  // 引入 axios 用于HTTP请求
import type {
  Rule,                                   // 权限规则类型
  RuleQuery,                              // 查询参数类型
  RuleListResponse,                       // 列表响应类型
  RuleCreatePayload,                      // 新增参数类型
  RuleUpdatePayload,                      // 编辑参数类型
} from '@/types/rule'

/**
 * 获取权限规则列表（支持分页和搜索）
 * @param query 查询参数
 * @returns 规则列表和总数
 */
export async function fetchRules(query: RuleQuery): Promise<RuleListResponse> {
  // GET请求，参数作为URL查询参数传递
  const { data } = await axios.get('/api/rules', { params: query })
  return data
}

/**
 * 创建新权限规则
 * @param payload 规则参数（名称、描述、表达式）
 * @returns 新建的规则对象
 */
export async function createRule(payload: RuleCreatePayload): Promise<Rule> {
  // POST请求，payload为请求体
  const { data } = await axios.post('/api/rules', payload)
  return data
}

/**
 * 编辑/更新权限规则
 * @param payload 规则参数（包含id字段）
 * @returns 更新后的规则对象
 */
export async function updateRule(payload: RuleUpdatePayload): Promise<Rule> {
  // PUT请求，带规则id
  const { data } = await axios.put(`/api/rules/${payload.id}`, payload)
  return data
}

/**
 * 删除权限规则
 * @param id 规则ID
 * @returns 无返回，成功即为删除
 */
export async function deleteRule(id: string): Promise<void> {
  // DELETE请求
  await axios.delete(`/api/rules/${id}`)
}

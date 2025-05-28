// src/services/account.ts

import http from '@/utils/http' // 引入 axios 实例（带全局拦截、进度条）
import type {
  AccountQuery,            // 查询参数类型
  AccountListResponse,     // 用户列表返回类型
  AccountCreatePayload,    // 新建用户类型
  AccountUpdatePayload,    // 编辑用户类型
  Account                  // 用户类型
} from '@/types/account'

/**
 * 获取用户列表（支持分页与搜索）
 * @param query 查询参数
 * @returns 用户列表及总数
 */
export async function fetchAccounts(query: AccountQuery): Promise<AccountListResponse> {
  // GET 请求，参数放在URL query
  return await http.get<AccountListResponse>('/api/accounts', { params: query })
}

/**
 * 新建用户
 * @param payload 新建参数
 * @returns 新增的用户对象
 */
export async function createAccount(payload: AccountCreatePayload): Promise<Account> {
  // POST 请求，传入完整新建数据
  return await http.post<Account>('/api/accounts', payload)
}

/**
 * 编辑用户
 * @param payload 编辑参数（必须带id）
 * @returns 编辑后的用户对象
 */
export async function updateAccount(payload: AccountUpdatePayload): Promise<Account> {
  // PUT 请求，URL拼接id
  return await http.post<Account>(`/api/accounts/${payload.id}`, payload)
  // 你也可以用 put，如果后端支持（推荐 put）
  // return await http.put<Account>(`/api/accounts/${payload.id}`, payload)
}

/**
 * 删除用户
 * @param id 用户id
 * @returns void
 */
export async function deleteAccount(id: string): Promise<void> {
  // DELETE 请求
  await http.post(`/api/accounts/${id}/delete`)
  // 你也可以用 delete 方法（推荐 delete）
  // await http.delete(`/api/accounts/${id}`)
}

/**
 * 获取所有角色（用于分配角色弹窗，多选用）
 * @returns 角色列表
 */
export async function fetchAllRoles(): Promise<{ id: string; name: string }[]> {
  // GET 所有角色，配合角色分配弹窗使用
  return await http.get<{ id: string; name: string }[]>('/api/roles/all')
}

/**
 * 获取用户已分配的角色（弹窗回显）
 * @param userId 用户id
 * @returns 角色ID数组
 */
export async function fetchUserRoles(userId: string): Promise<string[]> {
  // GET 当前用户的角色
  return await http.get<string[]>(`/api/accounts/${userId}/roles`)
}

/**
 * 分配角色给用户
 * @param userId 用户id
 * @param roleIds 角色id数组
 */
export async function assignRolesToUser(userId: string, roleIds: string[]): Promise<void> {
  // POST 分配角色，传递角色id数组
  await http.post(`/api/accounts/${userId}/roles`, { roleIds })
}

// src/services/role.ts
// 角色模块 API 服务层，全部与 types 解耦
// —— 谷歌最佳实践：接口全部封装，便于维护和异常追踪

import axios from 'axios'  // axios 可替换为你的 http 实例
import type {
  Role,                    // 角色类型
  RoleQuery,               // 查询参数类型
  RoleListResponse,        // 分页响应类型
  RoleCreatePayload,       // 新增参数类型
  RoleUpdatePayload,       // 编辑参数类型
} from '@/types/role'

/**
 * 获取角色列表（支持分页、搜索）
 * @param query 查询参数（页码、页容量、可选搜索）
 * @returns 角色列表+总数
 */
export async function fetchRoles(query: RoleQuery): Promise<RoleListResponse> {
  // GET 请求，参数拼到URL
  const { data } = await axios.get('/api/roles', { params: query })
  // data格式假设为 { list: [], total: number }
  return data
}

/**
 * 新增角色
 * @param payload 新角色参数
 * @returns 创建成功的角色对象
 */
export async function createRole(payload: RoleCreatePayload): Promise<Role> {
  // POST 提交表单，后端返回创建的角色对象
  const { data } = await axios.post('/api/roles', payload)
  return data
}

/**
 * 编辑角色
 * @param payload 编辑参数，需带ID
 * @returns 编辑后的角色对象
 */
export async function updateRole(payload: RoleUpdatePayload): Promise<Role> {
  // PUT 方式提交，路径带ID
  const { data } = await axios.put(`/api/roles/${payload.id}`, payload)
  return data
}

/**
 * 删除角色
 * @param id 角色ID
 * @returns void 删除成功无返回
 */
export async function deleteRole(id: string): Promise<void> {
  await axios.delete(`/api/roles/${id}`)
}

/**
 * 获取所有角色（用于下拉/分配，无分页）
 * @returns 角色数组
 */
export async function fetchAllRoles(): Promise<Role[]> {
  // 返回全部，不分页
  const { data } = await axios.get('/api/roles/all')
  return data
}

/**
 * 给角色分配权限
 * @param roleId 角色ID
 * @param permissionIds 权限ID数组
 * @returns void
 */
export async function assignPermissionsToRole(roleId: string, permissionIds: string[]): Promise<void> {
  // POST到角色/权限关系接口
  await axios.post(`/api/roles/${roleId}/permissions`, { permissionIds })
}

/**
 * 查询角色拥有的权限ID
 * @param roleId 角色ID
 * @returns 权限ID数组
 */
export async function fetchRolePermissions(roleId: string): Promise<{ permissionIds: string[] }> {
  // GET角色权限接口
  const { data } = await axios.get(`/api/roles/${roleId}/permissions`)
  return data
}

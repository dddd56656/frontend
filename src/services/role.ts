// service/role.ts
// 角色模块 API 服务层
// —— 所有与后端的角色数据通信、接口统一封装，便于维护、mock、异常追踪

import axios from 'axios'
import type {
  RoleQuery,
  RoleListResponse,
  RoleCreatePayload,
  RoleUpdatePayload,
  Role,
} from '@/types/role'

/**
 * 获取角色列表（分页/搜索）
 * @param query - 查询参数（页码、页容量、可选搜索）
 * @returns 角色列表和总数
 */
export async function fetchRoles(query: RoleQuery): Promise<RoleListResponse> {
  // 通过 GET 查询，query 作为 URL 参数传递
  const { data } = await axios.get('/api/roles', { params: query })
  return data
}

/**
 * 创建新角色
 * @param payload - 角色参数（名称、编码、描述、权限id列表）
 * @returns 创建后的角色对象
 */
export async function createRole(payload: RoleCreatePayload): Promise<Role> {
  // POST 提交
  const { data } = await axios.post('/api/roles', payload)
  return data
}

/**
 * 更新角色
 * @param payload - 角色参数（包含 id 字段）
 * @returns 更新后的角色对象
 */
export async function updateRole(payload: RoleUpdatePayload): Promise<Role> {
  // PUT 带 id
  const { data } = await axios.put(`/api/roles/${payload.id}`, payload)
  return data
}

/**
 * 删除角色
 * @param id - 角色 id
 * @returns void，删除成功无返回
 */
export async function deleteRole(id: string): Promise<void> {
  await axios.delete(`/api/roles/${id}`)
}

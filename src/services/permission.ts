// service/permission.ts
// 权限模块服务层，负责与后端 API 通信
// —— 谷歌最佳实践：所有异步接口封装在 service 层，便于后续 mock/切换/统一异常处理

import axios from 'axios'
import type {
  PermissionQuery,
  PermissionListResponse,
  PermissionCreatePayload,
  PermissionUpdatePayload,
  Permission,
} from '@/types/permission'

/**
 * 获取权限列表（分页 + 搜索）
 * @param query - 查询参数，包含页码、每页数量、可选的搜索关键字
 * @returns 包含权限列表和总条数
 */
export async function fetchPermissions(query: PermissionQuery): Promise<PermissionListResponse> {
  // axios 自动处理 query 参数拼接
  const { data } = await axios.get('/api/permissions', { params: query })
  return data
}

/**
 * 创建新权限
 * @param payload - 权限信息（名称、编码、描述）
 * @returns 创建后的权限实体
 */
export async function createPermission(payload: PermissionCreatePayload): Promise<Permission> {
  // post 提交新增数据
  const { data } = await axios.post('/api/permissions', payload)
  return data
}

/**
 * 更新权限
 * @param payload - 更新数据（包含 id）
 * @returns 更新后的权限实体
 */
export async function updatePermission(payload: PermissionUpdatePayload): Promise<Permission> {
  // put 方法按 REST 规范，参数带 id
  const { data } = await axios.put(`/api/permissions/${payload.id}`, payload)
  return data
}

/**
 * 删除权限
 * @param id - 权限 id
 * @returns 无返回值，删除成功即完成
 */
export async function deletePermission(id: string): Promise<void> {
  await axios.delete(`/api/permissions/${id}`)
}

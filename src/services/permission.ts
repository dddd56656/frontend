import http from '@/utils/http' // 通用 axios 实例，自动处理进度条和异常
import type {
  Permission,                   // 权限实体类型
  PermissionQuery,              // 查询参数类型
  PermissionListResponse,       // 分页返回类型
  PermissionCreatePayload,      // 新增参数类型
  PermissionUpdatePayload,      // 更新参数类型
} from '@/types/permission'

/**
 * 获取权限列表（支持分页和搜索）
 * @param query - 查询参数
 * @returns 权限列表及总数
 */
export async function fetchPermissions(query: PermissionQuery): Promise<PermissionListResponse> {
  // GET 请求，query 自动拼接为 URL 参数
  return await http.get<PermissionListResponse>('/api/permissions', { params: query })
}

/**
 * 新增权限
 * @param payload - 新建权限参数
 * @returns 新建后的权限对象
 */
export async function createPermission(payload: PermissionCreatePayload): Promise<Permission> {
  // POST 请求，payload 作为请求体
  return await http.post<Permission>('/api/permissions', payload)
}

/**
 * 更新权限
 * @param payload - 编辑权限参数（包含ID）
 * @returns 更新后的权限对象
 */
export async function updatePermission(payload: PermissionUpdatePayload): Promise<Permission> {
  // PUT 请求，带ID做资源更新
  return await http.post<Permission>(`/api/permissions/${payload.id}`, payload)
  // 若后端要求PUT，则改为http.put
}

/**
 * 删除权限
 * @param id - 权限ID
 * @returns void，删除成功无返回
 */
export async function deletePermission(id: string): Promise<void> {
  // DELETE 请求，URL带ID
  await http.post(`/api/permissions/${id}/delete`)
  // 若后端要求DELETE，则改为http.delete
}

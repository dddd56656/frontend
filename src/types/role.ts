// src/types/role.ts
// 角色类型定义，完全解耦业务与数据结构
// —— 谷歌最佳实践：类型单独维护，提升可维护性

/**
 * 角色基础类型
 */
export interface Role {
  id: string           // 角色唯一ID
  name: string         // 角色名称
  desc?: string        // 描述（可选）
  permissionIds?: string[] // 角色绑定的权限ID数组
}

/**
 * 角色分页/搜索请求参数
 */
export interface RoleQuery {
  page: number         // 页码
  pageSize: number     // 每页条数
  search?: string      // 搜索关键字（可选）
}

/**
 * 角色列表分页响应格式
 */
export interface RoleListResponse {
  list: Role[]         // 当前页角色数组
  total: number        // 总数
}

/**
 * 新增角色参数
 */
export interface RoleCreatePayload {
  name: string         // 角色名
  desc?: string        // 描述
  permissionIds?: string[] // 权限ID数组
}

/**
 * 编辑角色参数（带ID）
 */
export interface RoleUpdatePayload extends RoleCreatePayload {
  id: string           // 角色ID
}

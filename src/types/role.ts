// types/role.ts
// 角色模块类型定义，结构与权限业务完全一致，便于维护
// —— 谷歌最佳实践：类型集中管理、全局解耦、文档级注释

/**
 * 角色实体结构
 */
export interface Role {
  id: string                 // 角色唯一标识
  name: string               // 角色名称
  code: string               // 角色编码（唯一、供系统内部鉴权/判断）
  description?: string       // 角色描述（可选）
  permissions: string[]      // 角色拥有的权限id列表
  createdAt: string          // 创建时间
  updatedAt: string          // 更新时间
}

/**
 * 角色查询参数
 */
export interface RoleQuery {
  page: number               // 当前页码
  pageSize: number           // 每页条数
  search?: string            // 搜索关键字（支持模糊匹配）
}

/**
 * 角色列表返回结构
 */
export interface RoleListResponse {
  list: Role[]               // 角色数据列表
  total: number              // 总数（分页用）
}

/**
 * 新增角色参数
 */
export interface RoleCreatePayload {
  name: string               // 名称
  code: string               // 编码
  description?: string       // 描述
  permissions?: string[]     // 绑定的权限id列表（可选）
}

/**
 * 更新角色参数
 */
export interface RoleUpdatePayload extends RoleCreatePayload {
  id: string                 // 待更新角色id
}

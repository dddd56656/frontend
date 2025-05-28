// types/permission.ts
// 权限模块类型定义，所有类型集中管理，便于维护和全局复用
// —— 谷歌最佳实践：类型与实现分离，接口/业务数据/入参出参全部单独声明

/**
 * 权限实体结构
 */
export interface Permission {
  id: string                // 权限唯一标识
  name: string              // 权限名称
  code: string              // 权限编码（唯一、用于业务鉴权）
  description?: string      // 权限描述（可选）
  createdAt: string         // 创建时间（ISO 格式）
  updatedAt: string         // 更新时间（ISO 格式）
}

/**
 * 权限查询参数
 */
export interface PermissionQuery {
  page: number              // 当前页码
  pageSize: number          // 每页条数
  search?: string           // 搜索关键字（可选，支持模糊匹配 name/code/description）
}

/**
 * 权限列表接口返回结构
 */
export interface PermissionListResponse {
  list: Permission[]        // 当前页权限列表
  total: number             // 总数据量，用于分页
}

/**
 * 创建权限时提交的数据结构
 */
export interface PermissionCreatePayload {
  name: string              // 新权限名称
  code: string              // 新权限编码
  description?: string      // 描述（可选）
}

/**
 * 更新权限时提交的数据结构
 * 继承自创建类型，并额外加上 id 字段
 */
export interface PermissionUpdatePayload extends PermissionCreatePayload {
  id: string                // 待更新权限 id
}

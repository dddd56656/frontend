// 权限实体类型
export interface Permission {
  id: string         // 权限ID（主键，唯一）
  name: string       // 权限名
  code: string       // 权限编码（英文唯一，业务用）
  desc: string       // 权限描述
  // 可以根据业务扩展其它字段
}

// 权限分页查询参数
export interface PermissionQuery {
  page: number       // 当前页
  pageSize: number   // 每页条数
  search?: string    // 搜索关键字，可选
}

// 权限新增参数
export interface PermissionCreatePayload {
  name: string       // 名称
  code: string       // 编码
  desc?: string      // 描述
}

// 权限更新参数
export interface PermissionUpdatePayload {
  id: string         // 权限ID
  name: string       // 名称
  code: string       // 编码
  desc?: string      // 描述
}

// 权限分页接口返回
export interface PermissionListResponse {
  list: Permission[] // 当前页数据
  total: number      // 总数
}

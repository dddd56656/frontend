// types/rule.ts
// 权限规则类型定义，通常是角色-资源-操作的关联关系
// —— 谷歌最佳实践：类型单独维护，便于扩展/维护/自动生成文档

/**
 * 权限规则实体结构
 */
export interface Rule {
  id: string                // 规则唯一标识
  roleId: string            // 所属角色id
  resource: string          // 资源标识（如 menu、api、button）
  action: string            // 动作类型（如 read、write、delete）
  effect: 'allow' | 'deny'  // 允许/拒绝
  description?: string      // 描述
  createdAt: string         // 创建时间
  updatedAt: string         // 更新时间
}

/**
 * 规则查询参数
 */
export interface RuleQuery {
  page: number              // 当前页
  pageSize: number          // 每页数量
  search?: string           // 搜索关键字
  roleId?: string           // 指定角色过滤（可选）
}

/**
 * 规则列表返回结构
 */
export interface RuleListResponse {
  list: Rule[]              // 当前页规则
  total: number             // 总条数
}

/**
 * 新增规则参数
 */
export interface RuleCreatePayload {
  roleId: string            // 角色id
  resource: string          // 资源名
  action: string            // 操作名
  effect: 'allow' | 'deny'  // 允许/拒绝
  description?: string      // 描述（可选）
}

/**
 * 更新规则参数
 */
export interface RuleUpdatePayload extends RuleCreatePayload {
  id: string                // 规则id
}

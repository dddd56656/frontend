// 权限规则 Rule 相关类型定义
// —— 彻底解耦接口与类型，便于维护和协作

// 权限规则数据结构
export interface Rule {
  id: string           // 规则ID，唯一标识
  name: string         // 规则名称
  desc?: string        // 规则描述，可选
  expression?: string  // 规则表达式（如条件公式），可选
}

// 查询参数结构（分页+搜索）
export interface RuleQuery {
  page: number         // 当前页码
  pageSize: number     // 每页条数
  search?: string      // 搜索关键字，可选
}

// 列表响应结构
export interface RuleListResponse {
  list: Rule[]         // 规则数据数组
  total: number        // 总条数
}

// 新增规则参数结构
export interface RuleCreatePayload {
  name: string         // 规则名称
  desc?: string        // 规则描述，可选
  expression?: string  // 规则表达式，可选
}

// 编辑规则参数结构（带ID）
export interface RuleUpdatePayload extends RuleCreatePayload {
  id: string           // 规则ID
}

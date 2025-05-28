// src/types/account.ts

/**
 * 用户基本类型
 */
export interface Account {
  id: string;             // 用户唯一ID
  username: string;       // 用户名
  email: string;          // 邮箱
  phone?: string;         // 电话（可选）
  status?: 'active' | 'inactive'; // 状态
  roles?: string[];       // 关联的角色ID列表
  // 你还可以加 avatar、部门等字段
}

/**
 * 用户查询参数
 */
export interface AccountQuery {
  page: number;           // 当前页
  pageSize: number;       // 每页条数
  search?: string;        // 搜索关键字
}

/**
 * 用户列表接口返回
 */
export interface AccountListResponse {
  list: Account[];        // 用户列表
  total: number;          // 总数
}

/**
 * 新建用户参数
 */
export interface AccountCreatePayload {
  username: string;       // 用户名
  email: string;          // 邮箱
  phone?: string;         // 电话
  password: string;       // 密码（创建时必填）
  roles?: string[];       // 关联角色
}

/**
 * 编辑用户参数
 */
export interface AccountUpdatePayload {
  id: string;             // 用户ID
  username?: string;      // 用户名
  email?: string;         // 邮箱
  phone?: string;         // 电话
  status?: 'active' | 'inactive'; // 状态
  roles?: string[];       // 关联角色
  // 密码编辑通常单独做重置，不建议在编辑接口里出现
}

/**
 * 用户模块相关类型
 * 按Google级标准独立维护，便于多人协作和类型扩展
 */

export interface UserInfo {
  id: string
  name: string
  email: string
  avatarUrl?: string
  isLoggedIn: boolean
  // 可扩展如角色、权限、token等
}

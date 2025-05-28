/**
 * 用户模块类型定义（Google风格）
 * 只做类型声明，适合多人协作、未来扩展
 */
export interface UserInfo {
  id: string                // 用户唯一ID
  name: string              // 用户名
  email: string             // 邮箱
  avatarUrl?: string        // 头像URL
  isLoggedIn: boolean       // 登录状态
  // 可拓展：roles, permissions, token等
}

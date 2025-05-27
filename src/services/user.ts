/**
 * 用户相关API & 业务逻辑（service层）
 * - 只负责异步API、数据转换、复杂流程
 * - 类型全部解耦，只用import type { UserInfo } from ...
 */

import http from '@/utils/http'
import type { UserInfo } from '@/store/types/user'

/**
 * 用户登录
 * @param username 用户名
 * @param password 密码
 * @returns 用户信息
 */
export function loginApi(username: string, password: string) {
  return http.post<UserInfo>('/api/login', { username, password })
}

/**
 * 获取当前用户信息
 */
export function fetchUserApi() {
  return http.get<UserInfo>('/api/user')
}

/**
 * 用户登出
 */
export function logoutApi() {
  return http.post<void>('/api/logout')
}

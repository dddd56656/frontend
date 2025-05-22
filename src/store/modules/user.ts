/**
 * 用户模块 Pinia Store
 * - 最大化注释，适合中大型项目
 * - 所有类型全部引自 types
 * - 推荐actions仅做状态变更和业务分发，异步API独立service层
 */
import { defineStore } from 'pinia'
import type { UserInfo } from '../types/user'

/**
 * 推荐：state用工厂函数返回，避免全局状态污染
 */
export const useUserStore = defineStore('user', {
  // 1. State: 用户基本信息，登录状态等
  state: (): UserInfo => ({
    id: '',
    name: '访客',
    email: '',
    avatarUrl: '',
    isLoggedIn: false
  }),

  // 2. Actions: 所有业务相关操作（登录、登出、拉取用户信息等）
  actions: {
    /**
     * 用户登录
     * @param info 用户信息对象（建议后端返回后再保存）
     */
    login(info: Omit<UserInfo, 'isLoggedIn'>) {
      this.id = info.id
      this.name = info.name
      this.email = info.email
      this.avatarUrl = info.avatarUrl
      this.isLoggedIn = true
    },

    /**
     * 用户登出（重置所有用户信息）
     */
    logout() {
      this.id = ''
      this.name = '访客'
      this.email = ''
      this.avatarUrl = ''
      this.isLoggedIn = false
    },

    /**
     * 拉取用户信息（通常配合API异步获取，推荐实际业务中封装独立service）
     */
    async fetchUser() {
      // TODO: 调用真实接口，以下为模拟数据
      const res = {
        id: '1',
        name: '张三',
        email: 'zhangsan@example.com',
        avatarUrl: 'https://api.dicebear.com/8.x/pixel-art/svg?seed=user'
      }
      this.login(res)
    }
  },

  // 3. Getters: 推荐分文件复杂业务单独抽取
  getters: {
    /**
     * 用户昵称首字母大写
     */
    displayName: (state): string => state.name ? state.name.charAt(0).toUpperCase() + state.name.slice(1) : '访客'
  }
})

/**
 * 用户Pinia Store（只做状态与同步变更）
 * - Google标准：全部类型解耦，最大注释
 * - 只做本地状态管理/变更/展示，异步交由service
 */

import { defineStore } from 'pinia'
import type { UserInfo } from '@/types/user'
import { loginApi, fetchUserApi, logoutApi } from '@/services/user'

export const useUserStore = defineStore('user', {
  /**
   * 1. State：本地用户信息
   */
  state: (): UserInfo => ({
    id: '',
    name: '访客',
    email: '',
    avatarUrl: '',
    isLoggedIn: false
  }),

  /**
   * 2. Actions：同步变更+异步业务（推荐复杂业务分离出service层）
   */
  actions: {
    /**
     * 本地登录变更（仅存数据，不调接口）
     * @param info 登录成功后的用户信息
     */
    setLogin(info: Omit<UserInfo, 'isLoggedIn'>) {
      this.id = info.id
      this.name = info.name
      this.email = info.email
      this.avatarUrl = info.avatarUrl ?? ''
      this.isLoggedIn = true
    },

    /**
     * 本地登出变更（重置所有状态）
     */
    setLogout() {
      this.id = ''
      this.name = '访客'
      this.email = ''
      this.avatarUrl = ''
      this.isLoggedIn = false
    },

    /**
     * 登录流程（调API + 本地写入）
     */
    async login(username: string, password: string) {
      const user = await loginApi(username, password)
      console.log('用户信息' + user)

      this.setLogin(user)
      // === 推荐：持久化写入localStorage（大厂标准做法） ===
      console.log('userInfo' + JSON.stringify(user))

      // 可选：本地存储token等
    },

    /**
     * 拉取当前用户信息并写入本地
     */
    async fetchUser() {
      const user = await fetchUserApi()
      this.setLogin(user)
    },

    /**
     * 登出流程（调API + 本地清理）
     */
    async logout() {
      await logoutApi()
      this.setLogout()
      // 可选：清理token
    }
  },


  // 3. Getters: 派生属性，专用于 UI/组件消费
  getters: {
    /**
     * 用户名首字母大写（演示型）
     */
    displayName: (state): string =>
      state.name ? state.name.charAt(0).toUpperCase() + state.name.slice(1) : '访客',

    /**
     * Getter: 返回完整用户信息对象（供布局/业务组件全局消费）
     * - 谷歌推荐风格：Getter始终返回一个深拷贝，避免响应式污染外部对象。
     * - 兼容 const userInfo = computed(() => useUserStore().userInfo)
     */
    userInfo: (state): UserInfo => ({
      id: state.id,
      name: state.name,
      email: state.email,
      avatarUrl: state.avatarUrl,
      isLoggedIn: state.isLoggedIn
    }),
    // 也可简写为 state => state，但显式对象复制更安全。
  },

  persist: true // 开启自动持久化，所有state字段自动同步到本地

})

import { defineStore } from 'pinia'

// defineStore第一个参数为唯一ID，便于调试和多实例管理
export const useUserStore = defineStore('user', {
  // 统一state管理用户数据，提高可维护性
  state: () => ({
    name: '未登录用户',
    isLoggedIn: false,
  }),
  // actions封装业务逻辑，便于代码复用
  actions: {
    login(name: string) {
      this.name = name
      this.isLoggedIn = true
    },
    logout() {
      this.name = '未登录用户'
      this.isLoggedIn = false
    },
  },
})

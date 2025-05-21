// src/store/useUserStore.ts
import { defineStore } from 'pinia'
import http from '@/utils/http'
import type { UserInfo } from '@/types/user'

export const useUserStore = defineStore('user', {
  state: () => ({
    name: '未登录用户' as string,
    isLoggedIn: false as boolean,
  }),
  actions: {
    async login(name: string) {
      // 演示写死，实际可以用 http.post 登录
      this.name = name
      this.isLoggedIn = true
    },
    logout() {
      this.name = '未登录用户'
      this.isLoggedIn = false
    },
    async fetchUser() {
      // 泛型声明：确保 data 是 UserInfo 类型
      const data = await http.get<UserInfo>('/users/1')
      this.name = data.name
      this.isLoggedIn = data.isLoggedIn
    }
  }
})

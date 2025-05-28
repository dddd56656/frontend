import axios  from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import router from '@/router' // 若用SPA跳转，否则可用location.href
import { useUserStore } from '@/store/modules/user'

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

http.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
)

http.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data
    }
    return response.data
  },
  (error: AxiosError) => {
    // === 统一处理token过期/失效 ===
    // 1. 如果是http层401
    if (error.response && error.response.status === 401) {
      // 2. 清理用户store，自动登出
      const userStore = useUserStore()
      userStore.setLogout?.()
      // 3. 跳转登录页，防止死循环/多次重定向用replace
      router.replace('/login')
      // 或 window.location.href = '/login'
    }
    // 4. 也可以根据后端返回自定义错误码处理
    // if (error.response && error.response.data && error.response.data.code === 'TOKEN_EXPIRED') {
    //   ...
    // }
    return Promise.reject(error)
  })

// 重点是这一行的泛型
const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return http.get<unknown, T>(url, config)
}

const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return http.post<unknown, T>(url, data, config)
}

export default { get, post }

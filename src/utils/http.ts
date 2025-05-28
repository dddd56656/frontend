import axios  from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import router from '@/router'
import { useUserStore } from '@/store/modules/user'
import NProgress from 'nprogress' // 1. 引入NProgress

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' }
})

// === 请求发起时自动启动进度条 ===
http.interceptors.request.use(
  config => {
    NProgress.start() // 2. 每次请求自动开始进度条
    return config
  },
  error => {
    NProgress.done() // 3. 请求出错也立即关闭进度条
    return Promise.reject(error)
  }
)

// === 响应返回/出错都关闭进度条 ===
http.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done() // 4. 每次响应完成自动关闭进度条
    if (response.data && typeof response.data === 'object' && 'data' in response.data) {
      return response.data.data
    }
    return response.data
  },
  (error: AxiosError) => {
    NProgress.done() // 5. 响应出错也要关闭进度条，防止卡住
    // === 统一处理token过期/失效 ===
    if (error.response && error.response.status === 401) {
      const userStore = useUserStore()
      userStore.setLogout?.()
      router.replace('/login')
    }
    return Promise.reject(error)
  })

// 泛型请求封装
const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return http.get<unknown, T>(url, config)
}

const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return http.post<unknown, T>(url, data, config)
}

export default { get, post }

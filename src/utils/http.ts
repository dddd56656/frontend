import axios  from 'axios'
import type { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'

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
  (error: AxiosError) => Promise.reject(error)
)

// 重点是这一行的泛型
const get = <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
  return http.get<unknown, T>(url, config)
}

const post = <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<T> => {
  return http.post<unknown, T>(url, data, config)
}

export default { get, post }

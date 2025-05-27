import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
  checker({
    vueTsc: true,   // 仍然跑 vue-tsc 类型检查
    eslint: false   // 屏蔽 eslint 通道，避免报错
  })
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/styles/variables.scss" as *;`
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'), // 注意不要 './src'，要 'src'
    },
  },
  server: {
    proxy: {
      // 只要是 /api 开头的请求，代理到后端
      '/api': {
        target: 'https://5e630207-9d74-4a55-986b-0054e8117c52.mock.pstmn.io',   // 后端接口地址
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, ''),
      }
    }
  },
})

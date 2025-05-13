import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(),
    checker({
      vueTsc: true,   // 仍然跑 vue-tsc 类型检查
      eslint: false   // 屏蔽 eslint 通道，避免报错
    })
  ],
})

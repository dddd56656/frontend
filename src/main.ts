/**
 * 应用主入口（main.ts）
 * - 注册Pinia、Router、ElementPlus等
 * - 最大化注释，团队友好
 */

import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import { pinia } from '@/store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'


// 创建vue app
const app = createApp(App)

// 注册全局插件
app.use(pinia)
app.use(router)
app.use(ElementPlus)

// 挂载应用
app.mount('#app')

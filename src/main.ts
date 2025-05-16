import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入自定义router和pinia模块
import { router } from './router'
import { pinia } from './store'

// 创建Vue应用实例
const app = createApp(App)

// 注册Pinia插件（全局状态管理）
app.use(pinia)

// 注册Router插件（全局路由管理）
app.use(router)

// 挂载到根节点
app.mount('#app')
createApp(App).mount('#app')

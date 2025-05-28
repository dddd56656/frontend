// 引入并创建Pinia实例，便于主入口集成
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'

// 导出Pinia实例
const pinia = createPinia()
pinia.use(piniaPersist)
export default pinia
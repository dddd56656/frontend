// types/menu.ts
// 菜单项类型，递归结构，最大注释
export interface MenuItem {
  path: string                   // 路由路径
  title: string                  // 菜单标题
  icon?: string                  // 图标class
  children?: MenuItem[]          // 子菜单（递归自身）
}

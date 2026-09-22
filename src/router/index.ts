import { createRouter, createWebHistory } from 'vue-router'
import { constantRoutes } from '@/router/routes/constant'

/**
 * 应用路由实例。
 * 初始只挂登录 / 布局壳 / 404，业务路由由守卫按模式再注入。
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: constantRoutes,
  // 切页后滚回顶部，避免长列表残留滚动位置。
  scrollBehavior: () => ({ top: 0 }),
})

/**
 * 按路由 name 批量移除动态路由。
 * 退出登录或权限重置时清掉已 addRoute 的业务页，避免脏路由残留。
 */
export function resetRouter(names: string[]) {
  names.forEach((name) => {
    if (router.hasRoute(name)) router.removeRoute(name)
  })
}

export default router

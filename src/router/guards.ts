import type { Router } from 'vue-router'
import { getToken } from '@/utils/auth'
import { usePermissionStore } from '@/stores/permission'
import { useUserStore } from '@/stores/user'
import { useTagsViewStore } from '@/stores/tagsView'
import { firstLeafMenu } from '@/router/helper'

/** 未登录也可访问的路径，避免守卫把登录页自己重定向到登录页。 */
const WHITE_LIST = new Set(['/login', '/404'])

/**
 * 注册全局前置守卫：鉴权、拉菜单、处理根路径跳转。
 */
export function setupRouterGuard(router: Router) {
  router.beforeEach(async (to) => {
    const token = getToken()

    // 1. 无 token：白名单放行，其余一律去登录并带上原地址。
    if (!token) {
      if (WHITE_LIST.has(to.path)) return true
      return { path: '/login', query: { redirect: to.fullPath } }
    }

    // 2. 已登录再进登录页，直接回首页（后续会落到第一个菜单）。
    if (to.path === '/login') {
      return { path: '/' }
    }

    const permission = usePermissionStore()
    // 3. 首次进入后台：生成静态或动态路由，再 replace 一次让新路由生效。
    if (!permission.isReady) {
      try {
        await permission.generateRoutes()
        const first = firstLeafMenu(permission.menus)
        // 访问 `/` 时落到第一个可见叶子菜单，对应固定页签。
        if (first && (to.path === '/' || to.redirectedFrom?.path === '/')) {
          return { path: first.path, replace: true }
        }
        return { ...to, replace: true }
      } catch {
        // 拉菜单失败视为会话无效：清用户、权限、页签后回登录。
        const user = useUserStore()
        const tags = useTagsViewStore()
        user.logout()
        permission.reset()
        tags.reset()
        return { path: '/login' }
      }
    }

    // 4. 路由已就绪时访问 `/`，同样落到第一个叶子菜单。
    if (to.path === '/') {
      const first = firstLeafMenu(permission.menus)
      if (first) return { path: first.path, replace: true }
    }

    return true
  })
}

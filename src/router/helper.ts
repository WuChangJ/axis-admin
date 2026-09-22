import type { RouteRecordRaw } from 'vue-router'
import type { MenuRecord } from '@/api/mock'
import ParentView from '@/layouts/ParentView.vue'

/** 预收集 views 下所有页面，动态路由用 component 字符串映射到真实模块。 */
const viewModules = import.meta.glob('../views/**/*.vue')

/**
 * 把菜单里的 component 字段解析成路由组件。
 * ParentView 用于只有子路由的目录节点；找不到页则落到 404。
 */
export function resolveView(component?: string) {
  if (!component || component === 'ParentView') return ParentView
  const key = `../views/${component}.vue`
  const loader = viewModules[key]
  if (!loader) {
    return viewModules['../views/error/404.vue'] ?? ParentView
  }
  return loader
}

/**
 * 把后端/mock 菜单树转成 Vue Router 记录。
 * 递归处理 children，并透传 redirect、meta。
 */
export function transformRoutes(menus: MenuRecord[]): RouteRecordRaw[] {
  return menus.map((item) => {
    const route: RouteRecordRaw = {
      path: item.path,
      name: item.name,
      component: resolveView(item.component),
      meta: item.meta ?? {},
      children: item.children?.length ? transformRoutes(item.children) : undefined,
    }
    if (item.redirect) route.redirect = item.redirect
    return route
  })
}

/** 侧栏渲染用的精简菜单结构（路径已拼成绝对路径）。 */
export interface AppMenu {
  path: string
  name: string
  title: string
  icon?: string
  children?: AppMenu[]
}

/**
 * 从路由表生成侧栏数据。
 * 过滤 hidden、无 title 的项，并把相对 path 拼到父级后面。
 */
export function menusFromRoutes(routes: RouteRecordRaw[], parentPath = ''): AppMenu[] {
  return routes
    .filter((route) => !route.meta?.hidden && route.meta?.title)
    .map((route) => {
      const path = resolvePath(parentPath, String(route.path))
      return {
        path,
        name: String(route.name ?? path),
        title: String(route.meta?.title),
        icon: route.meta?.icon,
        children: route.children?.length ? menusFromRoutes(route.children, path) : undefined,
      }
    })
}

/**
 * 取菜单树第一个叶子节点。
 * 用于登录后默认页、以及固定在 TagsView 上的首个页签。
 */
export function firstLeafMenu(menus: AppMenu[]): AppMenu | null {
  const first = menus[0]
  if (!first) return null
  if (first.children?.length) return firstLeafMenu(first.children)
  return first
}

/**
 * 拼接父子路径。
 * 已经是绝对路径的子项不再加前缀。
 */
function resolvePath(parent: string, path: string) {
  if (path.startsWith('/')) return path
  if (!parent) return `/${path}`
  return `${parent.replace(/\/$/, '')}/${path}`
}

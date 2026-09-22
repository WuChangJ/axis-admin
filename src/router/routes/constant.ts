import type { RouteRecordRaw } from 'vue-router'

/** 后台布局路由 name，动态/静态业务页都挂在它的 children 上。 */
export const LAYOUT_NAME = 'AdminLayout'

/**
 * 应用启动时就注册的常量路由。
 * 不含业务菜单，保证未登录也能进登录页和 404。
 */
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true, title: 'common.login' },
  },
  {
    path: '/',
    name: LAYOUT_NAME,
    component: () => import('@/layouts/AdminLayout.vue'),
    redirect: '/dashboard',
    // children 由 permission store 在 generateRoutes 时 addRoute。
    children: [],
  },
  {
    path: '/404',
    name: 'NotFound',
    component: () => import('@/views/error/404.vue'),
    meta: { hidden: true, title: 'common.pageNotFound' },
  },
]

/**
 * 通配 404，必须在业务路由注入之后再添加，
 * 否则会抢先匹配尚未注册的页面。
 */
export const notFoundRoute: RouteRecordRaw = {
  path: '/:pathMatch(.*)*',
  name: 'CatchAll',
  redirect: '/404',
  meta: { hidden: true },
}

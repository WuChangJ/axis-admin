import type { RouteRecordRaw } from 'vue-router'
import ParentView from '@/layouts/ParentView.vue'

/**
 * 静态模式下注入到 AdminLayout 下的业务路由。
 * 与 mock 动态菜单字段对齐，方便两种模式共用侧栏/页签。
 */
export const staticRoutes: RouteRecordRaw[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import('@/views/dashboard/index.vue'),
    meta: { title: 'menu.dashboard', icon: 'dashboard', keepAlive: true },
  },
  {
    path: '/example',
    name: 'Example',
    // 目录节点没有自己的页面，用 ParentView 渲染子路由。
    component: ParentView,
    redirect: '/example/table',
    meta: { title: 'menu.example', icon: 'layers' },
    children: [
      {
        path: 'table',
        name: 'ExampleTable',
        component: () => import('@/views/example/table.vue'),
        meta: { title: 'menu.exampleTable', keepAlive: true },
      },
      {
        path: 'form',
        name: 'ExampleForm',
        component: () => import('@/views/example/form.vue'),
        meta: { title: 'menu.exampleForm' },
      },
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import('@/views/profile/index.vue'),
    meta: { title: 'menu.profile', icon: 'user' },
  },
]

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
      {
        path: 'theme',
        name: 'ExampleTheme',
        component: () => import('@/views/example/theme.vue'),
        meta: { title: 'menu.exampleTheme' },
      },
      {
        path: 'components',
        name: 'ExampleComponents',
        component: ParentView,
        redirect: '/example/components/page-container',
        meta: { title: 'menu.exampleComponents' },
        children: [
          {
            path: 'page-container',
            name: 'ExamplePageContainer',
            component: () => import('@/views/example/components/page-container.vue'),
            meta: { title: 'menu.examplePageContainer' },
          },
          {
            path: 'brand-logo',
            name: 'ExampleBrandLogo',
            component: () => import('@/views/example/components/brand-logo.vue'),
            meta: { title: 'menu.exampleBrandLogo' },
          },
          {
            path: 'icon',
            name: 'ExampleIcon',
            component: () => import('@/views/example/components/icon.vue'),
            meta: { title: 'menu.exampleIcon' },
          },
          {
            path: 'empty',
            name: 'ExampleEmpty',
            component: () => import('@/views/example/components/empty.vue'),
            meta: { title: 'menu.exampleEmpty' },
          },
          {
            path: 'copy-text',
            name: 'ExampleCopyText',
            component: () => import('@/views/example/components/copy-text.vue'),
            meta: { title: 'menu.exampleCopyText' },
          },
          {
            path: 'dict-select',
            name: 'ExampleDictSelect',
            component: () => import('@/views/example/components/dict-select.vue'),
            meta: { title: 'menu.exampleDictSelect' },
          },
          {
            path: 'form',
            name: 'ExampleAppForm',
            component: () => import('@/views/example/components/form.vue'),
            meta: { title: 'menu.exampleAppForm' },
          },
          {
            path: 'search',
            name: 'ExampleAppSearch',
            component: () => import('@/views/example/components/search.vue'),
            meta: { title: 'menu.exampleAppSearch' },
          },
          {
            path: 'table',
            name: 'ExampleAppTable',
            component: () => import('@/views/example/components/table.vue'),
            meta: { title: 'menu.exampleAppTable' },
          },
          {
            path: 'descriptions',
            name: 'ExampleDescriptions',
            component: () => import('@/views/example/components/descriptions.vue'),
            meta: { title: 'menu.exampleDescriptions' },
          },
          {
            path: 'tree',
            name: 'ExampleTree',
            component: () => import('@/views/example/components/tree.vue'),
            meta: { title: 'menu.exampleTree' },
          },
          {
            path: 'upload',
            name: 'ExampleUpload',
            component: () => import('@/views/example/components/upload.vue'),
            meta: { title: 'menu.exampleUpload' },
          },
          {
            path: 'modal',
            name: 'ExampleModal',
            component: () => import('@/views/example/components/modal.vue'),
            meta: { title: 'menu.exampleModal' },
          },
          {
            path: 'drawer',
            name: 'ExampleDrawer',
            component: () => import('@/views/example/components/drawer.vue'),
            meta: { title: 'menu.exampleDrawer' },
          },
          {
            path: 'image-preview',
            name: 'ExampleImagePreview',
            component: () => import('@/views/example/components/image-preview.vue'),
            meta: { title: 'menu.exampleImagePreview' },
          },
        ],
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

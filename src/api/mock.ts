export function delay<T>(data: T, ms = 240): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms)
  })
}

export interface MenuRecord {
  path: string
  name: string
  component?: string
  redirect?: string
  meta?: {
    title?: string
    icon?: string
    hidden?: boolean
    keepAlive?: boolean
    affix?: boolean
  }
  children?: MenuRecord[]
}

export const mockMenus: MenuRecord[] = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: 'dashboard/index',
    meta: { title: 'menu.dashboard', icon: 'dashboard', keepAlive: true },
  },
  {
    path: '/example',
    name: 'Example',
    component: 'ParentView',
    redirect: '/example/table',
    meta: { title: 'menu.example', icon: 'layers' },
    children: [
      {
        path: 'table',
        name: 'ExampleTable',
        component: 'example/table',
        meta: { title: 'menu.exampleTable', keepAlive: true },
      },
      {
        path: 'form',
        name: 'ExampleForm',
        component: 'example/form',
        meta: { title: 'menu.exampleForm' },
      },
      {
        path: 'theme',
        name: 'ExampleTheme',
        component: 'example/theme',
        meta: { title: 'menu.exampleTheme' },
      },
      {
        path: 'components',
        name: 'ExampleComponents',
        component: 'ParentView',
        redirect: '/example/components/page-container',
        meta: { title: 'menu.exampleComponents' },
        children: [
          {
            path: 'page-container',
            name: 'ExamplePageContainer',
            component: 'example/components/page-container',
            meta: { title: 'menu.examplePageContainer' },
          },
          {
            path: 'brand-logo',
            name: 'ExampleBrandLogo',
            component: 'example/components/brand-logo',
            meta: { title: 'menu.exampleBrandLogo' },
          },
          {
            path: 'icon',
            name: 'ExampleIcon',
            component: 'example/components/icon',
            meta: { title: 'menu.exampleIcon' },
          },
          {
            path: 'empty',
            name: 'ExampleEmpty',
            component: 'example/components/empty',
            meta: { title: 'menu.exampleEmpty' },
          },
          {
            path: 'copy-text',
            name: 'ExampleCopyText',
            component: 'example/components/copy-text',
            meta: { title: 'menu.exampleCopyText' },
          },
          {
            path: 'dict-select',
            name: 'ExampleDictSelect',
            component: 'example/components/dict-select',
            meta: { title: 'menu.exampleDictSelect' },
          },
          {
            path: 'form',
            name: 'ExampleAppForm',
            component: 'example/components/form',
            meta: { title: 'menu.exampleAppForm' },
          },
          {
            path: 'search',
            name: 'ExampleAppSearch',
            component: 'example/components/search',
            meta: { title: 'menu.exampleAppSearch' },
          },
          {
            path: 'table',
            name: 'ExampleAppTable',
            component: 'example/components/table',
            meta: { title: 'menu.exampleAppTable' },
          },
          {
            path: 'descriptions',
            name: 'ExampleDescriptions',
            component: 'example/components/descriptions',
            meta: { title: 'menu.exampleDescriptions' },
          },
          {
            path: 'tree',
            name: 'ExampleTree',
            component: 'example/components/tree',
            meta: { title: 'menu.exampleTree' },
          },
          {
            path: 'upload',
            name: 'ExampleUpload',
            component: 'example/components/upload',
            meta: { title: 'menu.exampleUpload' },
          },
          {
            path: 'modal',
            name: 'ExampleModal',
            component: 'example/components/modal',
            meta: { title: 'menu.exampleModal' },
          },
          {
            path: 'drawer',
            name: 'ExampleDrawer',
            component: 'example/components/drawer',
            meta: { title: 'menu.exampleDrawer' },
          },
          {
            path: 'image-preview',
            name: 'ExampleImagePreview',
            component: 'example/components/image-preview',
            meta: { title: 'menu.exampleImagePreview' },
          },
        ],
      },
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: 'profile/index',
    meta: { title: 'menu.profile', icon: 'user' },
  },
]

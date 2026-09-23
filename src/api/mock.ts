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
    ],
  },
  {
    path: '/profile',
    name: 'Profile',
    component: 'profile/index',
    meta: { title: 'menu.profile', icon: 'user' },
  },
]

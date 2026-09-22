/** 路由装配模式：静态路由表 或 接口下发后动态注入。 */
export type RouterMode = 'static' | 'dynamic'

/** 应用内支持的语言标识。 */
export type AppLocale = 'zh-CN' | 'en-US'

/**
 * 全局运行时配置。
 * 优先读 Vite 环境变量，缺省时回落到本地骨架默认值。
 */
export const appConfig = {
  /** 浏览器标题与启动 loading 文案。 */
  title: import.meta.env.VITE_APP_TITLE || 'Axis Admin',
  /** 侧栏 / favicon / 刷新 loading 共用的站点图标。 */
  logo: '/logo.svg',
  /** 决定守卫里走静态菜单还是 mock/接口动态菜单。 */
  routerMode: (import.meta.env.VITE_ROUTER_MODE || 'static') as RouterMode,
  /** axios 实例的 baseURL，开发环境通常走 Vite proxy。 */
  apiBaseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  /** 请求超时毫秒数。 */
  timeout: 15_000,
  /** 业务响应码中视为成功的取值（兼容 0 与 HTTP 200）。 */
  successCodes: [0, 200],
  /** localStorage 中登录 token 的键名。 */
  tokenKey: 'axis-token',
  /** 语言偏好持久化键名。 */
  localeKey: 'axis-locale',
  /** 布局设置（折叠侧栏、页签等）持久化键名。 */
  settingsKey: 'axis-settings',
  /** 当前用户信息缓存键名。 */
  userKey: 'axis-user',
}

/**
 * 语言切换选项。
 * value 给 vue-i18n，tdesign 给 ConfigProvider 的 locale 包名。
 */
export const localeOptions: { value: AppLocale; label: string; tdesign: 'zh_CN' | 'en_US' }[] = [
  { value: 'zh-CN', label: '简体中文', tdesign: 'zh_CN' },
  { value: 'en-US', label: 'English', tdesign: 'en_US' },
]

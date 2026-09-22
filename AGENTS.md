# AGENTS.md

Axis Admin 是 Vue 3 后台骨架，**没有真实业务后端**。改功能时优先走现有封装，不要另起一套请求、表格或布局。

## 技术栈

- Vue 3.5 + TypeScript + Vite 8 + Pinia 4 + Vue Router 5
- UI：`tdesign-vue-next` + `tdesign-icons-vue-next`（`unplugin-vue-components` 的 `TDesignResolver` 自动引入组件）
- i18n：`vue-i18n`，文案按菜单拆 JSON：`src/locales/{zh-CN,en-US}/*.json`
- 包管理：pnpm。`pnpm-workspace.yaml` 里必须允许 `@parcel/watcher` 的 install 脚本，否则 `pnpm run dev` 会在依赖检查阶段失败

## 常用命令

```sh
pnpm install
pnpm dev
pnpm lint
pnpm format
pnpm type-check
pnpm build
```

不要用 `pnpm exec vite` 绕过脚本（仍可能触发 install 检查）。全局 pnpm store 在用户目录；不要在仓库里建 `.pnpm-store`（已 gitignore）。

## 目录约定

| 路径 | 职责 |
| --- | --- |
| `src/config` | 运行时配置、业务码与提示策略 |
| `src/utils/request.ts` | axios：JSON / FormData、token、业务码、401 回调 |
| `src/utils/auth.ts` | token 读写 |
| `src/router` | 常量路由、静态业务路由、守卫、菜单/组件映射 |
| `src/stores` | user / permission / tagsView / settings / session |
| `src/components/App*` | 对 TDesign 的统一封装，页面优先用这些而不是裸 `t-table` |
| `src/views` | 页面。动态路由 `component` 字符串对应 `views/` 下相对路径（无 `.vue` 后缀） |
| `src/api` | 接口；当前为 mock + delay，不要接真实服务除非用户明确要求 |
| `public/logo.svg` | 侧栏收起图标、favicon、整页刷新 loading |

路径别名：`@` → `src/`。

## 路由

- `VITE_ROUTER_MODE`：`static`（默认）用 `src/router/routes/static.ts`；`dynamic` 用 `getMenuApi()` + `transformRoutes`
- 启动只注册 `constantRoutes`（登录、AdminLayout 空壳、404）
- 登录后 `permission.generateRoutes()` 把业务路由 `addRoute` 到 `AdminLayout`，**然后**再挂通配 `notFoundRoute`
- 守卫：无 token 仅放行 `/login`、`/404`；已登录访问 `/login` 回 `/`；`/` 落到第一个叶子菜单
- `keep-alive` 的组件名必须与路由 `name` / `defineOptions({ name })` 一致
- 第一个叶子菜单是 TagsView 的 affix 页签；刷新用 `reloadToken` 重挂组件，不要整页 reload

新增页面：静态模式改 `static.ts` 并加 `views`；动态模式同步 mock 菜单的 `component` 字段。目录节点用 `ParentView`。

## 请求

- 成功码：`appConfig.successCodes`（`0`、`200`），拦截器只把 `data` 返回给调用方
- `RequestOptions.formData` 会把对象转 `FormData` 并去掉手动 `Content-Type`
- `skipErrorHandler` 跳过统一提示
- 401 / 业务未授权走 `onUnauthorized`（`main.ts` 里绑 `session.logoutAndRedirect`），不要在 request 里直接 `router.push`

## UI 与布局

- 页面包在 `PageContainer` 里。列表页需要锁滚动时 `:scrollable="false"`
- 表格用 `AppTable`：默认 `fill` 用剩余高度做 **maxHeight**（行少不撑空白，行多表体滚）。不要再用 `height` 把表体撑满
- 外壳 `html/body/#app/admin-layout` 为 `overflow: hidden`，避免整页橡皮筋滚动把顶栏顶出空隙
- 弹层（`AppModal` / `AppDrawer` / `AppImagePreview`）`attach="body"`，避免被布局裁切
- 侧栏展开：logo + `common.appName`；收起：只显示 `/logo.svg`
- 浏览器刷新 loading 写在 `index.html`，`main.ts` 在 `router.isReady()` 后卸载，不要改成只在 Vue 里做（F5 会白屏）

## 代码风格

- Vue SFC + `<script setup lang="ts">`，页面用 `defineOptions({ name })`
- 格式化 Prettier，检查 ESLint；不要引入 oxlint
- 不要提交 `.env*` 里的密钥；`.pnpm-store`、`node_modules`、`dist` 不入库
- 用户未要求时不要 `git commit` / `git push`
- 不要改用户标明「不要编辑」的计划文档
- 骨架范围内不要擅自加 ECharts、富文本、按钮级权限、真实鉴权后端

## 改完怎么验

- 列表：`/example/table` 搜索区不能带动整页滚动；分页在表下方；行多时只滚表体
- 表单：`/example/form` 内容超出时在 `PageContainer` 内滚动；抽屉/预览不被裁切
- 收起侧栏只剩图标；硬刷新先出「Axis Admin + logo」loading

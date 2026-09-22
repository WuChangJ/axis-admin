/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_URL: string
  readonly VITE_ROUTER_MODE: 'static' | 'dynamic'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

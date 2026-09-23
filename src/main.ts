import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { setupRouterGuard } from './router/guards'
import { i18n } from './locales'
import { useSettingsStore } from './stores/settings'
import { useSessionStore } from './stores/session'
import { onUnauthorized } from './utils/request'

import 'tdesign-vue-next/es/style/index.css'
import './styles/index.scss'
import './styles/theme.scss'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.use(i18n)

const settings = useSettingsStore()
settings.applyLocale()
settings.applyTheme()

const session = useSessionStore()
onUnauthorized(() => session.logoutAndRedirect())

setupRouterGuard(router)

void router.isReady().then(() => {
  app.mount('#app')
  const loading = document.getElementById('app-loading')
  if (!loading) return
  loading.classList.add('is-hide')
  window.setTimeout(() => loading.remove(), 240)
})

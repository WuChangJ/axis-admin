import { createI18n } from 'vue-i18n'
import { appConfig, type AppLocale } from '@/config'

const modules = import.meta.glob<{ default: Record<string, unknown> }>('./*/*.json', {
  eager: true,
})

function loadMessages() {
  const messages: Record<string, Record<string, unknown>> = {}

  for (const [path, mod] of Object.entries(modules)) {
    const matched = path.match(/\.\/([^/]+)\/([^/]+)\.json$/)
    if (!matched) continue
    const locale = matched[1]
    const namespace = matched[2]
    if (!locale || !namespace) continue
    messages[locale] ??= {}
    messages[locale][namespace] = mod.default
  }

  return messages
}

function readLocale(): AppLocale {
  const saved = localStorage.getItem(appConfig.localeKey)
  if (saved === 'zh-CN' || saved === 'en-US') return saved
  return 'zh-CN'
}

export const i18n = createI18n({
  legacy: false,
  locale: readLocale(),
  fallbackLocale: 'zh-CN',
  messages: loadMessages() as never,
})

export function setLocale(locale: AppLocale) {
  i18n.global.locale.value = locale
  localStorage.setItem(appConfig.localeKey, locale)
  document.documentElement.lang = locale
}

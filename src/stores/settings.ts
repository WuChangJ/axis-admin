import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { appConfig, type AppLocale } from '@/config'
import { i18n, setLocale } from '@/locales'

interface PersistedSettings {
  locale: AppLocale
  collapsed: boolean
  showTags: boolean
  darkMode: boolean
}

function readSettings(): PersistedSettings {
  try {
    const raw = localStorage.getItem(appConfig.settingsKey)
    if (raw) {
      return { ...defaultSettings(), ...JSON.parse(raw) }
    }
  } catch {
    /* ignore */
  }
  return defaultSettings()
}

function defaultSettings(): PersistedSettings {
  const locale = (i18n.global.locale.value as AppLocale) || 'zh-CN'
  return {
    locale,
    collapsed: false,
    showTags: true,
    darkMode: false,
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const locale = ref<AppLocale>(readSettings().locale)
  const collapsed = ref(readSettings().collapsed)
  const showTags = ref(readSettings().showTags)
  const darkMode = ref(readSettings().darkMode)
  const settingsVisible = ref(false)

  const persist = computed<PersistedSettings>(() => ({
    locale: locale.value,
    collapsed: collapsed.value,
    showTags: showTags.value,
    darkMode: darkMode.value,
  }))

  watch(
    persist,
    (value) => {
      localStorage.setItem(appConfig.settingsKey, JSON.stringify(value))
    },
    { deep: true },
  )

  watch(
    darkMode,
    (value) => {
      document.documentElement.setAttribute('theme-mode', value ? 'dark' : 'light')
    },
    { immediate: true },
  )

  function changeLocale(next: AppLocale) {
    locale.value = next
    setLocale(next)
  }

  function applyLocale() {
    setLocale(locale.value)
    document.documentElement.lang = locale.value
  }

  return {
    locale,
    collapsed,
    showTags,
    darkMode,
    settingsVisible,
    changeLocale,
    applyLocale,
  }
})

import { defineStore } from 'pinia'
import { computed, ref, watch } from 'vue'
import { appConfig, type AppLocale } from '@/config'
import { i18n, setLocale } from '@/locales'
import {
  applyBrandTheme,
  DEFAULT_BRAND,
  isThemePreset,
  normalizeHex,
  resolveBrandHex,
  type ThemePreset,
} from '@/styles/brand'

interface PersistedSettings {
  locale: AppLocale
  collapsed: boolean
  showTags: boolean
  darkMode: boolean
  themePreset: ThemePreset
  customBrand: string
}

function readSettings(): PersistedSettings {
  try {
    const raw = localStorage.getItem(appConfig.settingsKey)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<PersistedSettings>
      return {
        ...defaultSettings(),
        ...parsed,
        themePreset: isThemePreset(parsed.themePreset) ? parsed.themePreset : 'blue',
        customBrand: parsed.customBrand ? normalizeHex(parsed.customBrand) : DEFAULT_BRAND,
      }
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
    themePreset: 'blue',
    customBrand: DEFAULT_BRAND,
  }
}

export const useSettingsStore = defineStore('settings', () => {
  const initial = readSettings()
  const locale = ref<AppLocale>(initial.locale)
  const collapsed = ref(initial.collapsed)
  const showTags = ref(initial.showTags)
  const darkMode = ref(initial.darkMode)
  const themePreset = ref<ThemePreset>(initial.themePreset)
  const customBrand = ref(initial.customBrand)
  const settingsVisible = ref(false)

  const persist = computed<PersistedSettings>(() => ({
    locale: locale.value,
    collapsed: collapsed.value,
    showTags: showTags.value,
    darkMode: darkMode.value,
    themePreset: themePreset.value,
    customBrand: customBrand.value,
  }))

  const brandHex = computed(() => resolveBrandHex(themePreset.value, customBrand.value))

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

  watch(
    [brandHex, darkMode],
    ([hex, dark]) => {
      applyBrandTheme(hex, dark)
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

  function applyTheme() {
    applyBrandTheme(brandHex.value, darkMode.value)
  }

  function setPreset(preset: ThemePreset) {
    themePreset.value = preset
  }

  function setCustomBrand(hex: string) {
    customBrand.value = normalizeHex(hex)
    themePreset.value = 'custom'
  }

  return {
    locale,
    collapsed,
    showTags,
    darkMode,
    themePreset,
    customBrand,
    brandHex,
    settingsVisible,
    changeLocale,
    applyLocale,
    applyTheme,
    setPreset,
    setCustomBrand,
  }
})

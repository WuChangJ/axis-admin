<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { localeOptions } from '@/config'
import { useSettingsStore } from '@/stores/settings'
import { BRAND_PRESETS, type ThemePreset } from '@/styles/brand'

const { t } = useI18n()
const settings = useSettingsStore()

const presets: Array<{ id: Exclude<ThemePreset, 'custom'>; hex: string; label: string }> = [
  { id: 'blue', hex: BRAND_PRESETS.blue, label: 'themeBlue' },
  { id: 'teal', hex: BRAND_PRESETS.teal, label: 'themeTeal' },
  { id: 'violet', hex: BRAND_PRESETS.violet, label: 'themeViolet' },
  { id: 'amber', hex: BRAND_PRESETS.amber, label: 'themeAmber' },
]

const pickerValue = computed(() => settings.brandHex)

function onCustomInput(event: Event) {
  const value = (event.target as HTMLInputElement).value
  settings.setCustomBrand(value)
}

function onCustomHex(value: string) {
  if (!/^#?[0-9a-fA-F]{3,6}$/.test(value.trim())) return
  const hex = value.startsWith('#') ? value : `#${value}`
  settings.setCustomBrand(hex)
}
</script>

<template>
  <t-drawer
    attach="body"
    v-model:visible="settings.settingsVisible"
    :header="t('common.settings')"
    :footer="false"
    size="360px"
  >
    <t-space direction="vertical" style="width: 100%">
      <t-form>
        <t-form-item :label="t('common.language')">
          <t-select
            :value="settings.locale"
            :options="localeOptions.map((item) => ({ label: item.label, value: item.value }))"
            @change="(value) => settings.changeLocale(String(value) as 'zh-CN' | 'en-US')"
          />
        </t-form-item>
        <t-form-item :label="t('common.showTags')">
          <t-switch v-model="settings.showTags" />
        </t-form-item>
        <t-form-item :label="t('common.collapseSidebar')">
          <t-switch v-model="settings.collapsed" />
        </t-form-item>
        <t-form-item :label="t('common.darkMode')">
          <t-switch v-model="settings.darkMode" />
        </t-form-item>
        <t-form-item :label="t('common.themeColor')">
          <div class="theme-color">
            <div class="theme-swatches">
              <button
                v-for="item in presets"
                :key="item.id"
                type="button"
                class="theme-swatches__dot"
                :class="{ 'is-active': settings.themePreset === item.id }"
                :style="{ background: item.hex }"
                :title="t(`common.${item.label}`)"
                @click="settings.setPreset(item.id)"
              />
              <label
                class="theme-swatches__dot theme-swatches__custom"
                :class="{ 'is-active': settings.themePreset === 'custom' }"
                :style="{ background: pickerValue }"
                :title="t('common.themeCustom')"
              >
                <input
                  type="color"
                  :value="pickerValue"
                  :aria-label="t('common.themeCustom')"
                  @input="onCustomInput"
                />
              </label>
            </div>
            <t-input
              :value="pickerValue"
              :placeholder="t('common.themeCustom')"
              @change="(value) => onCustomHex(String(value ?? ''))"
            />
          </div>
        </t-form-item>
      </t-form>
    </t-space>
  </t-drawer>
</template>

<style scoped>
.theme-color {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

.theme-swatches {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.theme-swatches__dot {
  position: relative;
  width: 28px;
  height: 28px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: inset 0 0 0 1px rgba(26, 29, 36, 0.12);
}

.theme-swatches__dot.is-active {
  border-color: var(--td-text-color-primary);
}

.theme-swatches__custom {
  overflow: hidden;
}

.theme-swatches__custom input {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  padding: 0;
  border: 0;
  opacity: 0;
  cursor: pointer;
}
</style>

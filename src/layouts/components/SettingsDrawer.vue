<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { localeOptions } from '@/config'
import { useSettingsStore } from '@/stores/settings'

const { t } = useI18n()
const settings = useSettingsStore()
</script>

<template>
  <t-drawer
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
      </t-form>
    </t-space>
  </t-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ConfigProvider } from 'tdesign-vue-next'
import enUS from 'tdesign-vue-next/es/locale/en_US'
import zhCN from 'tdesign-vue-next/es/locale/zh_CN'
import { useSettingsStore } from '@/stores/settings'

const settings = useSettingsStore()
const globalConfig = computed(() => (settings.locale === 'en-US' ? enUS : zhCN))
</script>

<template>
  <div class="app-root">
    <ConfigProvider :global-config="globalConfig as never">
      <router-view />
    </ConfigProvider>
  </div>
</template>

<style scoped>
.app-root {
  height: 100%;
  overflow: hidden;
}

.app-root :deep(.t-config-provider) {
  height: 100%;
}
</style>

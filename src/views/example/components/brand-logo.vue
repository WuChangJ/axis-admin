<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppBrandLogo from '@/components/AppBrandLogo/index.vue'

defineOptions({ name: 'ExampleBrandLogo' })

const { t } = useI18n()
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.brandLogoHint') }}</p>
    <t-card title="AppBrandLogo">
      <t-space align="center">
        <AppBrandLogo size="24px" />
        <AppBrandLogo size="32px" />
        <AppBrandLogo size="48px" />
      </t-space>
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

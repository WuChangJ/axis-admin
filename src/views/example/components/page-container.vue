<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'

defineOptions({ name: 'ExamplePageContainer' })

const { t } = useI18n()
</script>

<template>
  <PageContainer>
    <template #title>{{ t('menu.examplePageContainer') }}</template>
    <p class="hint">{{ t('example.pageContainerHint') }}</p>
    <t-card>
      <p>{{ t('common.welcome') }}</p>
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

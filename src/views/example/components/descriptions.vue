<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppDescriptions from '@/components/AppDescriptions/index.vue'

defineOptions({ name: 'ExampleDescriptions' })

const { t } = useI18n()
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.descriptionsHint') }}</p>
    <t-card title="AppDescriptions">
      <AppDescriptions
        :items="[
          { label: t('example.name'), value: 'Demo' },
          { label: t('example.status'), value: t('example.enabled') },
          { label: t('example.remark'), value: 'Remark' },
        ]"
      />
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

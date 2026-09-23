<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppEmpty from '@/components/AppEmpty/index.vue'

defineOptions({ name: 'ExampleEmpty' })

const { t } = useI18n()
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.emptyHint') }}</p>
    <t-card title="AppEmpty">
      <t-space direction="vertical" style="width: 100%">
        <AppEmpty />
        <AppEmpty :description="t('example.remark')" />
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

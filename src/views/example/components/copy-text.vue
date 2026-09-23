<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import CopyText from '@/components/CopyText/index.vue'

defineOptions({ name: 'ExampleCopyText' })

const { t } = useI18n()
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.copyTextHint') }}</p>
    <t-card title="CopyText">
      <CopyText text="AX-10086" />
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

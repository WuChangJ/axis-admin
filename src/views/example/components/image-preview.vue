<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppImagePreview from '@/components/AppImagePreview/index.vue'

defineOptions({ name: 'ExampleImagePreview' })

const { t } = useI18n()
const visible = ref(false)
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.imagePreviewHint') }}</p>
    <t-card title="AppImagePreview">
      <t-space align="center">
        <img class="thumb" src="/logo.svg" alt="" />
        <t-button variant="outline" @click="visible = true">{{ t('common.preview') }}</t-button>
      </t-space>
    </t-card>
    <AppImagePreview v-model:visible="visible" :images="['/logo.svg']" />
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}

.thumb {
  width: 48px;
  height: 48px;
}
</style>

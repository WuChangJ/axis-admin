<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UploadFile } from 'tdesign-vue-next'
import PageContainer from '@/components/PageContainer/index.vue'
import AppUpload from '@/components/AppUpload/index.vue'

defineOptions({ name: 'ExampleUpload' })

const { t } = useI18n()
const files = ref<UploadFile[]>([])
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.uploadHint') }}</p>
    <t-card title="AppUpload">
      <AppUpload v-model="files" theme="image" accept="image/*" />
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

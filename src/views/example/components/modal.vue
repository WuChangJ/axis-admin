<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppModal from '@/components/AppModal/index.vue'

defineOptions({ name: 'ExampleModal' })

const { t } = useI18n()
const visible = ref(false)
const confirmLoading = ref(false)

function onConfirm() {
  window.setTimeout(() => {
    confirmLoading.value = false
  }, 800)
}
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.modalHint') }}</p>
    <t-card title="AppModal">
      <t-button theme="primary" @click="visible = true">{{ t('example.detail') }}</t-button>
    </t-card>
    <AppModal
      v-model:visible="visible"
      v-model:confirm-loading="confirmLoading"
      :title="t('example.detail')"
      @confirm="onConfirm"
    >
      <p>{{ t('example.name') }}：Demo</p>
    </AppModal>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

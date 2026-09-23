<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppModal from '@/components/AppModal/index.vue'

defineOptions({ name: 'ExampleModal' })

const { t } = useI18n()
const visible = ref(false)
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.modalHint') }}</p>
    <t-card title="AppModal">
      <t-button theme="primary" @click="visible = true">{{ t('example.detail') }}</t-button>
    </t-card>
    <AppModal v-model:visible="visible" :title="t('example.detail')" @confirm="visible = false">
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

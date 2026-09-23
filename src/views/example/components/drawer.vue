<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppDrawer from '@/components/AppDrawer/index.vue'

defineOptions({ name: 'ExampleDrawer' })

const { t } = useI18n()
const visible = ref(false)
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.drawerHint') }}</p>
    <t-card title="AppDrawer">
      <t-button theme="primary" @click="visible = true">{{ t('example.detail') }}</t-button>
    </t-card>
    <AppDrawer v-model:visible="visible" :title="t('example.detail')" @confirm="visible = false">
      <p>{{ t('example.remark') }}：Remark</p>
    </AppDrawer>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

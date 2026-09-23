<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppForm from '@/components/AppForm/index.vue'
import type { FormSchemaItem } from '@/components/AppForm/schema'

defineOptions({ name: 'ExampleAppForm' })

const { t } = useI18n()

const model = ref<Record<string, unknown>>({
  name: 'Demo',
  status: 1,
  date: '',
  enabled: true,
  remark: '',
  dict: 1,
})

const schema: FormSchemaItem[] = [
  { field: 'name', label: t('example.name'), component: 'input', span: 6 },
  {
    field: 'status',
    label: t('example.status'),
    component: 'select',
    span: 6,
    options: [
      { label: t('example.enabled'), value: 1 },
      { label: t('example.disabled'), value: 0 },
    ],
  },
  { field: 'date', label: t('example.createTime'), component: 'date', span: 6 },
  { field: 'enabled', label: t('example.enabled'), component: 'switch', span: 6 },
  { field: 'remark', label: t('example.remark'), component: 'textarea', span: 12 },
  {
    field: 'dict',
    label: t('example.status'),
    component: 'dict',
    span: 6,
    options: [
      { label: t('example.enabled'), value: 1 },
      { label: t('example.disabled'), value: 0 },
    ],
  },
]
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.appFormHint') }}</p>
    <t-card title="AppForm">
      <AppForm v-model="model" :schema="schema" />
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

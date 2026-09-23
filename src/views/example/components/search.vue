<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppSearch from '@/components/AppSearch/index.vue'
import type { FormSchemaItem } from '@/components/AppForm/schema'

defineOptions({ name: 'ExampleAppSearch' })

const { t } = useI18n()
const searched = ref(false)
const query = ref({ name: '', status: '' as number | '', remark: '' })

const schema: FormSchemaItem[] = [
  { field: 'name', label: t('example.name'), component: 'input', span: 4 },
  {
    field: 'status',
    label: t('example.status'),
    component: 'select',
    span: 4,
    options: [
      { label: t('example.enabled'), value: 1 },
      { label: t('example.disabled'), value: 0 },
    ],
  },
  { field: 'remark', label: t('example.remark'), component: 'input', span: 4 },
]

function onSearch() {
  searched.value = true
}

function onReset() {
  query.value = { name: '', status: '', remark: '' }
  searched.value = false
}
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.appSearchHint') }}</p>
    <t-card title="AppSearch">
      <AppSearch v-model="query" :schema="schema" @search="onSearch" @reset="onReset" />
      <p v-if="searched" class="result">{{ t('example.searchResult') }}：{{ query.name || '—' }}</p>
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}

.result {
  margin: 12px 0 0;
  color: var(--td-text-color-secondary);
}
</style>

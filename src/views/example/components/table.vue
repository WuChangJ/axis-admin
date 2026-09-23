<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PrimaryTableCol } from 'tdesign-vue-next'
import PageContainer from '@/components/PageContainer/index.vue'
import AppTable from '@/components/AppTable/index.vue'

defineOptions({ name: 'ExampleAppTable' })

const { t } = useI18n()
const page = ref(1)
const pageSize = ref(10)
const selectedRowKeys = ref<Array<string | number>>([])

const columns: PrimaryTableCol[] = [
  { colKey: 'row-select', type: 'multiple', width: 48 },
  { colKey: 'name', title: t('example.name') },
  { colKey: 'status', title: t('example.status') },
  { colKey: 'remark', title: t('example.remark') },
]

const rows = [
  { id: 1, name: 'Item 1', status: t('example.enabled'), remark: 'Remark 1' },
  { id: 2, name: 'Item 2', status: t('example.disabled'), remark: 'Remark 2' },
  { id: 3, name: 'Item 3', status: t('example.enabled'), remark: 'Remark 3' },
]
</script>

<template>
  <PageContainer :scrollable="false">
    <p class="hint">{{ t('example.appTableHint') }}</p>
    <t-card>
      <AppTable
        :columns="columns"
        :data="rows"
        :total="rows.length"
        v-model:page="page"
        v-model:pageSize="pageSize"
        v-model:selectedRowKeys="selectedRowKeys"
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

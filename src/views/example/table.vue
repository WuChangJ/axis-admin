<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PrimaryTableCol } from 'tdesign-vue-next'
import { getExampleListApi, type ExampleItem } from '@/api/example'
import PageContainer from '@/components/PageContainer/index.vue'
import AppSearch from '@/components/AppSearch/index.vue'
import AppTable from '@/components/AppTable/index.vue'
import AppModal from '@/components/AppModal/index.vue'
import AppForm from '@/components/AppForm/index.vue'
import AppDescriptions from '@/components/AppDescriptions/index.vue'
import type { FormSchemaItem } from '@/components/AppForm/schema'
import { useTable } from '@/hooks/useTable'
import { useForm } from '@/hooks/useForm'
import { useFeedback } from '@/hooks/useFeedback'

defineOptions({ name: 'ExampleTable' })

const { t } = useI18n()
const feedback = useFeedback()
const showEdit = ref(false)
const showDetail = ref(false)
const current = ref<ExampleItem | null>(null)

const { loading, data, total, page, pageSize, query, selectedRowKeys, fetchData, search, reset } =
  useTable(getExampleListApi, {
    name: '',
    status: '' as number | '',
  })

const searchSchema: FormSchemaItem[] = [
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
]

const columns: PrimaryTableCol[] = [
  { colKey: 'name', title: t('example.name') },
  {
    colKey: 'status',
    title: t('example.status'),
    cell: (_h, { row }) =>
      (row as ExampleItem).status === 1 ? t('example.enabled') : t('example.disabled'),
  },
  { colKey: 'remark', title: t('example.remark') },
  { colKey: 'createTime', title: t('example.createTime') },
  { colKey: 'action', title: t('example.action'), cell: 'action' },
]

const { model, submitting, submit } = useForm({
  name: '',
  status: 1,
  remark: '',
})

const formSchema: FormSchemaItem[] = [
  { field: 'name', label: t('example.name'), component: 'input', span: 12 },
  {
    field: 'status',
    label: t('example.status'),
    component: 'select',
    span: 12,
    options: [
      { label: t('example.enabled'), value: 1 },
      { label: t('example.disabled'), value: 0 },
    ],
  },
  { field: 'remark', label: t('example.remark'), component: 'textarea', span: 12 },
]

function openEdit(row?: ExampleItem) {
  current.value = row ?? null
  model.value = {
    name: row?.name ?? '',
    status: row?.status ?? 1,
    remark: row?.remark ?? '',
  }
  showEdit.value = true
}

function openDetail(row: ExampleItem) {
  current.value = row
  showDetail.value = true
}

async function onConfirm() {
  await submit(async () => {
    feedback.success(t('common.submit'))
    showEdit.value = false
    await fetchData()
  })
}

function onPageChange() {
  void fetchData()
}

onMounted(() => {
  void fetchData()
})
</script>

<template>
  <PageContainer :scrollable="false">
    <p class="hint">{{ t('example.tableHint') }}</p>
    <AppSearch v-model="query" :schema="searchSchema" @search="search" @reset="reset" />
    <t-card class="table-card">
      <template #actions>
        <t-button theme="primary" @click="openEdit()">{{ t('example.add') }}</t-button>
      </template>
      <AppTable
        :columns="columns"
        :data="data"
        :loading="loading"
        :total="total"
        v-model:page="page"
        v-model:pageSize="pageSize"
        v-model:selectedRowKeys="selectedRowKeys"
        @change="onPageChange"
      >
        <template #action="{ row }">
          <t-space>
            <t-link theme="primary" @click="openEdit(row)">{{ t('example.edit') }}</t-link>
            <t-link theme="primary" @click="openDetail(row)">{{ t('example.detail') }}</t-link>
          </t-space>
        </template>
      </AppTable>
    </t-card>

    <AppModal
      v-model:visible="showEdit"
      :title="t('example.edit')"
      :confirm-loading="submitting"
      @confirm="onConfirm"
    >
      <AppForm v-model="model" :schema="formSchema" />
    </AppModal>

    <AppModal v-model:visible="showDetail" :title="t('example.detail')">
      <AppDescriptions
        v-if="current"
        :items="[
          { label: t('example.name'), value: current.name },
          {
            label: t('example.status'),
            value: current.status === 1 ? t('example.enabled') : t('example.disabled'),
          },
          { label: t('example.remark'), value: current.remark },
        ]"
      />
    </AppModal>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { PrimaryTableCol } from 'tdesign-vue-next'
import PageContainer from '@/components/PageContainer/index.vue'
import AppSearch from '@/components/AppSearch/index.vue'
import AppTable from '@/components/AppTable/index.vue'
import AppForm from '@/components/AppForm/index.vue'
import AppBrandLogo from '@/components/AppBrandLogo/index.vue'
import type { FormSchemaItem } from '@/components/AppForm/schema'

defineOptions({ name: 'ExampleTheme' })

const { t } = useI18n()
const query = ref({ name: '', status: '' as number | '' })
const page = ref(1)
const pageSize = ref(10)
const selectedRowKeys = ref<Array<string | number>>([])
const enabled = ref(true)
const model = ref({ name: 'Demo', status: 1 })

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

const formSchema: FormSchemaItem[] = [
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
]

const columns: PrimaryTableCol[] = [
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
  <PageContainer>
    <p class="hint">{{ t('example.themeHint') }}</p>

    <div class="theme-grid">
      <t-card :title="t('example.themeLogin')">
        <div class="login-mini">
          <AppBrandLogo size="36px" />
          <strong>{{ t('common.appName') }}</strong>
          <t-input :placeholder="t('common.username')" />
          <t-button theme="primary" block>{{ t('common.loginAction') }}</t-button>
        </div>
      </t-card>

      <t-card :title="t('example.themeNav')">
        <div class="nav-mini">
          <div class="nav-mini__item">{{ t('menu.dashboard') }}</div>
          <div class="nav-mini__item is-active">{{ t('menu.exampleTable') }}</div>
          <div class="nav-mini__item">{{ t('menu.exampleForm') }}</div>
        </div>
        <t-space class="nav-mini__tags">
          <t-tag theme="primary" variant="light">{{ t('menu.exampleTable') }}</t-tag>
          <t-tag variant="light">{{ t('menu.dashboard') }}</t-tag>
        </t-space>
      </t-card>
    </div>

    <AppSearch v-model="query" :schema="searchSchema" />

    <t-card :title="t('menu.exampleTable')">
      <AppTable
        :fill="false"
        :columns="columns"
        :data="rows"
        :total="3"
        v-model:page="page"
        v-model:pageSize="pageSize"
        v-model:selectedRowKeys="selectedRowKeys"
      />
    </t-card>

    <t-card :title="t('example.themeControls')">
      <AppForm v-model="model" :schema="formSchema" />
      <t-space>
        <t-button theme="primary">{{ t('common.submit') }}</t-button>
        <t-button variant="outline">{{ t('common.reset') }}</t-button>
        <t-switch v-model="enabled" />
        <t-tag theme="success" variant="light">{{ t('example.enabled') }}</t-tag>
      </t-space>
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}

.theme-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 12px;
}

.login-mini,
.nav-mini {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.login-mini img,
.login-mini :deep(.app-brand-logo) {
  width: 36px;
  height: 36px;
}

.nav-mini__item {
  padding: 8px 12px;
  border-radius: var(--td-radius-default);
  color: var(--td-text-color-primary);
}

.nav-mini__item.is-active {
  background: var(--td-brand-color-1);
  color: var(--td-brand-color);
  font-weight: 600;
}

.nav-mini__tags {
  margin-top: 12px;
}

@media (max-width: 900px) {
  .theme-grid {
    grid-template-columns: 1fr;
  }
}
</style>

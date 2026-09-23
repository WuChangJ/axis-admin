<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { UploadFile } from 'tdesign-vue-next'
import PageContainer from '@/components/PageContainer/index.vue'
import AppForm from '@/components/AppForm/index.vue'
import AppDrawer from '@/components/AppDrawer/index.vue'
import AppTree from '@/components/AppTree/index.vue'
import AppUpload from '@/components/AppUpload/index.vue'
import AppDescriptions from '@/components/AppDescriptions/index.vue'
import AppImagePreview from '@/components/AppImagePreview/index.vue'
import DictSelect from '@/components/DictSelect/index.vue'
import type { FormSchemaItem } from '@/components/AppForm/schema'
import { useForm } from '@/hooks/useForm'
import { useFeedback } from '@/hooks/useFeedback'

defineOptions({ name: 'ExampleForm' })

const { t } = useI18n()
const feedback = useFeedback()
const drawerVisible = ref(false)
const previewVisible = ref(false)
const files = ref<UploadFile[]>([])
const checked = ref<Array<string | number>>(['dept'])
const status = ref<string | number | undefined>(1)

const { model, submitting, submit } = useForm({
  name: 'Demo',
  status: 1,
  remark: '',
})

const schema: FormSchemaItem[] = [
  { field: 'name', label: t('example.name'), component: 'input', span: 6 },
  {
    field: 'status',
    label: t('example.status'),
    component: 'dict',
    span: 6,
    options: [
      { label: t('example.enabled'), value: 1 },
      { label: t('example.disabled'), value: 0 },
    ],
  },
  { field: 'remark', label: t('example.remark'), component: 'textarea', span: 12 },
]

const treeData = [
  {
    label: t('example.treeTitle'),
    value: 'root',
    children: [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ],
  },
]

async function onSubmit() {
  await submit(() => {
    feedback.success(t('common.submit'))
  })
}
</script>

<template>
  <PageContainer>
    <t-space direction="vertical" style="width: 100%">
      <t-card :title="t('menu.exampleForm')">
        <p>{{ t('example.formHint') }}</p>
        <AppForm v-model="model" :schema="schema" />
        <t-space>
          <t-button theme="primary" :loading="submitting" @click="onSubmit">
            {{ t('common.submit') }}
          </t-button>
          <t-button variant="outline" @click="drawerVisible = true">{{
            t('example.detail')
          }}</t-button>
        </t-space>
      </t-card>

      <t-card :title="t('example.treeTitle')">
        <AppTree v-model="checked" :data="treeData" checkable />
      </t-card>

      <t-card :title="t('common.upload')">
        <p>{{ t('example.uploadHint') }}</p>
        <DictSelect v-model="status" :options="schema[1]?.options" />
        <AppUpload v-model="files" theme="image" accept="image/*" />
        <t-button variant="text" @click="previewVisible = true">{{ t('common.preview') }}</t-button>
      </t-card>
    </t-space>

    <AppDrawer v-model:visible="drawerVisible" :title="t('example.detail')">
      <AppDescriptions
        :items="[
          { label: t('example.name'), value: String(model.name) },
          { label: t('example.status'), value: String(model.status) },
          { label: t('example.remark'), value: String(model.remark) },
        ]"
      />
    </AppDrawer>

    <AppImagePreview
      v-model:visible="previewVisible"
      :images="files.map((item) => String(item.url || '')).filter(Boolean)"
    />
  </PageContainer>
</template>

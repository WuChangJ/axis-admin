<script setup lang="ts">
import type { UploadFile } from 'tdesign-vue-next'
import { request } from '@/utils/request'

const props = withDefaults(
  defineProps<{
    action?: string
    accept?: string
    theme?: 'file' | 'image' | 'file-input' | 'image-flow' | 'file-flow'
    multiple?: boolean
  }>(),
  {
    theme: 'file',
    multiple: false,
  },
)

const files = defineModel<UploadFile[]>({ default: () => [] })

async function requestMethod(file: UploadFile) {
  if (!props.action) {
    return { status: 'success' as const, response: { url: file.url } }
  }
  const raw = file.raw
  if (!raw) return { status: 'fail' as const, response: {} }
  const data = await request.post(props.action, { file: raw }, { formData: true })
  return { status: 'success' as const, response: (data ?? {}) as Record<string, unknown> }
}
</script>

<template>
  <t-upload
    v-model="files"
    :theme="theme"
    :accept="accept"
    :multiple="multiple"
    :request-method="requestMethod"
    v-bind="$attrs"
  />
</template>

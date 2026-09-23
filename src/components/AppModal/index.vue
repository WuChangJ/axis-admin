<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    visible: boolean
    title?: string
    width?: string | number
    confirmLoading?: boolean
  }>(),
  {
    width: 520,
    confirmLoading: false,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
  'update:confirmLoading': [value: boolean]
  confirm: []
  cancel: []
}>()

const { t } = useI18n()
const pending = ref(false)

const innerVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value),
})

const loading = computed(() => props.confirmLoading || pending.value)

function setLoading(value: boolean) {
  pending.value = value
  emit('update:confirmLoading', value)
}

function onConfirm() {
  if (loading.value) return
  setLoading(true)
  emit('confirm')
}

function onCancel() {
  innerVisible.value = false
  emit('cancel')
}

watch(
  () => props.confirmLoading,
  (value) => {
    pending.value = value
  },
)

watch(
  () => props.visible,
  (value) => {
    if (value || (!pending.value && !props.confirmLoading)) return
    pending.value = false
    emit('update:confirmLoading', false)
  },
)
</script>

<template>
  <t-dialog
    attach="body"
    dialog-class-name="app-modal"
    v-model:visible="innerVisible"
    :header="title"
    :width="width"
    :confirm-btn="{
      loading,
      disabled: loading,
      content: t('common.confirm'),
    }"
    :cancel-btn="t('common.cancel')"
    v-bind="$attrs"
    @confirm="onConfirm"
    @close="onCancel"
  >
    <slot />
  </t-dialog>
</template>

<style>
.app-modal.t-dialog--default {
  padding: 0;
}

.app-modal .t-dialog__header {
  padding: 12px 16px;
  border-bottom: 1px solid var(--td-component-border);
}

.app-modal .t-dialog__body {
  padding: 12px 16px;
}

.app-modal .t-dialog__footer {
  padding: 12px 16px;
  border-top: 1px solid var(--td-component-border);
}
</style>

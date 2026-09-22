<script setup lang="ts">
import { computed } from 'vue'
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
  confirm: []
  cancel: []
}>()

const { t } = useI18n()

const innerVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value),
})

function onConfirm() {
  emit('confirm')
}

function onCancel() {
  innerVisible.value = false
  emit('cancel')
}
</script>

<template>
  <t-dialog
    attach="body"
    v-model:visible="innerVisible"
    :header="title"
    :width="width"
    :confirm-btn="{ loading: confirmLoading, content: t('common.confirm') }"
    :cancel-btn="t('common.cancel')"
    v-bind="$attrs"
    @confirm="onConfirm"
    @close="onCancel"
  >
    <slot />
  </t-dialog>
</template>

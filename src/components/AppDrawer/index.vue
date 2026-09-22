<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = withDefaults(
  defineProps<{
    visible: boolean
    title?: string
    size?: string
    confirmLoading?: boolean
  }>(),
  {
    size: '480px',
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
</script>

<template>
  <t-drawer
    attach="body"
    v-model:visible="innerVisible"
    :header="title"
    :size="size"
    :confirm-btn="{ loading: confirmLoading, content: t('common.confirm') }"
    :cancel-btn="t('common.cancel')"
    v-bind="$attrs"
    @confirm="emit('confirm')"
    @close="emit('cancel')"
  >
    <slot />
  </t-drawer>
</template>

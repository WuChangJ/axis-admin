<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useFeedback } from '@/hooks/useFeedback'

const props = withDefaults(
  defineProps<{
    text: string | number
  }>(),
  {},
)

const { t } = useI18n()
const feedback = useFeedback()

async function copy() {
  await navigator.clipboard.writeText(String(props.text))
  feedback.success(t('common.copied'))
}
</script>

<template>
  <span class="copy-text" @click="copy">
    <slot>{{ text }}</slot>
  </span>
</template>

<style scoped>
.copy-text {
  cursor: pointer;
  color: var(--td-brand-color);
}
</style>

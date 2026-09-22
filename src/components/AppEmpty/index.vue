<script setup lang="ts">
import { useI18n } from 'vue-i18n'

withDefaults(
  defineProps<{
    description?: string
  }>(),
  { description: '' },
)

const { t } = useI18n()
</script>

<template>
  <t-empty :description="description || t('common.empty')" />
</template>

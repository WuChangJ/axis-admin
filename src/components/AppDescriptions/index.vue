<script setup lang="ts">
withDefaults(
  defineProps<{
    items: { label: string; value?: string | number | boolean; field?: string }[]
    data?: Record<string, unknown>
    column?: number
  }>(),
  {
    data: () => ({}),
    column: 2,
  },
)
</script>

<template>
  <t-descriptions :column="column" v-bind="$attrs">
    <t-descriptions-item v-for="item in items" :key="item.field || item.label" :label="item.label">
      {{ item.value ?? data[item.field || ''] }}
    </t-descriptions-item>
  </t-descriptions>
</template>

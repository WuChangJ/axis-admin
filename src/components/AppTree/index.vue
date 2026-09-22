<script setup lang="ts">
import type { TreeOptionData } from 'tdesign-vue-next'

withDefaults(
  defineProps<{
    data: TreeOptionData[]
    keys?: { label?: string; value?: string; children?: string }
    checkable?: boolean
  }>(),
  {
    keys: () => ({ label: 'label', value: 'value', children: 'children' }),
    checkable: false,
  },
)

const value = defineModel<Array<string | number>>({ default: () => [] })
</script>

<template>
  <t-tree v-model="value" :data="data" :keys="keys" :checkable="checkable" hover v-bind="$attrs" />
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    visible?: boolean
    images?: string[]
    index?: number
  }>(),
  {
    visible: false,
    images: () => [],
    index: 0,
  },
)

const emit = defineEmits<{
  'update:visible': [value: boolean]
}>()

const innerVisible = computed({
  get: () => props.visible,
  set: (value: boolean) => emit('update:visible', value),
})
</script>

<template>
  <t-image-viewer attach="body" v-model:visible="innerVisible" :images="images" :index="index">
    <template #trigger>
      <span class="app-image-preview__trigger" />
    </template>
  </t-image-viewer>
</template>

<style scoped>
.app-image-preview__trigger {
  display: none;
}
</style>

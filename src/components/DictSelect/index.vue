<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'

const props = withDefaults(
  defineProps<{
    options?: { label: string; value: string | number }[]
    loader?: () => Promise<{ label: string; value: string | number }[]>
    placeholder?: string
  }>(),
  {
    options: () => [],
  },
)

const model = defineModel<string | number | undefined>()
const loaded = ref<{ label: string; value: string | number }[]>([])

const merged = computed(() => (loaded.value.length ? loaded.value : props.options))

onMounted(async () => {
  if (props.loader) {
    loaded.value = await props.loader()
  }
})
</script>

<template>
  <t-select
    v-model="model"
    :options="merged"
    :placeholder="placeholder"
    clearable
    v-bind="$attrs"
  />
</template>

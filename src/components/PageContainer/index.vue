<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    scrollable?: boolean
  }>(),
  {
    width: '100%',
    height: '100%',
    scrollable: true,
  },
)
</script>

<template>
  <div
    class="page-container"
    :class="{ 'page-container--lock': !scrollable }"
    :style="{ width: props.width, height: props.height }"
  >
    <div v-if="$slots.title" class="page-container__title">
      <slot name="title" />
    </div>
    <div class="page-container__body">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
  overscroll-behavior: none;
}

.page-container__title {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
  flex-shrink: 0;
}

.page-container__body {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: auto;
  overscroll-behavior: contain;
}

.page-container--lock,
.page-container--lock .page-container__body {
  overflow: hidden;
}
</style>

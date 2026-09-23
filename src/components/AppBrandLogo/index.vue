<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: string
  }>(),
  { size: '32px' },
)
</script>

<template>
  <span class="app-brand-logo" :style="{ width: size, height: size }">
    <svg viewBox="0 0 32 32" aria-hidden="true">
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <g
        fill="none"
        stroke="#fff"
        stroke-width="1.8"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="translate(4 4)"
      >
        <rect width="7" height="9" x="3" y="3" rx="1" />
        <rect width="7" height="5" x="14" y="3" rx="1" />
        <rect width="7" height="9" x="14" y="12" rx="1" />
        <rect width="7" height="5" x="3" y="16" rx="1" />
      </g>
    </svg>
  </span>
</template>

<style scoped>
.app-brand-logo {
  display: inline-flex;
  flex-shrink: 0;
  color: var(--td-brand-color);
}

.app-brand-logo svg {
  width: 100%;
  height: 100%;
  display: block;
}
</style>

<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { PrimaryTableCol, TableRowData } from 'tdesign-vue-next'
import AppEmpty from '@/components/AppEmpty/index.vue'

const props = withDefaults(
  defineProps<{
    columns: PrimaryTableCol[]
    data: unknown[]
    loading?: boolean
    total?: number
    page?: number
    pageSize?: number
    selectedRowKeys?: Array<string | number>
    /** Cap table body by remaining page space (no empty stretch). */
    fill?: boolean
    height?: string | number
    maxHeight?: string | number
  }>(),
  {
    loading: false,
    total: 0,
    page: 1,
    pageSize: 10,
    selectedRowKeys: () => [],
    fill: true,
  },
)

const emit = defineEmits<{
  'update:page': [value: number]
  'update:pageSize': [value: number]
  'update:selectedRowKeys': [value: Array<string | number>]
  change: []
}>()

const wrapRef = ref<HTMLElement | null>(null)
const autoMaxHeight = ref<number>()
let observer: ResizeObserver | null = null

function findViewport(el: HTMLElement) {
  return (
    el.closest<HTMLElement>('.page-container') ??
    el.closest<HTMLElement>('.admin-layout__content') ??
    document.documentElement
  )
}

function contentBottom(el: HTMLElement) {
  const styles = getComputedStyle(el)
  return el.getBoundingClientRect().bottom - parseFloat(styles.paddingBottom)
}

function measure() {
  const el = wrapRef.value
  if (!el || !props.fill || props.height !== undefined || props.maxHeight !== undefined) return
  const host =
    el.closest<HTMLElement>('.page-container__body') ??
    el.closest<HTMLElement>('.admin-layout__content') ??
    findViewport(el)
  const pagination = el.querySelector<HTMLElement>('.t-table__pagination, .t-pagination')
  const paginationH = pagination?.getBoundingClientRect().height ?? 56
  const next = Math.floor(contentBottom(host) - el.getBoundingClientRect().top - paginationH) - 1
  autoMaxHeight.value = next > 120 ? next : 120
}

function bindObserver() {
  observer?.disconnect()
  observer = null
  const el = wrapRef.value
  if (!el || !props.fill || props.height !== undefined || props.maxHeight !== undefined) return
  observer = new ResizeObserver(() => {
    void nextTick(measure)
  })
  observer.observe(findViewport(el))
  measure()
}

onMounted(() => {
  bindObserver()
  window.addEventListener('resize', measure)
})

watch(
  () => [props.fill, props.height, props.maxHeight, props.data.length, props.total] as const,
  () => {
    void nextTick(bindObserver)
  },
)

onBeforeUnmount(() => {
  observer?.disconnect()
  window.removeEventListener('resize', measure)
})

const tableMaxHeight = computed(() => {
  if (props.maxHeight !== undefined) return props.maxHeight
  if (props.height !== undefined) return undefined
  if (props.fill && autoMaxHeight.value && autoMaxHeight.value > 0) return autoMaxHeight.value
  return undefined
})

const pagination = computed(() => ({
  current: props.page,
  pageSize: props.pageSize,
  total: props.total,
}))

function onPageChange(pageInfo: { current: number; pageSize: number }) {
  emit('update:page', pageInfo.current)
  emit('update:pageSize', pageInfo.pageSize)
  emit('change')
}
</script>

<template>
  <div ref="wrapRef" class="app-table">
    <t-table
      row-key="id"
      :columns="columns"
      :data="(data as TableRowData[])"
      :loading="loading"
      :height="height"
      :max-height="tableMaxHeight"
      :pagination="pagination"
      :selected-row-keys="selectedRowKeys"
      v-bind="$attrs"
      @page-change="onPageChange"
      @select-change="(keys: Array<string | number>) => emit('update:selectedRowKeys', keys)"
    >
      <template #empty>
        <AppEmpty />
      </template>
      <template v-for="(_, name) in $slots" :key="String(name)" #[name]="slotProps">
        <slot :name="name" v-bind="slotProps || {}" />
      </template>
    </t-table>
  </div>
</template>

<style scoped>
.app-table {
  width: 100%;
  min-height: 0;
}

.app-table :deep(.t-table__content) {
  overscroll-behavior: contain;
}
</style>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { DropdownOption } from 'tdesign-vue-next'
import { useTagsViewStore } from '@/stores/tagsView'
import AppIcon from '@/components/AppIcon/index.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const tagsView = useTagsViewStore()

function onSelect(path: string) {
  if (path !== route.path) void router.push(path)
}

function onClose(path: string) {
  const current = route.path === path
  const index = tagsView.visited.findIndex((item) => item.path === path)
  tagsView.closeView(path)
  if (!current) return
  const next = tagsView.visited[index] ?? tagsView.visited[index - 1] ?? tagsView.visited[0]
  if (next) void router.push(next.path)
}

function closeOthers() {
  tagsView.closeOthers(route.path)
}

function closeAll() {
  tagsView.closeAll()
  const affix = tagsView.affixView
  if (affix && affix.path !== route.path) void router.push(affix.path)
}

function refresh() {
  void tagsView.reloadCurrent(String(route.name ?? ''))
}
</script>

<template>
  <div class="tags-view">
    <div class="tags-view__list">
      <t-tag
        v-for="item in tagsView.visited"
        :key="item.path"
        :theme="item.path === route.path ? 'primary' : 'default'"
        :closable="!item.affix"
        variant="light"
        class="tags-view__item"
        @click="onSelect(item.path)"
        @close="onClose(item.path)"
      >
        {{ t(item.title) }}
      </t-tag>
    </div>
    <t-tooltip :content="t('common.refresh')">
      <t-button variant="text" shape="square" size="small" @click="refresh">
        <AppIcon name="refresh" />
      </t-button>
    </t-tooltip>
    <t-dropdown
      :options="[
        { content: t('common.closeOthers'), value: 'others' },
        { content: t('common.closeAll'), value: 'all' },
      ]"
      @click="(data: DropdownOption) => (data.value === 'all' ? closeAll() : closeOthers())"
    >
      <t-button variant="text" size="small">{{ t('common.close') }}</t-button>
    </t-dropdown>
  </div>
</template>

<style scoped>
.tags-view {
  height: var(--admin-tags-height);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  border-bottom: 1px solid var(--td-component-stroke);
  background: var(--td-bg-color-container);
}

.tags-view__list {
  flex: 1;
  display: flex;
  gap: 8px;
  overflow: auto;
}

.tags-view__item {
  cursor: pointer;
}
</style>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { MenuValue } from 'tdesign-vue-next'
import { usePermissionStore } from '@/stores/permission'
import { useSettingsStore } from '@/stores/settings'
import AppBrandLogo from '@/components/AppBrandLogo/index.vue'
import SidebarMenu from '@/layouts/components/SidebarMenu.vue'
import type { AppMenu } from '@/router/helper'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const permission = usePermissionStore()
const settings = useSettingsStore()

const menuTheme = computed(() => (settings.darkMode ? 'dark' : 'light'))
const active = computed(() => route.path)
const expanded = ref<MenuValue[]>([])

function submenuPaths(items: AppMenu[], result = new Set<string>()) {
  items.forEach((item) => {
    if (item.children?.length) {
      result.add(item.path)
      submenuPaths(item.children, result)
    }
  })
  return result
}

function syncExpandedFromRoute() {
  const parents = submenuPaths(permission.menus)
  const matched = [...parents].filter(
    (path) => route.path === path || route.path.startsWith(`${path}/`),
  )
  expanded.value = Array.from(new Set([...expanded.value, ...matched]))
}

watch(
  () => [route.path, permission.menus] as const,
  () => syncExpandedFromRoute(),
  { immediate: true },
)

function onExpand(value: MenuValue[]) {
  expanded.value = value
}

function onChange(value: MenuValue) {
  const path = String(value)
  if (submenuPaths(permission.menus).has(path)) return
  void router.push(path)
}
</script>

<template>
  <t-menu
    :value="active"
    :expanded="expanded"
    :collapsed="settings.collapsed"
    expand-type="normal"
    :theme="menuTheme"
    :width="settings.collapsed ? 64 : 220"
    @change="onChange"
    @expand="onExpand"
  >
    <template #logo>
      <div class="sidebar-logo" :class="{ 'sidebar-logo--collapsed': settings.collapsed }">
        <AppBrandLogo class="sidebar-logo__img" size="32px" />
        <span v-show="!settings.collapsed" class="sidebar-logo__name">{{
          t('common.appName')
        }}</span>
      </div>
    </template>
    <SidebarMenu :items="permission.menus" show-icon />
  </t-menu>
</template>

<style scoped>
.sidebar-logo {
  height: var(--admin-header-height);
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 16px;
  font-weight: 700;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-logo--collapsed {
  justify-content: center;
  padding: 0;
}

.sidebar-logo__img {
  width: 32px;
  height: 32px;
  flex-shrink: 0;
}

.sidebar-logo__name {
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--td-text-color-primary);
}
</style>

<script setup lang="ts">
import { computed, type Component } from 'vue'
import {
  AppIcon as FallbackIcon,
  DashboardIcon,
  LayersIcon,
  RefreshIcon,
  SettingIcon,
  TranslateIcon,
  UserIcon,
  ViewListIcon,
  ViewModuleIcon,
} from 'tdesign-icons-vue-next'

const props = withDefaults(
  defineProps<{
    name: string
    size?: string
  }>(),
  { size: '16px' },
)

const iconMap: Record<string, Component> = {
  dashboard: DashboardIcon,
  layers: LayersIcon,
  refresh: RefreshIcon,
  setting: SettingIcon,
  translate: TranslateIcon,
  user: UserIcon,
  'view-list': ViewListIcon,
  'view-module': ViewModuleIcon,
}

const icon = computed(() => iconMap[props.name] ?? FallbackIcon)
</script>

<template>
  <component :is="icon" :size="size" />
</template>

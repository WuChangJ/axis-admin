<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import AppIcon from '@/components/AppIcon/index.vue'
import type { AppMenu } from '@/router/helper'

defineOptions({ name: 'SidebarMenu' })

withDefaults(
  defineProps<{
    items: AppMenu[]
    showIcon?: boolean
  }>(),
  { showIcon: false },
)

const { t } = useI18n()
</script>

<template>
  <template v-for="item in items" :key="item.path">
    <t-submenu v-if="item.children?.length" :value="item.path">
      <template v-if="showIcon && item.icon" #icon>
        <AppIcon :name="item.icon" />
      </template>
      <template #title>{{ t(item.title) }}</template>
      <SidebarMenu :items="item.children" />
    </t-submenu>
    <t-menu-item v-else :value="item.path" :to="item.path">
      <template v-if="showIcon && item.icon" #icon>
        <AppIcon :name="item.icon" />
      </template>
      {{ t(item.title) }}
    </t-menu-item>
  </template>
</template>

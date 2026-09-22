<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { DropdownOption } from 'tdesign-vue-next'
import { localeOptions } from '@/config'
import { useSettingsStore } from '@/stores/settings'
import { useUserStore } from '@/stores/user'
import { useSessionStore } from '@/stores/session'
import AppIcon from '@/components/AppIcon/index.vue'

const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const settings = useSettingsStore()
const user = useUserStore()
const session = useSessionStore()

const crumbs = computed(() => route.matched.filter((item) => item.meta.title && !item.meta.hidden))

const langOptions = computed(() =>
  localeOptions.map((item) => ({
    content: item.label,
    value: item.value,
  })),
)

const userOptions = computed(() => [
  { content: t('common.profile'), value: 'profile' },
  { content: t('common.logout'), value: 'logout' },
])

function onLangClick(data: DropdownOption) {
  settings.changeLocale(String(data.value) as 'zh-CN' | 'en-US')
}

function onUserClick(data: DropdownOption) {
  if (data.value === 'profile') {
    void router.push('/profile')
    return
  }
  if (data.value === 'logout') {
    session.logoutAndRedirect()
  }
}

function openSettings() {
  settings.settingsVisible = true
}

function toggleCollapse() {
  settings.collapsed = !settings.collapsed
}
</script>

<template>
  <header class="navbar">
    <div class="navbar__left">
      <t-button variant="text" shape="square" @click="toggleCollapse">
        <AppIcon :name="settings.collapsed ? 'view-list' : 'view-module'" />
      </t-button>
      <t-breadcrumb>
        <t-breadcrumb-item v-for="item in crumbs" :key="item.path">
          {{ t(String(item.meta.title)) }}
        </t-breadcrumb-item>
      </t-breadcrumb>
    </div>
    <div class="navbar__right">
      <t-dropdown :options="langOptions" @click="onLangClick">
        <t-button variant="text" shape="square">
          <AppIcon name="translate" />
        </t-button>
      </t-dropdown>
      <t-button variant="text" shape="square" @click="openSettings">
        <AppIcon name="setting" />
      </t-button>
      <t-dropdown :options="userOptions" @click="onUserClick">
        <div class="navbar__user">
          <t-avatar size="small">{{ user.avatarText }}</t-avatar>
          <span>{{ user.displayName }}</span>
        </div>
      </t-dropdown>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  height: var(--admin-header-height);
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  border-bottom: 1px solid var(--td-component-stroke);
  background: var(--td-bg-color-container);
}

.navbar__left,
.navbar__right {
  display: flex;
  align-items: center;
  gap: 8px;
}

.navbar__user {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0 8px;
}
</style>

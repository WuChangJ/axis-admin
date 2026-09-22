<script setup lang="ts">
import { computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSettingsStore } from '@/stores/settings'
import { useTagsViewStore } from '@/stores/tagsView'
import Sidebar from './components/Sidebar.vue'
import Navbar from './components/Navbar.vue'
import TagsView from './components/TagsView.vue'
import SettingsDrawer from './components/SettingsDrawer.vue'

const route = useRoute()
const settings = useSettingsStore()
const tagsView = useTagsViewStore()

watch(
  () => route.fullPath,
  () => {
    tagsView.addView(route)
  },
  { immediate: true },
)

const cachedViews = computed(() => tagsView.cachedViews)
const asideWidth = computed(() => (settings.collapsed ? 64 : 220))
</script>

<template>
  <div class="admin-root">
    <t-layout class="admin-layout">
    <t-aside class="admin-layout__aside" :width="`${asideWidth}px`">
      <Sidebar />
    </t-aside>
    <t-layout class="admin-layout__main">
      <Navbar />
      <TagsView v-if="settings.showTags" />
      <t-content class="admin-layout__content">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <keep-alive :include="cachedViews">
              <component :is="Component" :key="`${String(route.name)}-${tagsView.reloadToken}`" />
            </keep-alive>
          </transition>
        </router-view>
      </t-content>
    </t-layout>
  </t-layout>
    <SettingsDrawer />
  </div>
</template>

<style scoped>
.admin-root,
.admin-layout {
  height: 100%;
  overflow: hidden;
  overscroll-behavior: none;
}

.admin-layout__aside {
  flex: 0 0 auto;
  border-right: 1px solid var(--td-component-stroke);
  background: var(--td-bg-color-container);
  overflow: hidden auto;
}

.admin-layout__main {
  min-width: 0;
  min-height: 0;
  flex: 1;
  overflow: hidden;
}

.admin-layout__content {
  flex: 1;
  min-width: 0;
  min-height: 0;
  padding: 16px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  background: var(--td-bg-color-page);
}

.admin-layout__content > * {
  flex: 1;
  min-height: 0;
  height: 100%;
}
</style>

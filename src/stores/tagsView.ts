import { defineStore } from 'pinia'
import { computed, nextTick, ref } from 'vue'
import type { RouteLocationNormalizedLoaded } from 'vue-router'

export interface TagView {
  name: string
  path: string
  title: string
  affix?: boolean
  keepAlive?: boolean
}

function toTag(route: RouteLocationNormalizedLoaded): TagView | null {
  if (!route.name || route.meta.hidden || !route.meta.title) return null
  return {
    name: String(route.name),
    path: route.path,
    title: route.meta.title,
    keepAlive: route.meta.keepAlive,
  }
}

export const useTagsViewStore = defineStore('tagsView', () => {
  const visited = ref<TagView[]>([])
  const reloadToken = ref(0)
  const excluding = ref('')

  const affixView = computed(() => visited.value.find((item) => item.affix) ?? null)

  const cachedViews = computed(() =>
    visited.value
      .filter((item) => item.keepAlive && item.name !== excluding.value)
      .map((item) => item.name),
  )

  function initAffix(tag: TagView) {
    const others = visited.value.filter((item) => item.path !== tag.path && !item.affix)
    visited.value = [{ ...tag, affix: true }, ...others]
  }

  function addView(route: RouteLocationNormalizedLoaded) {
    const tag = toTag(route)
    if (!tag) return
    const existing = visited.value.find((item) => item.path === tag.path)
    if (existing) return
    const affix = affixView.value
    tag.affix = Boolean(affix && affix.path === tag.path)
    if (tag.affix) {
      visited.value = [tag, ...visited.value.filter((item) => item.path !== tag.path)]
      return
    }
    visited.value.push(tag)
  }

  function closeView(path: string) {
    const target = visited.value.find((item) => item.path === path)
    if (target?.affix) return
    visited.value = visited.value.filter((item) => item.path !== path)
  }

  function closeOthers(path: string) {
    visited.value = visited.value.filter((item) => item.affix || item.path === path)
  }

  function closeAll() {
    visited.value = visited.value.filter((item) => item.affix)
  }

  async function reloadCurrent(name: string) {
    excluding.value = name
    reloadToken.value += 1
    await nextTick()
    excluding.value = ''
  }

  function reset() {
    visited.value = []
    excluding.value = ''
    reloadToken.value += 1
  }

  return {
    visited,
    affixView,
    cachedViews,
    reloadToken,
    excluding,
    initAffix,
    addView,
    closeView,
    closeOthers,
    closeAll,
    reloadCurrent,
    reset,
  }
})

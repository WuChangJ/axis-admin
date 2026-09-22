import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { appConfig } from '@/config'
import { getMenuApi } from '@/api/menu'
import router, { resetRouter } from '@/router'
import { LAYOUT_NAME, notFoundRoute } from '@/router/routes/constant'
import { staticRoutes } from '@/router/routes/static'
import { firstLeafMenu, menusFromRoutes, transformRoutes, type AppMenu } from '@/router/helper'
import { useTagsViewStore } from '@/stores/tagsView'

function collectNames(routes: RouteRecordRaw[], result: string[] = []) {
  routes.forEach((route) => {
    if (route.name) result.push(String(route.name))
    if (route.children?.length) collectNames(route.children, result)
  })
  return result
}

export const usePermissionStore = defineStore('permission', () => {
  const isReady = ref(false)
  const menus = ref<AppMenu[]>([])
  const addedNames = ref<string[]>([])

  async function generateRoutes() {
    const routes =
      appConfig.routerMode === 'dynamic' ? transformRoutes(await getMenuApi()) : staticRoutes

    routes.forEach((route) => {
      router.addRoute(LAYOUT_NAME, route)
    })

    if (!router.hasRoute(notFoundRoute.name as string)) {
      router.addRoute(notFoundRoute)
    }

    addedNames.value = [...collectNames(routes), String(notFoundRoute.name)]
    menus.value = menusFromRoutes(routes)
    const first = firstLeafMenu(menus.value)
    if (first) {
      const matched = router.getRoutes().find((item) => String(item.name) === first.name)
      useTagsViewStore().initAffix({
        name: first.name,
        path: first.path,
        title: first.title,
        affix: true,
        keepAlive: Boolean(matched?.meta?.keepAlive),
      })
    }
    isReady.value = true
  }

  function reset() {
    resetRouter(addedNames.value)
    addedNames.value = []
    menus.value = []
    isReady.value = false
  }

  return {
    isReady,
    menus,
    addedNames,
    generateRoutes,
    reset,
  }
})

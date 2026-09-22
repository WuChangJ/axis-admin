import { defineStore } from 'pinia'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { useTagsViewStore } from '@/stores/tagsView'
import router from '@/router'

export const useSessionStore = defineStore('session', () => {
  function logoutAndRedirect() {
    useUserStore().logout()
    usePermissionStore().reset()
    useTagsViewStore().reset()
    void router.push('/login')
  }

  return { logoutAndRedirect }
})

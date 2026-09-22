import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { appConfig } from '@/config'
import { clearToken, getToken, setToken } from '@/utils/auth'
import { loginApi, getUserInfoApi, type LoginPayload, type UserInfo } from '@/api/auth'

function readUser(): UserInfo | null {
  try {
    const raw = localStorage.getItem(appConfig.userKey)
    return raw ? (JSON.parse(raw) as UserInfo) : null
  } catch {
    return null
  }
}

export const useUserStore = defineStore('user', () => {
  const token = ref(getToken())
  const userInfo = ref<UserInfo | null>(readUser())

  const displayName = computed(() => userInfo.value?.name || userInfo.value?.username || 'Admin')
  const avatarText = computed(() => displayName.value.slice(0, 1).toUpperCase())

  async function login(payload: LoginPayload) {
    const result = await loginApi(payload)
    token.value = result.token
    setToken(result.token)
    userInfo.value = result.user
    localStorage.setItem(appConfig.userKey, JSON.stringify(result.user))
  }

  async function fetchUser() {
    const info = await getUserInfoApi()
    userInfo.value = info
    localStorage.setItem(appConfig.userKey, JSON.stringify(info))
  }

  function logout() {
    token.value = ''
    userInfo.value = null
    clearToken()
    localStorage.removeItem(appConfig.userKey)
  }

  return {
    token,
    userInfo,
    displayName,
    avatarText,
    login,
    fetchUser,
    logout,
  }
})

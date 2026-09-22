import { delay } from '@/api/mock'

export interface LoginPayload {
  username: string
  password: string
}

export interface UserInfo {
  id: number
  username: string
  name: string
  avatar: string
}

export interface LoginResult {
  token: string
  user: UserInfo
}

const demoUser: UserInfo = {
  id: 1,
  username: 'admin',
  name: 'Admin',
  avatar: '',
}

export async function loginApi(payload: LoginPayload) {
  await delay(null)
  if (!payload.username || !payload.password) {
    return Promise.reject({ code: 422, message: 'invalid', data: null })
  }
  return {
    token: 'mock-token',
    user: { ...demoUser, username: payload.username, name: payload.username },
  } satisfies LoginResult
}

export async function getUserInfoApi() {
  await delay(null)
  return demoUser
}

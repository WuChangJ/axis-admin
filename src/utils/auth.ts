import { appConfig } from '@/config'

/**
 * 读取本地登录凭证。
 * 没有 token 时返回空字符串，守卫据此判定未登录。
 */
export function getToken() {
  return localStorage.getItem(appConfig.tokenKey) ?? ''
}

/**
 * 写入登录凭证。
 * 登录成功后由 user store 调用，后续请求拦截器会带上 Bearer。
 */
export function setToken(token: string) {
  localStorage.setItem(appConfig.tokenKey, token)
}

/**
 * 清除登录凭证。
 * 退出登录或 401 处理时调用，避免残留 token 反复请求。
 */
export function clearToken() {
  localStorage.removeItem(appConfig.tokenKey)
}

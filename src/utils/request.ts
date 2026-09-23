import axios, { type AxiosRequestConfig, type InternalAxiosRequestConfig } from 'axios'
import { appConfig } from '@/config'
import { extraCodeActions, getHttpI18nKey } from '@/config/http-code'
import { i18n } from '@/locales'
import { useFeedback } from '@/hooks/useFeedback'
import { getToken } from '@/utils/auth'
import type { ApiResponse, RequestOptions } from '@/types/http'

/** axios 配置再叠一层业务选项（跳过错误处理、强制 FormData）。 */
type RequestConfig = AxiosRequestConfig & RequestOptions

/** 401 / 业务未授权时的回调，由 main.ts 注入登出跳转，避免 request 直接依赖 router。 */
let unauthorizedHandler: (() => void) | null = null

/**
 * 注册未授权处理器。
 * 应用启动时绑定一次即可，后续拦截器统一调用。
 */
export function onUnauthorized(handler: () => void) {
  unauthorizedHandler = handler
}

/**
 * 读取 i18n 文案；key 不存在时 vue-i18n 会原样返回 key，此时改用 fallback。
 */
function t(key: string, fallback: string) {
  const value = (i18n.global as unknown as { t: (key: string) => string }).t(key)
  return value === key ? fallback : value
}

const feedback = useFeedback()

/** 全局 axios 实例：统一 baseURL 与超时。 */
const instance = axios.create({
  baseURL: appConfig.apiBaseURL,
  timeout: appConfig.timeout,
})

instance.interceptors.request.use((config: InternalAxiosRequestConfig & RequestOptions) => {
  // 1. 有 token 则写入 Authorization，接口侧按 Bearer 解析。
  const token = getToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  // 2. FormData 交给浏览器自动带 boundary；普通对象走 JSON。
  if (config.formData || config.data instanceof FormData) {
    delete config.headers['Content-Type']
  } else {
    config.headers['Content-Type'] = 'application/json'
  }

  return config
})

instance.interceptors.response.use(
  (response) => {
    const payload = response.data as ApiResponse
    const config = response.config as RequestConfig

    // 1. 标准业务包：{ code, data, message }。
    if (payload && typeof payload === 'object' && 'code' in payload) {
      // 2. 成功码直接把 data 交给调用方，调用方拿不到外层包装。
      if (appConfig.successCodes.includes(payload.code)) {
        return payload.data as never
      }

      // 3. 失败码按配置提示，再把整包 reject 给业务 catch。
      if (!config.skipErrorHandler) {
        handleBizError(payload)
      }

      return Promise.reject(payload)
    }

    // 4. 非标准包（文件流、纯文本等）原样返回 body。
    return response.data as never
  },
  (error) => {
    const config = error.config as RequestConfig | undefined
    if (!config?.skipErrorHandler) {
      const status = error.response?.status as number | undefined
      // HTTP 401：提示后走登出。
      if (status === 401) {
        feedback.error(t('http.code.401', 'Unauthorized'))
        unauthorizedHandler?.()
      } else if (!error.response) {
        // 无 response 视为断网 / 超时。
        feedback.error(t('http.network', 'Network error'))
      } else {
        feedback.error(t('http.httpError', 'Request failed'))
      }
    }
    return Promise.reject(error)
  },
)

/**
 * 按业务码选择提示方式。
 * 未配置的码默认 toast error。
 */
function handleBizError(payload: ApiResponse) {
  const action = extraCodeActions[payload.code]
  const i18nKey = getHttpI18nKey(payload.code)
  const message = t(i18nKey, payload.message || t('http.httpError', 'Request failed'))

  if (action === 'logout') {
    feedback.error(message)
    unauthorizedHandler?.()
    return
  }
  if (action === 'dialog') {
    void feedback.alert(message)
    return
  }
  if (action === 'notify') {
    feedback.notify(t('common.tip', 'Tip'), message)
    return
  }
  feedback.error(message)
}

/**
 * 把普通对象转成 FormData。
 * 已是 FormData 或未开 formData 选项时原样返回。
 */
function withFormData(data: unknown, options?: RequestOptions) {
  if (!options?.formData || data instanceof FormData) return data
  const form = new FormData()
  Object.entries(data as Record<string, unknown>).forEach(([key, value]) => {
    // 跳过空值，避免后端收到 "undefined" 字符串。
    if (value === undefined || value === null) return
    if (value instanceof Blob) {
      form.append(key, value)
    } else {
      form.append(key, String(value))
    }
  })
  return form
}

/** 对外请求方法：成功时泛型 T 对应业务 data。 */
export const request = {
  get<T>(url: string, params?: unknown, options?: RequestOptions) {
    return instance.get<unknown, T>(url, { params, ...options })
  },
  post<T>(url: string, data?: unknown, options?: RequestOptions) {
    return instance.post<unknown, T>(url, withFormData(data, options), options)
  },
  put<T>(url: string, data?: unknown, options?: RequestOptions) {
    return instance.put<unknown, T>(url, withFormData(data, options), options)
  },
  delete<T>(url: string, params?: unknown, options?: RequestOptions) {
    return instance.delete<unknown, T>(url, { params, ...options })
  },
}

export default request

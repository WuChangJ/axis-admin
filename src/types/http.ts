import type { AxiosRequestConfig } from 'axios'

export interface ApiResponse<T = unknown> {
  code: number
  data: T
  message: string
}

export interface PageResult<T> {
  list: T[]
  total: number
}

export interface RequestOptions extends AxiosRequestConfig {
  formData?: boolean
  skipErrorHandler?: boolean
}

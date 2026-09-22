/**
 * 业务 / HTTP 状态码常量。
 * 请求层用这些值判断成功、登录失效和表单校验失败。
 */
export const HttpCode = {
  SUCCESS: 0,
  SUCCESS_HTTP: 200,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  VALIDATE: 422,
} as const

/** 非成功业务码对应的前端处理策略。 */
export type ExtraCodeAction = 'message' | 'notify' | 'dialog' | 'logout'

/**
 * 按业务码映射处理动作。
 * logout：清会话并跳登录；message：轻提示；dialog：弹窗；notify：通知条。
 */
export const extraCodeActions: Record<number, ExtraCodeAction> = {
  [HttpCode.UNAUTHORIZED]: 'logout',
  [HttpCode.FORBIDDEN]: 'message',
  [HttpCode.VALIDATE]: 'dialog',
}

/**
 * 把数字业务码转成 i18n key，例如 401 -> `http.code.401`。
 * 文案缺失时请求层会回落到接口 message。
 */
export function getHttpI18nKey(code: number) {
  return `http.code.${code}`
}

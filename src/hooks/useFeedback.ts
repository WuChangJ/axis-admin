import { DialogPlugin, MessagePlugin, NotifyPlugin } from 'tdesign-vue-next'
import { i18n } from '@/locales'

type I18nLike = { t: (key: string) => string }

/** 拦截器等非 setup 场景也能读文案，所以走 i18n.global 而不是 useI18n。 */
function translate(key: string, fallback?: string) {
  const translated = (i18n.global as unknown as I18nLike).t(key)
  return translated === key ? (fallback ?? key) : translated
}

export function useFeedback() {
  function success(content: string) {
    MessagePlugin.success(content)
  }

  function error(content: string) {
    MessagePlugin.error(content)
  }

  function warning(content: string) {
    MessagePlugin.warning(content)
  }

  function info(content: string) {
    MessagePlugin.info(content)
  }

  function notify(title: string, content?: string) {
    NotifyPlugin.info({ title, content })
  }

  function confirm(content: string, title?: string) {
    return new Promise<boolean>((resolve) => {
      const dialog = DialogPlugin.confirm({
        header: title ?? translate('common.confirmTitle', 'Confirm'),
        body: content,
        confirmBtn: translate('common.confirm', 'Confirm'),
        cancelBtn: translate('common.cancel', 'Cancel'),
        onConfirm: () => {
          dialog.destroy()
          resolve(true)
        },
        onClose: () => {
          dialog.destroy()
          resolve(false)
        },
      })
    })
  }

  function alert(content: string, title?: string) {
    return new Promise<void>((resolve) => {
      const dialog = DialogPlugin.alert({
        header: title ?? translate('common.tip', 'Tip'),
        body: content,
        confirmBtn: translate('common.confirm', 'Confirm'),
        onConfirm: () => {
          dialog.destroy()
          resolve()
        },
      })
    })
  }

  return { success, error, warning, info, notify, confirm, alert }
}

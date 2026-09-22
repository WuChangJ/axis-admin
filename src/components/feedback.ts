import { DialogPlugin, MessagePlugin, NotifyPlugin } from 'tdesign-vue-next'
import { i18n } from '@/locales'

type I18nLike = { t: (key: string) => string }

function t(key: string, fallback?: string) {
  const translated = (i18n.global as unknown as I18nLike).t(key)
  return translated === key ? (fallback ?? key) : translated
}

export const feedback = {
  success(content: string) {
    MessagePlugin.success(content)
  },
  error(content: string) {
    MessagePlugin.error(content)
  },
  warning(content: string) {
    MessagePlugin.warning(content)
  },
  info(content: string) {
    MessagePlugin.info(content)
  },
  notify(title: string, content?: string) {
    NotifyPlugin.info({ title, content })
  },
  confirm(content: string, title?: string) {
    return new Promise<boolean>((resolve) => {
      const dialog = DialogPlugin.confirm({
        header: title ?? t('common.confirmTitle', 'Confirm'),
        body: content,
        confirmBtn: t('common.confirm', 'Confirm'),
        cancelBtn: t('common.cancel', 'Cancel'),
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
  },
  alert(content: string, title?: string) {
    return new Promise<void>((resolve) => {
      const dialog = DialogPlugin.alert({
        header: title ?? t('common.tip', 'Tip'),
        body: content,
        confirmBtn: t('common.confirm', 'Confirm'),
        onConfirm: () => {
          dialog.destroy()
          resolve()
        },
      })
    })
  },
}

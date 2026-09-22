export function vCopy(el: HTMLElement, binding: { value: string }) {
  const handler = async () => {
    await navigator.clipboard.writeText(String(binding.value ?? ''))
  }
  el.addEventListener('click', handler)
  ;(el as HTMLElement & { _copyHandler?: () => void })._copyHandler = handler
}

export function vCopyUnmounted(el: HTMLElement) {
  const handler = (el as HTMLElement & { _copyHandler?: () => void })._copyHandler
  if (handler) el.removeEventListener('click', handler)
}

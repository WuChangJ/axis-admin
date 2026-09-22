import { ref } from 'vue'

export function useForm<T extends Record<string, unknown>>(initial: T) {
  const model = ref({ ...initial })
  const submitting = ref(false)

  function reset() {
    model.value = { ...initial }
  }

  async function submit(handler: (value: T) => Promise<void> | void) {
    submitting.value = true
    try {
      await handler(model.value as T)
    } finally {
      submitting.value = false
    }
  }

  return { model, submitting, reset, submit }
}

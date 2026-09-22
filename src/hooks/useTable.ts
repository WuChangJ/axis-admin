import { ref } from 'vue'
import type { PageResult } from '@/types/http'

export function useTable<T, Q extends Record<string, unknown>>(
  fetcher: (params: Q & { page: number; pageSize: number }) => Promise<PageResult<T>>,
  initialQuery: Q,
) {
  const loading = ref(false)
  const data = ref<T[]>([])
  const total = ref(0)
  const page = ref(1)
  const pageSize = ref(10)
  const query = ref({ ...initialQuery })
  const selectedRowKeys = ref<Array<string | number>>([])

  async function fetchData() {
    loading.value = true
    try {
      const result = await fetcher({
        ...(query.value as Q),
        page: page.value,
        pageSize: pageSize.value,
      })
      data.value = result.list
      total.value = result.total
    } finally {
      loading.value = false
    }
  }

  function search() {
    page.value = 1
    return fetchData()
  }

  function reset() {
    query.value = { ...initialQuery }
    return search()
  }

  return {
    loading,
    data,
    total,
    page,
    pageSize,
    query,
    selectedRowKeys,
    fetchData,
    search,
    reset,
  }
}

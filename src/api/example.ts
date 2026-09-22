import { delay } from '@/api/mock'
import type { PageResult } from '@/types/http'

export interface ExampleItem {
  id: number
  name: string
  status: number
  remark: string
  createTime: string
}

const allItems: ExampleItem[] = Array.from({ length: 32 }, (_, index) => ({
  id: index + 1,
  name: `Item ${index + 1}`,
  status: index % 3 === 0 ? 0 : 1,
  remark: `Remark ${index + 1}`,
  createTime: `2026-09-${String((index % 27) + 1).padStart(2, '0')} 10:00:00`,
}))

export async function getExampleListApi(params: {
  page: number
  pageSize: number
  name?: string
  status?: number | ''
}): Promise<PageResult<ExampleItem>> {
  await delay(null)
  const filtered = allItems.filter((item) => {
    const matchName = params.name
      ? item.name.toLowerCase().includes(params.name.toLowerCase())
      : true
    const matchStatus =
      params.status === undefined || params.status === ''
        ? true
        : item.status === Number(params.status)
    return matchName && matchStatus
  })
  const start = (params.page - 1) * params.pageSize
  return {
    list: filtered.slice(start, start + params.pageSize),
    total: filtered.length,
  }
}

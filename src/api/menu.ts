import { delay, mockMenus, type MenuRecord } from '@/api/mock'

export async function getMenuApi(): Promise<MenuRecord[]> {
  return delay(mockMenus)
}

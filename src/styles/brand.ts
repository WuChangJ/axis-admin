export type ThemePreset = 'blue' | 'teal' | 'violet' | 'amber' | 'custom'

export const BRAND_PRESETS: Record<Exclude<ThemePreset, 'custom'>, string> = {
  blue: '#2B6DE5',
  teal: '#0D9B8A',
  violet: '#6B5CE7',
  amber: '#D97706',
}

export const DEFAULT_BRAND = BRAND_PRESETS.blue

const PRESET_IDS = Object.keys(BRAND_PRESETS) as Array<Exclude<ThemePreset, 'custom'>>

export function isThemePreset(value: unknown): value is ThemePreset {
  return value === 'custom' || PRESET_IDS.includes(value as Exclude<ThemePreset, 'custom'>)
}

export function normalizeHex(value: string) {
  const hex = value.trim()
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return hex.toUpperCase()
  if (/^#[0-9a-fA-F]{3}$/.test(hex)) {
    const [, a, b, c] = hex
    return `#${a}${a}${b}${b}${c}${c}`.toUpperCase()
  }
  return DEFAULT_BRAND
}

export function resolveBrandHex(preset: ThemePreset, customBrand: string) {
  if (preset === 'custom') return normalizeHex(customBrand)
  return BRAND_PRESETS[preset]
}

function parseHex(hex: string): [number, number, number] {
  const value = normalizeHex(hex).slice(1)
  return [
    Number.parseInt(value.slice(0, 2), 16),
    Number.parseInt(value.slice(2, 4), 16),
    Number.parseInt(value.slice(4, 6), 16),
  ]
}

function toHex(r: number, g: number, b: number) {
  const channel = (n: number) =>
    Math.max(0, Math.min(255, Math.round(n)))
      .toString(16)
      .padStart(2, '0')
  return `#${channel(r)}${channel(g)}${channel(b)}`
}

function mix(from: [number, number, number], to: [number, number, number], amount: number) {
  return toHex(
    from[0] + (to[0] - from[0]) * amount,
    from[1] + (to[1] - from[1]) * amount,
    from[2] + (to[2] - from[2]) * amount,
  )
}

function hexToBrandVars(hex: string, dark: boolean) {
  const brand = parseHex(hex)
  const lightBase: [number, number, number] = dark ? [15, 18, 24] : [255, 255, 255]
  const darkBase: [number, number, number] = dark ? [255, 255, 255] : [0, 0, 0]
  const scale = [
    mix(brand, lightBase, dark ? 0.78 : 0.88),
    mix(brand, lightBase, dark ? 0.64 : 0.75),
    mix(brand, lightBase, dark ? 0.48 : 0.55),
    mix(brand, lightBase, dark ? 0.32 : 0.35),
    mix(brand, lightBase, dark ? 0.18 : 0.18),
    mix(brand, lightBase, dark ? 0.08 : 0.08),
    normalizeHex(hex),
    mix(brand, darkBase, 0.12),
    mix(brand, darkBase, 0.28),
    mix(brand, darkBase, 0.45),
  ]

  return {
    '--td-brand-color-1': scale[0],
    '--td-brand-color-2': scale[1],
    '--td-brand-color-3': scale[2],
    '--td-brand-color-4': scale[3],
    '--td-brand-color-5': scale[4],
    '--td-brand-color-6': scale[5],
    '--td-brand-color-7': scale[6],
    '--td-brand-color-8': scale[7],
    '--td-brand-color-9': scale[8],
    '--td-brand-color-10': scale[9],
    '--td-brand-color': scale[6],
    '--td-brand-color-hover': dark ? scale[7] : scale[5],
    '--td-brand-color-active': dark ? scale[5] : scale[7],
    '--td-brand-color-light': scale[0],
    '--td-brand-color-focus': scale[1],
    '--admin-table-hover': scale[0],
  } as const
}

export function applyBrandTheme(hex: string, dark: boolean) {
  const root = document.documentElement
  const vars = hexToBrandVars(hex, dark)
  Object.entries(vars).forEach(([name, value]) => {
    root.style.setProperty(name, value)
  })
}

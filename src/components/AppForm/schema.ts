export type FormWidget = 'input' | 'textarea' | 'select' | 'date' | 'switch' | 'dict'

export interface FormSchemaItem {
  field: string
  label: string
  component?: FormWidget
  span?: number
  props?: Record<string, unknown>
  options?: { label: string; value: string | number }[]
  hidden?: boolean
}

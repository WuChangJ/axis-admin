<script setup lang="ts">
import { computed, ref } from 'vue'
import type { FormInstanceFunctions } from 'tdesign-vue-next'
import type { FormSchemaItem } from './schema'
import DictSelect from '@/components/DictSelect/index.vue'

const props = withDefaults(
  defineProps<{
    schema: FormSchemaItem[]
    labelWidth?: string | number
    disabled?: boolean
  }>(),
  {
    labelWidth: '80px',
    disabled: false,
  },
)

const model = defineModel<Record<string, unknown>>({ default: () => ({}) })
const formRef = ref<FormInstanceFunctions>()

const visibleSchema = computed(() => props.schema.filter((item) => !item.hidden))

async function validate() {
  return formRef.value?.validate()
}

function reset() {
  formRef.value?.reset()
}

defineExpose({ validate, reset, formRef })
</script>

<template>
  <t-form
    ref="formRef"
    :data="model"
    :label-width="labelWidth"
    :disabled="disabled"
    v-bind="$attrs"
  >
    <t-row :gutter="16">
      <t-col v-for="item in visibleSchema" :key="item.field" :span="item.span ?? 12">
        <t-form-item :name="item.field" :label="item.label">
          <t-input
            v-if="item.component === 'input' || !item.component"
            v-model="model[item.field] as string"
            v-bind="item.props"
          />
          <t-textarea
            v-else-if="item.component === 'textarea'"
            v-model="model[item.field] as string"
            v-bind="item.props"
          />
          <t-select
            v-else-if="item.component === 'select'"
            v-model="(model[item.field] as string | number)"
            :options="item.options"
            v-bind="item.props"
          />
          <t-date-picker
            v-else-if="item.component === 'date'"
            v-model="model[item.field] as string"
            v-bind="item.props"
          />
          <t-switch
            v-else-if="item.component === 'switch'"
            v-model="model[item.field] as boolean"
            v-bind="item.props"
          />
          <DictSelect
            v-else-if="item.component === 'dict'"
            v-model="model[item.field] as string | number | undefined"
            :options="item.options"
            v-bind="item.props"
          />
        </t-form-item>
      </t-col>
    </t-row>
    <slot name="footer" />
  </t-form>
</template>

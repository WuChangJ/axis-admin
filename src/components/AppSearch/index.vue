<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import type { FormSchemaItem } from '@/components/AppForm/schema'
import AppForm from '@/components/AppForm/index.vue'

const props = withDefaults(
  defineProps<{
    schema: FormSchemaItem[]
    collapsedCount?: number
  }>(),
  {
    collapsedCount: 2,
  },
)

const emit = defineEmits<{
  search: []
  reset: []
}>()

const model = defineModel<Record<string, unknown>>({ default: () => ({}) })
const { t } = useI18n()
const expanded = ref(false)

const displaySchema = computed(() =>
  expanded.value ? props.schema : props.schema.slice(0, props.collapsedCount),
)
</script>

<template>
  <div class="app-search">
    <AppForm v-model="model" :schema="displaySchema" label-width="80px">
      <template #footer>
        <t-form-item>
          <t-space>
            <t-button theme="primary" @click="emit('search')">{{ t('common.search') }}</t-button>
            <t-button variant="outline" @click="emit('reset')">{{ t('common.reset') }}</t-button>
            <t-button
              v-if="schema.length > collapsedCount"
              variant="text"
              @click="expanded = !expanded"
            >
              {{ expanded ? t('common.less') : t('common.more') }}
            </t-button>
          </t-space>
        </t-form-item>
      </template>
    </AppForm>
  </div>
</template>

<style scoped>
.app-search {
  padding: 16px 16px 0;
  margin-bottom: 12px;
  background: var(--td-bg-color-container);
  border-radius: 6px;
  flex-shrink: 0;
}
</style>

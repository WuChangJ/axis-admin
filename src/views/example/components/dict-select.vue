<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import DictSelect from '@/components/DictSelect/index.vue'
import { delay } from '@/api/mock'

defineOptions({ name: 'ExampleDictSelect' })

const { t } = useI18n()
const status = ref<string | number | undefined>(1)
const loaded = ref<string | number | undefined>()

const options = [
  { label: t('example.enabled'), value: 1 },
  { label: t('example.disabled'), value: 0 },
]

function loadStatus() {
  return delay(options)
}
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.dictSelectHint') }}</p>
    <t-card title="DictSelect">
      <t-space>
        <DictSelect v-model="status" :options="options" />
        <DictSelect v-model="loaded" :loader="loadStatus" />
      </t-space>
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

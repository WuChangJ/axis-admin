<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppTree from '@/components/AppTree/index.vue'

defineOptions({ name: 'ExampleTree' })

const { t } = useI18n()
const checked = ref<Array<string | number>>(['a'])

const data = [
  {
    label: t('example.treeTitle'),
    value: 'root',
    children: [
      { label: 'A', value: 'a' },
      { label: 'B', value: 'b' },
    ],
  },
]
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.treeHint') }}</p>
    <t-card title="AppTree">
      <AppTree v-model="checked" :data="data" checkable />
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}
</style>

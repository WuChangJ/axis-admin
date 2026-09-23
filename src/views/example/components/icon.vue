<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import AppIcon from '@/components/AppIcon/index.vue'

defineOptions({ name: 'ExampleIcon' })

const { t } = useI18n()

const names = [
  'dashboard',
  'layers',
  'refresh',
  'setting',
  'translate',
  'user',
  'view-list',
  'view-module',
  'unknown',
]
</script>

<template>
  <PageContainer>
    <p class="hint">{{ t('example.iconHint') }}</p>
    <t-card title="AppIcon">
      <div class="icon-grid">
        <div v-for="name in names" :key="name" class="icon-grid__item">
          <AppIcon :name="name" size="20px" />
          <span>{{ name }}</span>
        </div>
      </div>
    </t-card>
  </PageContainer>
</template>

<style scoped>
.hint {
  margin: 0 0 12px;
  color: var(--td-text-color-secondary);
}

.icon-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.icon-grid__item {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 140px;
  color: var(--td-text-color-primary);
}
</style>

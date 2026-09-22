<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'
import CopyText from '@/components/CopyText/index.vue'

defineOptions({ name: 'Dashboard' })

const { t } = useI18n()
</script>

<template>
  <PageContainer>
    <t-card :title="t('menu.dashboard')">
      <p>{{ t('dashboard.welcome') }}</p>
      <p>{{ t('dashboard.hint') }}</p>
      <p>
        <CopyText text="axis-admin" />
      </p>
    </t-card>
  </PageContainer>
</template>

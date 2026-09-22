<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageContainer from '@/components/PageContainer/index.vue'

defineOptions({ name: 'NotFound' })

const router = useRouter()
const { t } = useI18n()
</script>

<template>
  <PageContainer>
    <t-card>
      <h2>{{ t('common.pageNotFound') }}</h2>
      <t-button theme="primary" @click="router.push('/')">{{ t('common.backHome') }}</t-button>
    </t-card>
  </PageContainer>
</template>

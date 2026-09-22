<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import PageContainer from '@/components/PageContainer/index.vue'
import AppDescriptions from '@/components/AppDescriptions/index.vue'

defineOptions({ name: 'Profile' })

const { t } = useI18n()
const user = useUserStore()
</script>

<template>
  <PageContainer>
    <t-card :title="t('menu.profile')">
      <AppDescriptions
        :items="[
          { label: t('common.username'), value: user.userInfo?.username },
          { label: t('common.profile'), value: user.displayName },
        ]"
      />
    </t-card>
  </PageContainer>
</template>

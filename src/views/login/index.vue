<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '@/stores/user'
import { feedback } from '@/components/feedback'

defineOptions({ name: 'Login' })

const { t } = useI18n()
const router = useRouter()
const route = useRoute()
const user = useUserStore()

const form = reactive({
  username: 'admin',
  password: 'admin',
})
const loading = reactive({ submit: false })

async function onSubmit() {
  loading.submit = true
  try {
    await user.login(form)
    feedback.success(t('common.loginSuccess'))
    const redirect = typeof route.query.redirect === 'string' ? route.query.redirect : '/'
    await router.push(redirect)
  } catch {
    feedback.error(t('common.loginFailed'))
  } finally {
    loading.submit = false
  }
}
</script>

<template>
  <div class="login-page">
    <t-card class="login-page__card" :title="t('common.appName')">
      <t-form :data="form">
        <t-form-item name="username" :label="t('common.username')">
          <t-input v-model="form.username" />
        </t-form-item>
        <t-form-item name="password" :label="t('common.password')">
          <t-input v-model="form.password" type="password" />
        </t-form-item>
        <t-form-item>
          <t-button theme="primary" block type="button" :loading="loading.submit" @click="onSubmit">
            {{ t('common.loginAction') }}
          </t-button>
        </t-form-item>
      </t-form>
    </t-card>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--td-bg-color-page);
}

.login-page__card {
  width: 400px;
}
</style>

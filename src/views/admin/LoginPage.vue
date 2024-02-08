<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toastStore } from '@/store'
import axios from 'axios'

const router = useRouter()
const formRef = ref(null)
const formValues = ref({
  username: null,
  password: null
})
const states = ref({
  username: {
    message: null,
    color: null
  },
  password: {
    message: null,
    color: null
  }
})
const isLoading = ref(false)
async function submit() {
  isLoading.value = true
  states.value.username.message = null
  states.value.username.color = null
  states.value.password.message = null
  states.value.password.color = null

  await axios({
    method: 'post',
    url: `${import.meta.env.VITE_API_DOMAIN}/admin/login`,
    data: {
      username: formValues.value.username,
      password: formValues.value.password
    }
  })
    .then((res) => {
      localStorage.setItem('ncpadmin_token', res.data.adminToken)
      isLoading.value = false
      router.push({ name: 'admin dashboard' })
      toastStore.add({
        msg: 'Successfully logged in',
        duration: 2000
      })
    })
    .catch((err) => {
      if (err.response.status === 400) {
        states.value.username.message = 'Wrong username or password'
        states.value.username.color = 'error'
        states.value.password.message = null
        states.value.password.color = 'error'
      }

      if (err.response.status === 401) {
        states.value.username.message = null
        states.value.username.color = null
        states.value.password.message = 'Wrong password'
        states.value.password.color = 'error'
      }
    })
    .finally(() => (isLoading.value = false))
}
</script>

<template>
  <div class="flex h-[100svh] w-screen flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-blue-400">
    <div class="flex w-full max-w-[600px] flex-col gap-2">
      <h1 class="px-4">NCP Administrator Login</h1>

      <!-- login form -->
      <form @submit.prevent="submit()" ref="formRef" class="flex w-full flex-col gap-2 rounded-2xl bg-blue-50 px-4 py-4 shadow-lg">
        <VFormTextbox v-model="formValues.username" :color="states.username.color" :sub-label="states.username.message" label="Username" type="text" />
        <VFormTextbox
          v-model="formValues.password"
          :color="states.password.color"
          :sub-label="states.password.message"
          label="Password"
          type="password"
        />

        <VButton :disabled="isLoading" class="justify-center" type="submit">
          <VLoader v-if="isLoading" size="16px" thickness="2px" />
          <span v-else>Login</span>
        </VButton>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

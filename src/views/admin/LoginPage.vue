<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toastStore } from '@/store'
import axios from 'axios'

const router = useRouter()
const formRef = ref(null)

function submit() {
  const formData = new FormData(formRef.value)
  const formDataObj = {}

  formData.forEach((value, key) => {
    formDataObj[key] = value
  })

  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/admin/login`, formDataObj)
    .then((res) => {
      localStorage.setItem('ncp_admin_token', res.data.adminToken)

      router.push({ name: 'admin dashboard' })

      toastStore.add({
        msg: 'Successfully logged in.',
        duration: 4000
      })
    })
    .catch((err) => {
      if (err.response.status === 400) {
        toastStore.add({
          msg: 'Account not existing.',
          duration: 4000
        })
      }

      if (err.response.status === 401) {
        toastStore.add({
          msg: 'Wrong Password!',
          duration: 4000
        })
      }
    })
}
</script>

<template>
  <div class="flex h-[100svh] w-screen flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-blue-400">
    <div class="flex w-full max-w-[600px] flex-col gap-2">
      <h1 class="px-4">Login Page</h1>

      <!-- login form -->
      <form @submit.prevent="submit()" ref="formRef" class="flex w-full flex-col gap-2 rounded-2xl bg-blue-50 px-4 py-4 shadow-lg">
        <VFormTextbox label="Username" type="text" name="username" />
        <VFormTextbox label="Password" type="password" name="password" />

        <VButton class="justify-center" type="submit"> Login </VButton>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

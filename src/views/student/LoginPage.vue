<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toastStore } from '@/store'

const router = useRouter()

const formRef = ref(null)

function submit() {
  const formData = new FormData(formRef.value)
  const formDataObj = {}

  formData.forEach((value, key) => {
    formDataObj[key] = value
  })

  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/user/login`, formDataObj)
    .then((res) => {
      localStorage.setItem('ncp_user_id', res.data.userId)
      localStorage.setItem('ncp_token', res.data.token)
      localStorage.setItem('ncp_finished_pre_test', res.data.finishedPreTest)
      localStorage.setItem('ncp_finished_post_test', res.data.finishedPostTest)

      router.push({ name: 'introduction' })

      toastStore.add({
        msg: 'Successfully logged in.',
        duration: 4000
      })
    })
    .catch((err) => {
      if (err.response.status === 401) {
        toastStore.add({
          msg: 'Account not yet approved.',
          duration: 4000
        })
      }
    })
}
</script>

<template>
  <div class="flex h-[100svh] flex-col justify-end gap-2 bg-gradient-to-b from-blue-300 to-blue-400">
    <h1 class="px-4">Login Page</h1>

    <!-- login form -->
    <form @submit.prevent="submit()" ref="formRef" class="flex w-screen flex-col gap-2 rounded-t-2xl bg-blue-50 px-4 py-4">
      <VFormTextbox label="Email" type="email" name="email" required />
      <VFormTextbox label="Password" type="password" name="password" required />

      <VButton class="justify-center"> Login </VButton>
      <div class="text-right text-sm">
        Don't have an account?
        <VLinkButton :to="{ name: 'signup' }"> Create one </VLinkButton>
      </div>
    </form>
  </div>
</template>

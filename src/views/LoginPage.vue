<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function onSubmit() {
  console.log('user logged in')
  router.push({ name: 'introduction' })
}
</script>

<template>
  <div class="flex h-[100svh] flex-col justify-end gap-2 bg-gradient-to-b from-blue-300 to-blue-400">
    <h1 class="px-4">Login Page</h1>

    <!-- login form -->
    <form @submit.prevent="onSubmit()" class="flex w-screen flex-col gap-2 rounded-t-2xl bg-blue-50 px-4 py-4">
      <VFormTextbox label="Email" type="email" />
      <VFormTextbox label="Password" type="password" />

      <VButton class="justify-center"> Login </VButton>
      <div class="text-right text-sm">
        Don't have an account?
        <VLinkButton :to="{ name: 'signup' }"> Create one </VLinkButton>
      </div>
    </form>
  </div>
</template>

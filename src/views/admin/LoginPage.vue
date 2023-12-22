<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

function onSubmit() {
  router.push({ name: 'admin dashboard' })
}
</script>

<template>
  <div class="flex h-[100svh] w-screen flex-col items-center justify-center bg-gradient-to-b from-blue-300 to-blue-400">
    <div class="flex w-full max-w-[600px] flex-col gap-2">
      <h1 class="px-4">Login Page</h1>

      <!-- login form -->
      <form @submit.prevent="onSubmit()" class="flex w-full flex-col gap-2 rounded-2xl bg-blue-50 px-4 py-4 shadow-lg">
        <VFormTextbox label="Email" type="email" />
        <VFormTextbox label="Password" type="password" />

        <VButton class="justify-center"> Login </VButton>
      </form>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref } from 'vue'
import { pageStore } from '@/store'

const progress = ref(0)
</script>

<template>
  <div class="grow overflow-y-auto pb-4">
    <div class="sticky top-0 z-10 bg-blue-50 px-4 pb-4 pt-6">
      <h1>Dashboard</h1>
    </div>

    <div class="flex flex-col gap-1 px-4">
      <div
        class="relative h-32 overflow-hidden rounded-2xl bg-[url('https://marketplace.canva.com/EAFOtK0VoYQ/1/0/1600w/canva-brown-simple-aesthetic-desktop-wallpaper-kf83cZpRSuM.jpg')] shadow-lg"
      >
        <div class="h-full w-full bg-gradient-to-t from-gray-950/50 to-transparent"></div>
        <div class="absolute bottom-4 left-4">
          <h2 class="font-medium leading-none text-blue-50 drop-shadow-md">Hello, Firstname</h2>
          <span class="leading-none text-blue-50 drop-shadow-md">Welcome to app-name</span>
        </div>
      </div>

      <span class="pl-2 text-neutral-600">Pre-test</span>

      <div class="grid grid-cols-2 gap-2">
        <div class="relative flex h-32 flex-col items-center justify-center rounded-2xl border border-neutral-200 text-center shadow-lg">
          <VRadialProgress size="80px" color="error" thickness="8px" :progress="progress" class="text-lg font-bold" />
          <span class="font-medium">Evaluation</span>
        </div>

        <div class="relative flex h-32 flex-col items-center justify-between rounded-2xl border border-neutral-200 p-4 text-center shadow-lg">
          <span class="flex h-full flex-col justify-center font-medium">You didn't do well on this test...</span>
          <VButton @click="$router.push({ name: 'evaluation', params: { id: '1' } })" size="sm" class="w-full justify-center">
            View Evaluation
          </VButton>
        </div>
      </div>

      <span class="pl-2 text-neutral-600">Post-test</span>

      <router-link
        :to="{ name: 'categories' }"
        class="relative col-span-8 h-32 overflow-hidden rounded-2xl bg-[url('https://marketplace.canva.com/EAFOtK0VoYQ/1/0/1600w/canva-brown-simple-aesthetic-desktop-wallpaper-kf83cZpRSuM.jpg')] shadow-lg"
      >
        <div class="h-full w-full bg-gradient-to-t from-gray-950/50 to-transparent"></div>
        <h2 class="absolute bottom-4 left-4 font-medium text-blue-50 drop-shadow-md">Take the Post-test</h2>
      </router-link>

      <div class="grid grid-cols-2 gap-2">
        <div class="relative flex flex-col items-center justify-center rounded-2xl border border-neutral-200 p-4 text-center shadow-lg">
          <VRadialProgress size="80px" color="success" thickness="8px" :progress="progress" class="text-lg font-bold" />
          <span class="font-medium">On Last Evaluation</span>
        </div>

        <div class="relative flex flex-col items-center justify-between rounded-2xl border border-neutral-200 p-4 text-center shadow-lg">
          <span class="flex h-full flex-col justify-center font-medium">Your Latest NCP</span>

          <div class="flex w-full flex-col gap-1">
            <VButton @click="progress += 0.5" size="sm" class="w-full justify-center"> View </VButton>
            <VButton @click="pageStore.index = 1" size="sm" class="w-full justify-center"> View Test History </VButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

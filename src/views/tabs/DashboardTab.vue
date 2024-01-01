<script setup>
import { ref } from 'vue'
import { studentTabStore } from '@/store'

const progress = ref(0)
</script>

<template>
  <div class="grow overflow-y-auto pb-4">
    <div class="sticky top-0 z-10 bg-blue-50 px-4 pb-4 pt-6">
      <h1>Dashboard</h1>
      <span>Welcome First_name Last_name</span>
    </div>

    <div class="flex flex-col gap-1 px-4">
      <router-link
        :to="{ name: 'categories' }"
        class="relative col-span-8 h-32 overflow-hidden rounded-2xl bg-[url('https://marketplace.canva.com/EAFOtK0VoYQ/1/0/1600w/canva-brown-simple-aesthetic-desktop-wallpaper-kf83cZpRSuM.jpg')] shadow-lg"
      >
        <div class="h-full w-full bg-gradient-to-t from-gray-950/50 to-transparent"></div>
        <h2 class="absolute bottom-4 left-4 font-medium text-blue-50 drop-shadow-md">Take the Post-test</h2>
      </router-link>

      <hr class="m-2 border-neutral-300" />
      <span class="pl-2 text-neutral-600">Pre-test Evaluation</span>

      <div class="relative grid h-32 grid-cols-2 rounded-2xl border border-neutral-200 shadow-lg">
        <div class="flex flex-col items-center justify-center text-center">
          <VRadialProgress size="80px" color="error" thickness="8px" :progress="progress" :max-value="100" class="text-lg font-bold" />
        </div>

        <div class="flex flex-col items-center justify-between p-4 text-center">
          <span class="flex h-full flex-col justify-center font-medium">MM/DD/YYYY</span>
          <VButton @click="$router.push({ name: 'evaluation', params: { id: '1' } })" size="sm" start-icon="print" class="w-full justify-center">
            NCP
          </VButton>
        </div>
      </div>

      <hr class="m-2 border-neutral-300" />
      <span class="pl-2 text-neutral-600">Post-test Evaluation</span>

      <div class="relative grid grid-cols-2 rounded-2xl border border-neutral-200 shadow-lg">
        <div class="flex flex-col items-center justify-center p-4 text-center">
          <VRadialProgress size="80px" color="success" thickness="8px" :progress="progress" :max-value="100" class="text-lg font-bold" />
        </div>

        <div class="flex flex-col items-center justify-between p-4 text-center">
          <span class="flex h-full flex-col justify-center font-medium">MM/DD/YYYY</span>

          <div class="flex w-full flex-col gap-1">
            <VButton @click="studentTabStore.index = 1" size="sm" start-icon="print" class="w-full justify-center"> NCP </VButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

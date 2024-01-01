<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const histories = ref(null)

onMounted(() => {
  axios.get(`http://localhost:3000/test-history/${localStorage.getItem('ncp_user_id')}/get-all`).then((res) => {
    histories.value = res.data
  })
})
</script>

<template>
  <div class="grow overflow-y-auto px-4 pb-4">
    <div class="sticky top-0 z-10 border-b border-b-neutral-200 bg-blue-50 pb-4 pt-6">
      <h1>Test History</h1>
    </div>

    <div class="flex flex-col">
      <router-link
        v-for="(history, index) in histories"
        :key="index"
        :to="{ name: 'evaluation', params: { id: history.id } }"
        class="inline-grid select-none auto-cols-[max-content_auto_max-content] grid-flow-col items-center border-b border-b-neutral-200 py-4 transition-colors hover:bg-neutral-400/10"
      >
        <div class="flex h-10 w-10 items-center justify-center">
          <span class="text-xl font-bold">{{ index + 1 }}</span>
        </div>
        <div class="flex flex-col pl-2">
          <span class="text-lg font-medium leading-none">
            {{ new Date(history.dateTaken).toLocaleString() }}
          </span>
          <span class="leading-none"> Category: {{ history.category }} </span>
        </div>
        <div class="flex flex-row items-center gap-1 pr-2">
          <span class="material-icons"> chevron_right </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>

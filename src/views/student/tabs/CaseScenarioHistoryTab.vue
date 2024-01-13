<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'

const histories = ref([])
const isLoading = ref(true)
onMounted(() => {
  axios.get(`${import.meta.env.VITE_API_DOMAIN}/case-scenario-history/${localStorage.getItem('ncp_user_id')}/get-all`).then((res) => {
    histories.value = res.data
    isLoading.value = false
  })
})
</script>

<template>
  <div class="overflow-y-auto">
    <template v-if="isLoading">
      <div class="flex h-[calc(100svh-137px)] flex-col items-center justify-center">
        <VLoader size="48px" thickness="2px" />
      </div>
    </template>

    <template v-else>
      <div v-if="histories.length !== 0" class="flex flex-col px-4 pb-[69px] xl:px-24">
        <template v-for="(history, index) in histories" :key="index">
          <router-link
            :to="{ name: 'evaluation', params: { id: history.id } }"
            class="inline-grid select-none auto-cols-[max-content_auto_max-content] grid-flow-col items-center rounded-lg border-b-neutral-200 py-4 transition-colors hover:bg-neutral-400/10"
          >
            <div class="flex h-10 w-10 items-center justify-center">
              <span class="text-xl font-bold md:text-2xl">{{ index + 1 }}</span>
            </div>
            <div class="flex flex-col pl-2">
              <span class="text-lg font-medium leading-none md:text-[20px]">
                {{ new Date(history.dateTaken).toLocaleString() }}
              </span>
              <span class="leading-none md:text-[18px]"> Category: {{ history.category }} </span>
            </div>
            <div class="flex flex-row items-center gap-1 pr-2">
              <span class="material-icons"> chevron_right </span>
            </div>
          </router-link>

          <hr class="mx-2" />
        </template>
      </div>

      <div v-else class="flex h-[calc(100svh-137px)] flex-col items-center justify-center">
        <div class="flex flex-col items-center text-neutral-400/50">
          <span class="material-icons pr-2 text-[125px] text-neutral-400/50"> history </span>
          <h2 class="font-medium">No case history found</h2>
          <p>Your case scenario records will display here</p>
        </div>
      </div>
    </template>
  </div>
</template>

<style scoped></style>

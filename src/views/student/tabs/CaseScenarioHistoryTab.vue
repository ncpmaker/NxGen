<script setup>
import axios from 'axios'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { toastStore } from '@/store'

const router = useRouter()
const histories = ref([])
const isLoading = ref(true)
onMounted(async () => {
  await axios({
    method: 'get',
    url: `${import.meta.env.VITE_API_DOMAIN}/history/case-scenario/student/${localStorage.getItem('ncp_user_id')}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('ncp_token')}`,
      Role: 'student'
    }
  })
    .then((res) => {
      histories.value = res.data
    })
    .catch((err) => {
      if (err.response.status == 401) {
        router.push({ name: 'login' })
      } else {
        toastStore.add({
          msg: err.response.data,
          duration: 4000
        })
      }
    })
    .finally(() => (isLoading.value = false))
})
</script>

<template>
  <div>
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

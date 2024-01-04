<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { toastStore } from '@/store'
import axios from 'axios'

const route = useRoute()
const cases = ref(null)

onMounted(() => {
  axios.get(`${import.meta.env.VITE_API_DOMAIN}/case-scenarios/get-all/${route.params.category}`).then((res) => {
    cases.value = res.data
  })
})

function onDelete(id, index) {
  axios.delete(`${import.meta.env.VITE_API_DOMAIN}/case-scenarios/delete/${route.params.category}/${id}`).then(() => {
    cases.value.splice(index, 1)
    toastStore.add({
      msg: 'Case deleted.',
      duration: 4000
    })
  })
}
</script>

<template>
  <VIconButton @click="$router.go(-1)" icon="arrow_back" variant="ghost" size="lg" class="!absolute left-52 top-[27px]" />
  <div class="flex w-full flex-col gap-2 px-64">
    <div class="my-4 flex h-96 flex-row items-end justify-between rounded-2xl bg-gradient-to-b from-blue-300 to-blue-400 p-8 shadow-xl">
      <div class="flex flex-col">
        <span class="text-4xl font-semibold leading-none">Neuro</span>
        <span class="text-xl font-medium leading-none">Description here</span>
      </div>

      <button
        @click="$router.push({ name: 'admin create case', params: { category: 'neuro' } })"
        class="rounded-full px-4 py-2 text-2xl font-medium transition-colors hover:bg-blue-950/10"
      >
        + New Case
      </button>
    </div>

    <div
      v-for="(item, index) in cases"
      :key="item.id"
      class="flex flex-row items-center rounded-2xl border border-neutral-400 pr-5 transition-colors hover:bg-neutral-400/20"
    >
      <router-link
        :to="{ name: 'admin edit case', params: { number: index + 1, id: item.id, category: 'neuro' } }"
        class="grow py-4 pl-10 text-xl font-medium"
        >Case Scenario {{ index + 1 }}</router-link
      >
      <VIconButton @click="onDelete(item.id, index)" variant="ghost" color="error" size="lg" icon="delete" class="shrink-0" />
    </div>
  </div>
</template>

<style scoped></style>

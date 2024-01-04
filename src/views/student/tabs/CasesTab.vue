<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const router = useRouter()

const cases = ref(null)
const modals = reactive({
  categoryModal: false,
  category: '',
  categoryToggle(category) {
    this.categoryModal = !this.categoryModal
    this.category = category

    axios.get(`${import.meta.env.VITE_API_DOMAIN}/case-scenarios/get-all/${category}`).then((res) => {
      cases.value = res.data
    })
  }
})

function takeCase(number, id, category) {
  localStorage.setItem('ncp_case_scenario_category', category)
  localStorage.setItem('ncp_case_scenario_number', number)
  localStorage.setItem('ncp_case_scenario_id', id)

  router.push({ name: 'case scenario', params: { number: number, id: id, category: category } })
}
</script>

<template>
  <div class="h-[100svh] w-screen overflow-y-auto">
    <div class="sticky top-0 flex w-full flex-row items-center gap-2 bg-blue-50 px-4 pb-4 pt-6 text-center">
      <h1>Cases</h1>
    </div>

    <div class="flex flex-col gap-2 px-2 pb-2">
      <button
        v-for="x in 1"
        :key="x"
        @click="modals.categoryToggle('neuro')"
        class="flex h-64 flex-col rounded-2xl border bg-blue-50 text-start shadow-lg transition-colors hover:border-blue-400 hover:bg-blue-200"
      >
        <div
          class="h-40 w-full shrink-0 rounded-2xl bg-[url('https://marketplace.canva.com/EAFOtK0VoYQ/1/0/1600w/canva-brown-simple-aesthetic-desktop-wallpaper-kf83cZpRSuM.jpg')]"
        ></div>
        <div class="flex w-full grow flex-col p-4">
          <h2>Neuro</h2>
          <span>Small description here</span>
        </div>
      </button>
    </div>

    <VBottomSheet v-model:go-up="modals.categoryModal">
      <div class="w-full bg-blue-50 p-4 text-center">
        <h2>{{ modals.category.charAt(0).toUpperCase() + modals.category.slice(1) }}</h2>
      </div>

      <div class="flex grow flex-col gap-2 px-2 pb-2">
        <VButton v-for="(item, index) in cases" :key="item" @click="takeCase(index + 1, item.id, 'neuro')" class="justify-center">
          Case Scenario {{ index + 1 }}
        </VButton>
      </div>
    </VBottomSheet>
  </div>
</template>

<style scoped></style>

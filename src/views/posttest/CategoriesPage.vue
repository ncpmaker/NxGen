<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'

const isStarting = ref(false)
const cases = ref(null)

const modals = reactive({
  categoryModal: false,
  category: '',
  categoryToggle(category) {
    this.categoryModal = !this.categoryModal
    this.category = category

    axios.get(`http://localhost:3000/case-scenarios/get-all/${category}`).then((res) => {
      cases.value = res.data
    })
  }
})
</script>

<template>
  <div v-if="!isStarting" class="flex h-[100svh] w-screen flex-col items-center justify-center bg-blue-50">
    <div class="text-center">
      <h1>Important note</h1>
      <p>Please watch this video first before proceeding</p>
      <div class="h-20 w-full bg-blue-200"></div>
    </div>

    <VButton @click="isStarting = !isStarting" class="absolute bottom-4 w-[calc(100%-32px)] justify-center"> Start </VButton>
  </div>
  <div v-else class="h-[100svh] w-screen overflow-y-auto">
    <div class="sticky top-0 flex w-full flex-row items-center gap-2 bg-blue-50 pb-4 pl-3 pr-2 pt-6 text-center">
      <VIconButton icon="close" variant="ghost" size="lg" @click="$router.go(-1)" />
      <h1>Select a Category</h1>
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
  </div>

  <VBottomSheet v-model:go-up="modals.categoryModal">
    <div class="w-full bg-blue-50 p-4 text-center">
      <h2>{{ modals.category.charAt(0).toUpperCase() + modals.category.slice(1) }}</h2>
    </div>

    <div class="flex grow flex-col gap-2 px-2 pb-2">
      <VButton
        v-for="(item, index) in cases"
        :key="item"
        @click="$router.push({ name: 'case scenario', params: { number: index + 1, id: item.id, category: 'neuro' } })"
        class="justify-center"
      >
        Case {{ index + 1 }}
      </VButton>
    </div>
  </VBottomSheet>
</template>

<style scoped></style>

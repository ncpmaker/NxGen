<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { toastStore } from '@/store'
import axios from 'axios'

const route = useRoute()
const cases = ref(null)
const isLoading = ref(true)
onMounted(() => {
  axios.get(`${import.meta.env.VITE_API_DOMAIN}/case-scenarios/get-all/${route.params.category}`).then((res) => {
    cases.value = res.data
    isLoading.value = false
  })
})

const isDeleting = ref(false)
const deleteDialog = ref({
  state: false,
  id: null,
  index: null,
  toggle(id, index) {
    this.state = !this.state
    this.id = id
    this.index = index
  },
  confirm() {
    this.state = !this.state

    toastStore.add({
      msg: 'Deleting Case',
      duration: 1000
    })

    isDeleting.value = true

    axios.delete(`${import.meta.env.VITE_API_DOMAIN}/case-scenarios/delete/${route.params.category}/${this.id}`).then(() => {
      cases.value.splice(this.index, 1)
      isDeleting.value = false
      toastStore.add({
        msg: 'Case deleted',
        duration: 4000
      })
    })
  }
})
</script>

<template>
  <VIconButton @click="$router.go(-1)" icon="arrow_back" variant="ghost" size="lg" class="!sticky left-52 top-[100px] !w-fit" />
  <div class="flex w-full flex-col gap-2 px-64 pb-4">
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

    <div v-if="isLoading" class="flex items-center justify-center py-4">
      <VLoader size="32px" thickness="2px" />
    </div>

    <div
      v-else
      v-for="(item, index) in cases"
      :key="item.id"
      class="flex flex-row items-center rounded-2xl border border-neutral-400 pr-10 transition-colors hover:bg-neutral-400/20"
    >
      <router-link
        :to="{ name: 'admin edit case', params: { number: index + 1, id: item.id, category: 'neuro' } }"
        class="grow py-4 pl-10 text-xl font-medium"
        >Case Scenario {{ index + 1 }}</router-link
      >

      <VIconButton
        @click="deleteDialog.toggle(item.id, index)"
        :disabled="isDeleting"
        variant="ghost"
        color="error"
        size="lg"
        icon="delete"
        class="shrink-0"
      />
    </div>
  </div>

  <VDialog
    v-model:go-open="deleteDialog.state"
    header="Account Deletion"
    body="Do you really want to delete your account?"
    cancel-label="No"
    confirm-label="Yes"
    @confirm="deleteDialog.confirm()"
  />
</template>

<style scoped></style>

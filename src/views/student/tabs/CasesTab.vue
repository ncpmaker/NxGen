<script setup>
import { ref, reactive } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { toastStore } from '@/store'

const router = useRouter()

const cases = ref(null)
const isLoading = ref(true)
const modals = reactive({
  categoryModal: false,
  category: '',
  async categoryToggle(category) {
    this.categoryModal = !this.categoryModal
    this.category = category

    await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_DOMAIN}/case-scenarios/${category}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ncp_token')}`,
        Role: 'student'
      }
    })
      .then((res) => {
        cases.value = res.data
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
  }
})

function takeCase(number, id, category) {
  localStorage.setItem('ncp_case_scenario_category', category)
  localStorage.setItem('ncp_case_scenario_number', number)
  localStorage.setItem('ncp_case_scenario_id', id)

  router.push({ name: 'case scenario', params: { number: number, id: id, category: category } })
}

const caseScenarioDialog = ref({
  state: false,
  number: null,
  id: null,
  category: null,
  toggle(number, id, category) {
    this.number = number
    this.id = id
    this.category = category
    this.state = true
  },
  confirm() {
    takeCase(this.number, this.id, this.category)
  }
})
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-1 gap-2 px-2 pb-2 md:grid-cols-2 md:px-12 xl:px-24">
      <button
        v-for="x in 7"
        :key="x"
        @click="modals.categoryToggle('neuro')"
        class="flex flex-col rounded-2xl border bg-blue-50 text-start shadow-lg transition-colors hover:border-blue-400 hover:bg-blue-200"
      >
        <div
          class="h-52 w-full shrink-0 rounded-2xl bg-[url('https://us.123rf.com/450wm/captainvector/captainvector2204/captainvector220403921/185074387-a-brain.jpg?ver=6')] bg-cover bg-center"
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
        <div v-if="isLoading" class="flex items-center justify-center py-[5px]">
          <VLoader size="32px" thickness="2px" />
        </div>

        <VButton
          v-else
          v-for="(item, index) in cases"
          :key="item"
          @click="caseScenarioDialog.toggle(index + 1, item.id, 'neuro')"
          class="justify-center"
        >
          Case Scenario {{ index + 1 }}
        </VButton>
      </div>
    </VBottomSheet>

    <VDialog
      v-model:go-open="caseScenarioDialog.state"
      header="Case Scenario"
      :body="`Ready to take Case Scenario ${caseScenarioDialog.number} of ${caseScenarioDialog.category}?`"
      cancel-label="No"
      confirm-label="Yes"
      @confirm="caseScenarioDialog.confirm()"
    />
  </div>
</template>

<style scoped></style>

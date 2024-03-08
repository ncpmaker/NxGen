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

const categories = [
  {
    text: 'Activity/Rest',
    desc: 'Ability to engage in necessary/desired activities of life (work and leisure) and to obtain adequate sleep/rest',
    img: 'https://www.dropbox.com/scl/fi/73uyaxtayd3m2a1b2msbf/ACTIVITY_REST.webp?rlkey=cfhxsa5bv4vddoab8fekctoa1&raw=1'
  },
  {
    text: 'Elimination',
    desc: 'Ability to excrete waste products',
    img: 'https://www.dropbox.com/scl/fi/l3c8pddt7xgskpcd7zrp3/ELIMINATION-1.webp?rlkey=tur9gasy7iobe1g9bg6c49n16&raw=1'
  },
  {
    text: 'Food/Fluid',
    desc: 'Ability to maintain intake of and utilize nutrients and liquids to meet physiological needs',
    img: 'https://www.dropbox.com/scl/fi/g4ed05l6jflfth88en5jc/FOOD_FLUIDS-1.webp?rlkey=j8955i4moh6gumq22x7rv9s2p&raw=1'
  },
  {
    text: 'Pain/Discomfort',
    desc: 'Ability to control internal/external environment to maintain comfort',
    img: 'https://www.dropbox.com/scl/fi/hu757hh7v7iydgmjacdpb/PAIN_DISCOMFORT-1.webp?rlkey=wy4qiyq9nfsc2ppkhrauvht0j&raw=1'
  },
  {
    text: 'Respiration',
    desc: 'Ability to provide and use oxygen to meet physiological needs',
    img: 'https://www.dropbox.com/scl/fi/puzbpbnukwruwqcmsncwk/RESPIRATORY-1.webp?rlkey=ft8hxt32p4rniis9vw89433xi&raw=1'
  },
  {
    text: 'Safety',
    desc: 'Ability to provide safe, growth-promoting environment',
    img: 'https://www.dropbox.com/scl/fi/x8n6569612iehwllfilvs/SAFETY-1-1.webp?rlkey=miefmdzszulaq9q9m903fni51&raw=1'
  },
  {
    text: 'Teaching/Learning',
    desc: 'Ability to incorporate and use information to achieve healthy lifestyle/optimal wellness',
    img: 'https://www.dropbox.com/scl/fi/0e2i6v72ldzyz5rxirvgy/TEACHING_LEARNING-1.webp?rlkey=g3daqvrqyqu3gickerss5yw0h&raw=1'
  }
]
</script>

<template>
  <div class="w-full">
    <div class="grid grid-cols-1 gap-2 px-2 pb-2 md:grid-cols-2 md:px-12 xl:px-24">
      <button
        v-for="(category, index) in categories"
        :key="category.text"
        @click="modals.categoryToggle(category.text)"
        class="flex flex-col rounded-2xl border bg-blue-50 text-start shadow-lg transition-colors hover:border-blue-400 hover:bg-blue-200"
      >
        <img
          :src="category.img"
          :alt="category.text"
          class="shirnk-0 h-64 w-full rounded-2xl object-cover lg:h-80"
          :class="[index === 3 ? 'object-bottom' : 'object-center', index === 5 ? 'object-bottom' : 'object-center']"
        />
        <!--         <div :class="`h-52 w-full shrink-0 rounded-2xl bg-[url('${category.img}')] bg-cover bg-center`"></div> -->
        <div class="flex w-full grow flex-col p-4">
          <h2>{{ category.text }}</h2>
          <span>{{ category.desc }}</span>
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

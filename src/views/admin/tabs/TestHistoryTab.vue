<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import { scrollStore, toastStore } from '@/store'
import { useRouter } from 'vue-router'
import debounce from '@/assets/scripts/debounce'
import axios from 'axios'

const router = useRouter()

const history = ref([])
const lastFetch = ref([])
const isLoading = ref(true)
const moreLoading = ref(true)
const moreLoadingRef = ref(null)
const lastID = ref(null)
const search = ref({
  text: '',
  section: 'All',
  type: 'All'
})

const getHistory = debounce(async (text, section, type) => {
  if (lastFetch.value.length === 50 || lastFetch.value.length === 0) {
    await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_DOMAIN}/history/test/search`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ncpadmin_token')}`,
        Role: 'admin'
      },
      params: {
        search: text,
        section: section,
        testType: type === 'Pre test' ? 'PRETEST' : type === 'Post test' ? 'POSTTEST' : 'All',
        cursor: lastID.value
      }
    })
      .then((res) => {
        lastFetch.value = res.data
        history.value.push(...lastFetch.value)
        isLoading.value = false

        if (res.data.length > 0) {
          lastID.value = res.data[res.data.length - 1].id
        }

        if (res.data.length < 50) {
          moreLoading.value = false
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          router.push({ name: 'admin login' })
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

onMounted(() => {
  watchEffect(() => {
    lastFetch.value = []
    history.value = []
    isLoading.value = true
    lastID.value = null
    getHistory(search.value.text, search.value.section, search.value.type)
  })

  //scroll checking
  let ticking = false
  scrollStore.value.addEventListener('scroll', () => {
    let vpHeight = window.innerHeight
    let moreLoadingRectY = moreLoadingRef.value.getBoundingClientRect().top + moreLoadingRef.value.offsetHeight / 2
    let isVisible = moreLoadingRectY < vpHeight
    if (isVisible && !ticking) {
      window.requestAnimationFrame(async () => {
        getHistory()
        ticking = false
      })
      ticking = true
    }
  })
})

//show entry test answers
const answersData = ref({
  answers: null,
  name: '',
  testType: ''
})
const modals = ref({
  showAnswersModal: false,
  showAnswersOpen(entryAnswers, name, testType) {
    answersData.value = {
      answers: entryAnswers,
      name: name,
      testType: testType
    }
    this.showAnswersModal = true
  },
  showAnswersClose() {
    this.showAnswersModal = false
  }
})
</script>

<template>
  <div class="w-full">
    <div class="sticky top-[61px] flex w-full flex-row items-center gap-6 bg-blue-50 px-4 py-2">
      <h3>Test History</h3>
      <VFormTextbox v-model="search.text" placeholder="Search for Name" class="w-72" />
      <div class="flex flex-row items-center gap-2">
        <span class="text-sm text-neutral-600 lg:text-base">Section</span>
        <VSelect v-model="search.section" :options="['All', '1A', '1B', '1C', '1D']" class="w-20" />
      </div>

      <div class="flex flex-row items-center gap-2">
        <span class="text-sm text-neutral-600 lg:text-base">Type</span>
        <VSelect v-model="search.type" :options="['All', 'Pre test', 'Post test']" class="w-32" />
      </div>
    </div>

    <table class="w-full table-fixed">
      <tr class="sticky top-[119px] bg-blue-200">
        <th class="w-16">#</th>
        <th class="px-6 py-4 text-start">Name</th>
        <th class="px-6 py-4 text-start">Section</th>
        <th class="px-6 py-4 text-start">Type</th>
        <th class="px-6 py-4 text-start">Score</th>
        <th class="px-6 py-4 text-start">Date Taken</th>
        <th class="px-6 py-4">Answers</th>
      </tr>

      <tr v-if="isLoading">
        <td colspan="7">
          <div class="flex w-full items-center justify-center py-6">
            <VLoader size="40px" thickness="2px" />
          </div>
        </td>
      </tr>

      <tr v-else-if="history.length > 0" v-for="(entry, index) in history" :key="index" class="text-center odd:bg-blue-100">
        <td class="w-16 text-center">{{ index + 1 }}</td>
        <td class="max-w-[200px] truncate px-6 py-1 text-start">{{ entry.name }}</td>
        <td class="px-6 py-1 text-start">{{ entry.section }}</td>
        <td class="px-6 py-1 text-start">{{ entry.testType }}</td>
        <td class="px-6 py-1 text-start">{{ entry.score }}</td>
        <td class="px-6 py-1 text-start">{{ new Date(entry.dateTaken).toLocaleString().replace(',', ' -') }}</td>
        <td class="px-6 py-1">
          <div class="flex h-full w-full flex-row items-center justify-center">
            <VButton
              @click="modals.showAnswersOpen(entry.answers, entry.name, entry.testType)"
              variant="filled"
              start-icon="visibility"
              color="success"
            >
              Show
            </VButton>
          </div>
        </td>
      </tr>

      <tr v-else>
        <td colspan="7">
          <div class="flex w-full items-center justify-center py-6">No entries found</div>
        </td>
      </tr>

      <tr v-show="moreLoading && !isLoading" ref="moreLoadingRef">
        <td colspan="7">
          <div class="flex w-full items-center justify-center py-6">
            <VLoader size="40px" thickness="2px" />
          </div>
        </td>
      </tr>
    </table>

    <VModal v-model:go-open="modals.showAnswersModal" :click-outside="false">
      <div class="flex max-h-[calc(100svh-32px)] flex-col overflow-y-auto overflow-x-hidden px-4 pb-4">
        <div class="sticky top-0 flex flex-row items-center justify-between bg-blue-50 py-4">
          <div>
            <h2 class="leading-none">Answers</h2>
            <span>{{ answersData.testType + ' - ' + answersData.name }}</span>
          </div>

          <VIconButton @click="modals.showAnswersClose()" variant="ghost" size="lg" icon="close" />
        </div>

        <div v-for="(item, index) in answersData.answers" :key="index" class="flex flex-col">
          <span class="max-w-[560px]">{{ `${index + 1}. ${item.question}` }}</span>
          <div clas="flex flex-col gap-1">
            <b v-if="Array.isArray(item.answer)">
              Answer/s:
              <span v-for="(answer, index) in item.answer" :key="index">
                {{ answer + `${index + 1 !== item.answer.length ? ', ' : '.'}` }}
              </span>
            </b>
            <b v-else>
              Answer: <span>{{ item.answer }}.</span>
            </b>
          </div>
          <hr class="mx-2 my-4 border-neutral-300" />
        </div>
      </div>
    </VModal>
  </div>
</template>

<style scoped></style>

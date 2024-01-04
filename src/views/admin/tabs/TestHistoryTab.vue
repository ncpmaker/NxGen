<script setup>
import { onMounted, ref, reactive, watchEffect } from 'vue'
import debounce from '@/assets/scripts/debounce'
import axios from 'axios'

const histories = ref(null)
const search = reactive({
  value: '',
  section: 'All',
  type: 'All'
})

const getHistory = debounce((value, section, type) => {
  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/test-history/search`, {
      search: value,
      section: section,
      testType: type === 'Pre test' ? 'PRETEST' : type === 'Post test' ? 'POSTTEST' : 'All'
    })
    .then((res) => {
      histories.value = res.data
    })
})

onMounted(() => {
  watchEffect(() => {
    getHistory(search.value, search.section, search.type)
  })
})

const answersData = ref({
  answers: null,
  name: '',
  testType: ''
})
const modals = reactive({
  showAnswersModal: false,
  showAnswersOpen(studentAnswers, name, testType) {
    answersData.value = {
      answers: studentAnswers,
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
      <VFormTextbox v-model="search.value" placeholder="Search for Name or Test ID" class="w-72" />
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
        <th class="px-6 py-4 text-start">Test Type</th>
        <th class="px-6 py-4 text-start">Score</th>
        <th class="px-6 py-4 text-start">Date Taken</th>
        <th class="px-6 py-4">Answers</th>
      </tr>
      <tr v-for="(student, index) in histories" :key="index" class="text-center odd:bg-blue-100">
        <td class="w-16 text-center">{{ index + 1 }}</td>
        <td class="max-w-[200px] truncate px-6 py-1 text-start">{{ student.name }}</td>
        <td class="px-6 py-1 text-start">{{ student.section }}</td>
        <td class="px-6 py-1 text-start">{{ student.testType }}</td>
        <td class="px-6 py-1 text-start">{{ student.score }}</td>
        <td class="px-6 py-1 text-start">{{ new Date(student.dateTaken).toLocaleString() }}</td>
        <td class="px-6 py-1">
          <div class="flex h-full w-full flex-row items-center justify-center">
            <VButton
              @click="modals.showAnswersOpen(student.answers, student.name, student.testType)"
              variant="filled"
              start-icon="visibility"
              color="success"
            >
              Show
            </VButton>
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

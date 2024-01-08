<script setup>
import { onMounted, ref, reactive, watchEffect } from 'vue'
import generatePDF from '@/assets/scripts/pdf'
import debounce from '@/assets/scripts/debounce'
import axios from 'axios'

const histories = ref(null)
const data = ref(null)
const search = reactive({
  value: '',
  section: 'All',
  category: 'All'
})
const isLoading = ref(true)
const getHistory = debounce((value, section, category) => {
  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/case-scenario-history/search`, {
      search: value,
      section: section,
      category: category
    })
    .then((res) => {
      histories.value = res.data
      isLoading.value = false
    })
})

onMounted(() => {
  watchEffect(() => {
    isLoading.value = true
    getHistory(search.value, search.section, search.category)
  })
})

function beforeGeneratePDF(id, name, category, caseId, timesTaken, dateTaken) {
  axios
    .get(`${import.meta.env.VITE_API_DOMAIN}/case-scenario-history/${id}/get/`)
    .then((res) => {
      data.value = res.data
    })
    .then(() => {
      generatePDF(name, category, caseId, timesTaken, new Date(dateTaken).toLocaleString())
    })
}
</script>

<template>
  <div class="w-full">
    <div class="sticky top-[61px] flex w-full flex-row items-center gap-6 bg-blue-50 px-4 py-2">
      <h3>Case Scenario History</h3>
      <VFormTextbox v-model="search.value" placeholder="Search for Name or Case ID" class="w-72" />
      <div class="flex flex-row items-center gap-2">
        <span class="text-sm text-neutral-600 lg:text-base">Section</span>
        <VSelect v-model="search.section" :options="['All', '1A', '1B', '1C', '1D']" class="w-20" />
      </div>

      <div class="flex flex-row items-center gap-2">
        <span class="text-sm text-neutral-600 lg:text-base">Category</span>
        <VSelect v-model="search.category" :options="['All', 'Neuro', 'Etc.']" class="w-40" />
      </div>
    </div>
    <table class="w-full table-fixed">
      <tr class="sticky top-[119px] bg-blue-200">
        <th class="w-16">#</th>
        <th class="px-6 py-4 text-start">Name</th>
        <th class="px-6 py-4 text-start">Section</th>
        <th class="px-6 py-4 text-start">Category</th>
        <th class="px-6 py-4 text-start">Case ID</th>
        <th class="px-6 py-4 text-start">Times Taken</th>
        <th class="px-6 py-4 text-start">Date Taken</th>
        <th class="px-6 py-4">Nursing Care Plan</th>
      </tr>

      <tr v-if="isLoading">
        <td colspan="8">
          <div class="flex w-full items-center justify-center py-6">
            <VLoader size="40px" thickness="2px" />
          </div>
        </td>
      </tr>

      <tr v-else-if="histories.length > 0" v-for="(student, index) in histories" :key="index" class="text-center odd:bg-blue-100">
        <td class="w-16 text-center">{{ index + 1 }}</td>
        <td class="max-w-[200px] truncate px-6 py-1 text-start">{{ student.name }}</td>
        <td class="px-6 py-1 text-start">{{ student.section }}</td>
        <td class="px-6 py-1 text-start">{{ student.category }}</td>
        <td class="px-6 py-1 text-start">{{ student.caseId }}</td>
        <td class="px-6 py-1 text-start">{{ student.timesTaken }}</td>
        <td class="px-6 py-1 text-start">{{ new Date(student.dateTaken).toLocaleString() }}</td>
        <td class="px-6 py-1">
          <div class="flex h-full w-full flex-row items-center justify-center">
            <VButton
              @click="beforeGeneratePDF(student.id, student.fullName, student.category, student.caseId, student.timesTaken, student.dateTaken)"
              variant="filled"
              start-icon="print"
              color="success"
            >
              Print
            </VButton>
          </div>
        </td>
      </tr>

      <tr v-else>
        <td colspan="8">
          <div class="flex w-full items-center justify-center py-6">No entries found</div>
        </td>
      </tr>
    </table>

    <!-- for pdf generation -->
    <table v-if="data" class="hidden w-full table-fixed border-collapse border border-black bg-white font-['Times'] text-[15px] text-black" id="table">
      <tr>
        <th class="border border-black px-2 pb-6 pt-2 text-center">Assessment</th>
        <th class="border border-black px-2 pb-6 pt-2 text-center">Nursing Diagnosis</th>
        <th class="border border-black px-2 pb-6 pt-2 text-center">Planning</th>
        <th class="border border-black px-2 pb-6 pt-2 text-center">Intervention</th>
        <th class="border border-black px-2 pb-6 pt-2 text-center">Rationale</th>
        <th class="border border-black px-2 pb-6 pt-2 text-center">Evaluation</th>
      </tr>
      <tr>
        <td class="border border-black px-4 py-2 text-start align-top">
          Subjective:<br />
          - {{ data.answers.subjective }} <br /><br />
          Objective:<br />
          <template v-for="(objective, index) in data.answers.objective" :key="index">
            <template v-if="index + 1 !== data.answers.objective.length"> • {{ objective }} <br /><br /> </template>
            <template v-else> • {{ objective }} <br /> </template>
          </template>
        </td>
        <td class="border border-black px-4 py-2 text-start align-top">
          {{ data.answers.nursingDiagnosis }}
        </td>
        <td class="border border-black px-4 py-2 text-start align-top">
          Short Term Goal:<br />
          - {{ data.answers.shortTermGoalsDesc }}<br /><br />
          <template v-for="(shortTermGoal, index) in data.answers.shortTermGoal" :key="index">
            <template v-if="index + 1 !== data.answers.shortTermGoal.length"> • {{ shortTermGoal }} <br /><br /> </template>
            <template v-else> • {{ shortTermGoal }} <br /> </template>
          </template>

          <br />Long Term Goal:<br />
          - {{ data.answers.longTermGoalsDesc }}<br /><br />
          <template v-for="(longTermGoal, index) in data.answers.longTermGoal" :key="index">
            <template v-if="index + 1 !== data.answers.longTermGoal.length"> • {{ longTermGoal }} <br /><br /> </template>
            <template v-else> • {{ longTermGoal }} <br /> </template>
          </template>
        </td>
        <td class="border border-black px-4 py-2 text-start align-top">
          Independent:<br />
          <template v-for="(independent, index) in data.answers.independent" :key="index">
            <template v-if="index + 1 !== data.answers.independent.length"> • {{ independent.split('::')[0] }} <br /><br /> </template>
            <template v-else> • {{ independent.split('::')[0] }} <br /> </template>
          </template>

          <br />Dependent:<br />
          <template v-for="(dependent, index) in data.answers.dependent" :key="index">
            <template v-if="index + 1 !== data.answers.dependent.length"> • {{ dependent.split('::')[0] }} <br /><br /> </template>
            <template v-else> • {{ dependent.split('::')[0] }} <br /> </template>
          </template>
        </td>
        <td class="border border-black px-4 py-2 text-start align-top">
          <template v-for="(independent, index) in data.answers.independent" :key="index">
            <template v-if="index + 1 !== data.answers.independent.length"> • {{ independent.split('::')[1] }} <br /><br /> </template>
            <template v-else> • {{ independent.split('::')[1] }} <br /> </template>
          </template>

          <br />
          <template v-for="(dependent, index) in data.answers.dependent" :key="index">
            <template v-if="index + 1 !== data.answers.dependent.length"> • {{ dependent.split('::')[1] }} <br /><br /> </template>
            <template v-else> • {{ dependent.split('::')[1] }} <br /> </template>
          </template>
        </td>
        <td class="border border-black px-4 py-2 text-start align-top">
          Short Term Goal:<br />
          - {{ data.answers.shortTermGoalsDesc }}:<br /><br />
          <template v-for="(shortTermGoal, index) in data.answers.shortTermGoal" :key="index">
            • {{ shortTermGoal }} <br />
            <template v-if="index + 1 !== data.answers.shortTermGoal.length">
              ___Met <br />
              ___Partially Met <br />
              ___Unmet <br /><br />
            </template>
            <template v-else>
              ___Met <br />
              ___Partially Met <br />
              ___Unmet <br />
            </template>
          </template>

          <br />Long Term Goal:<br />
          - {{ data.answers.longTermGoalsDesc }}:<br /><br />
          <template v-for="(longTermGoal, index) in data.answers.longTermGoal" :key="index">
            • {{ longTermGoal }} <br />
            <template v-if="index + 1 !== data.answers.longTermGoal.length">
              ___Met <br />
              ___Partially Met <br />
              ___Unmet <br /><br />
            </template>
            <template v-else>
              ___Met <br />
              ___Partially Met <br />
              ___Unmet <br />
            </template>
          </template>
        </td>
      </tr>
    </table>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import generatePDF from '@/assets/scripts/pdf'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const stepLabel = ['Assessment', 'Nursing Diagnosis', 'Planning', 'Intervention', 'Evaluation']

function goHome() {
  router.push({
    name: 'home',
    params: {
      userId: localStorage.getItem('ncp_user_id')
    }
  })
}

const scores = ref([])
const data = ref(null)
const isLoading = ref(true)
onMounted(() => {
  axios.get(`${import.meta.env.VITE_API_DOMAIN}/case-scenario-history/${route.params.id}/get`).then((res) => {
    data.value = res.data
    scores.value.push(data.value.score.assessment)
    scores.value.push(data.value.score.nursingDiagnosis)
    scores.value.push(data.value.score.planning)
    scores.value.push(data.value.score.intervention)
    scores.value.push(data.value.score.evaluation)
    scores.value.push(data.value.score.overall)
    isLoading.value = false
  })
})
</script>

<template>
  <div class="flex h-[100svh] flex-col">
    <div class="grow overflow-y-auto px-4 pb-4">
      <div class="sticky top-0 z-10 bg-blue-50 pb-4 pt-6">
        <h1>Evaluation</h1>
      </div>

      <div class="flex flex-col items-center gap-2">
        <h3 class="pb-2 font-medium">Total Score</h3>
        <div class="flex w-full justify-center">
          <VLoader v-if="isLoading" size="100px" thickness="4px" />
          <VRadialProgress v-else size="100px" color="success" thickness="12px" :progress="scores[5]" :max-value="100" class="text-xl font-semibold" />
        </div>
        <VButton
          @click="generatePDF(data.name, data.category, data.caseId, data.timesTaken, new Date(data.dateTaken).toLocaleString())"
          start-icon="print"
          class="w-fit"
        >
          Nursing Care Plan
        </VButton>
      </div>

      <hr class="mx-2 my-2 border-neutral-300" />

      <div class="flex flex-col gap-2 sm:px-24">
        <template v-for="(step, index) in stepLabel" :key="index">
          <div class="flex flex-row items-center gap-2">
            <VLoader v-if="isLoading" size="72px" thickness="4px" />
            <VRadialProgress
              v-else
              size="72px"
              :color="scores[index] <= 7 ? 'error' : scores[index] <= 14 ? 'warning' : 'success'"
              thickness="8px"
              :progress="scores[index]"
              :max-value="20"
              class="text-base font-medium"
            />
            <div class="flex flex-col">
              <span class="font-medium">{{ step }}</span>
              <span v-if="!isLoading" class="text-sm">{{ scores[index] <= 7 ? 'Unmet' : scores[index] <= 14 ? 'Partially Met' : 'Met' }}</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="shrink-0 px-4 py-2">
      <VButton @click="goHome()" class="w-full justify-center"> Back to Home </VButton>
    </div>
  </div>

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
</template>

<style scoped></style>

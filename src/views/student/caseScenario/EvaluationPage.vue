<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import generatePDF from '@/assets/scripts/pdf'
import axios from 'axios'

const route = useRoute()
const router = useRouter()
const scores = ref([])
const userHistory = ref(null)
const stepLabel = ['Assessment', 'Nursing Diagnosis', 'Planning', 'Intervention', 'Evaluation']

function goHome() {
  router.push({
    name: 'home',
    params: {
      userId: localStorage.getItem('ncp_user_id')
    }
  })
}

onMounted(() => {
  axios.get(`${import.meta.env.VITE_API_DOMAIN}/case-scenario-history/${route.params.id}/get`).then((res) => {
    userHistory.value = res.data
    scores.value.push(userHistory.value.score.assessment)
    scores.value.push(userHistory.value.score.nursingDiagnosis)
    scores.value.push(userHistory.value.score.planning)
    scores.value.push(userHistory.value.score.intervention)
    scores.value.push(userHistory.value.score.evaluation)
    scores.value.push(userHistory.value.score.overall)
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
          <VRadialProgress size="100px" color="success" thickness="12px" :progress="scores[5]" :max-value="100" class="text-xl font-semibold" />
        </div>
        <VButton
          @click="
            generatePDF(
              userHistory.fullName,
              userHistory.category,
              userHistory.caseId,
              userHistory.timesTaken,
              new Date(userHistory.dateTaken).toLocaleString()
            )
          "
          start-icon="print"
          class="w-fit"
        >
          Nursing Care Plan
        </VButton>
      </div>

      <hr class="mx-2 my-2 border-neutral-300" />

      <div class="flex flex-col gap-2">
        <template v-for="(step, index) in stepLabel" :key="index">
          <div class="flex flex-row items-center gap-2">
            <VRadialProgress size="72px" color="warning" thickness="8px" :progress="scores[index]" :max-value="20" class="text-base font-medium" />
            <div class="flex flex-col">
              <span class="font-medium">{{ step }}</span>
              <span class="text-sm">Unmet</span>
            </div>
          </div>
        </template>
      </div>
    </div>

    <div class="shrink-0 p-4">
      <VButton @click="goHome()" class="w-full justify-center"> Back to Home </VButton>
    </div>
  </div>

  <!-- for pdf generation -->
  <table
    v-if="userHistory"
    class="hidden w-full table-fixed border-collapse border border-black bg-white font-['Times'] text-[15px] text-black"
    id="table"
  >
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
        - {{ userHistory.answers.subjective }} <br /><br />
        Objective:<br />
        <template v-for="(objective, index) in userHistory.answers.objective" :key="index">
          <template v-if="index + 1 !== userHistory.answers.objective.length"> • {{ objective }} <br /><br /> </template>
          <template v-else> • {{ objective }} <br /> </template>
        </template>
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        {{ userHistory.answers.nursing_diagnosis }}
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        Short Term Goal:<br />
        - {{ userHistory.answers.shortTermGoalsDesc }}:<br /><br />
        <template v-for="(shortTermGoal, index) in userHistory.answers.short_term_goal" :key="index">
          <template v-if="index + 1 !== userHistory.answers.short_term_goal.length"> • {{ shortTermGoal }} <br /><br /> </template>
          <template v-else> • {{ shortTermGoal }} <br /> </template>
        </template>

        <br />Long Term Goal:<br />
        - {{ userHistory.answers.longTermGoalsDesc }}:<br /><br />
        <template v-for="(longTermGoal, index) in userHistory.answers.long_term_goal" :key="index">
          <template v-if="index + 1 !== userHistory.answers.long_term_goal.length"> • {{ longTermGoal }} <br /><br /> </template>
          <template v-else> • {{ longTermGoal }} <br /> </template>
        </template>
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        Independent:<br />
        <template v-for="(independent, index) in userHistory.answers.independent" :key="index">
          <template v-if="index + 1 !== userHistory.answers.independent.length"> • {{ independent.split('::')[0] }} <br /><br /> </template>
          <template v-else> • {{ independent.split('::')[0] }} <br /> </template>
        </template>

        <br />Dependent:<br />
        <template v-for="(dependent, index) in userHistory.answers.dependent" :key="index">
          <template v-if="index + 1 !== userHistory.answers.dependent.length"> • {{ dependent.split('::')[0] }} <br /><br /> </template>
          <template v-else> • {{ dependent.split('::')[0] }} <br /> </template>
        </template>
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        <template v-for="(independent, index) in userHistory.answers.independent" :key="index">
          <template v-if="index + 1 !== userHistory.answers.independent.length"> • {{ independent.split('::')[1] }} <br /><br /> </template>
          <template v-else> • {{ independent.split('::')[0] }} <br /> </template>
        </template>

        <br />
        <template v-for="(dependent, index) in userHistory.answers.dependent" :key="index">
          <template v-if="index + 1 !== userHistory.answers.dependent.length"> • {{ dependent.split('::')[1] }} <br /><br /> </template>
          <template v-else> • {{ dependent.split('::')[0] }} <br /> </template>
        </template>
      </td>
      <td class="border border-black px-4 py-2 text-start align-top">
        Short Term Goal:<br />
        - {{ userHistory.answers.shortTermGoalsDesc }}:<br /><br />
        <template v-for="(shortTermGoal, index) in userHistory.answers.short_term_goal" :key="index">
          • {{ shortTermGoal }} <br />
          <template v-if="index + 1 !== userHistory.answers.short_term_goal.length">
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
        - {{ userHistory.answers.longTermGoalsDesc }}:<br /><br />
        <template v-for="(longTermGoal, index) in userHistory.answers.long_term_goal" :key="index">
          • {{ longTermGoal }} <br />
          <template v-if="index + 1 !== userHistory.answers.long_term_goal.length">
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
../../../public/scripts/pdf

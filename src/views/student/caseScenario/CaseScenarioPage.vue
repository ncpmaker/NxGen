<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const scrollableDiv = ref(null)
const scenarioRef = ref(null)
const formRef = ref(null)

const stepLabel = ['Assessment', 'Nursing Diagnosis', 'Planning', 'Intervention']

const step = reactive({
  count: 1,
  percent: computed(() => {
    return (step.count / 5) * 100 + '%'
  })
})

const caseScenario = reactive({
  introduction: {
    scenario: null,
    imageLink: null,
    audioLink: null
  },
  assessment: {
    subjectives: { texts: null, correctValue: null },
    objectives: null
  },
  nursingDiagnosis: { texts: null, correctValue: null },
  planning: {
    shortTermGoalsDesc: null,
    shortTermGoals: null,
    longTermGoalsDesc: null,
    longTermGoals: null
  },
  intervention: {
    independents: null,
    dependents: null
  }
})

onMounted(() => {
  axios.get(`${import.meta.env.VITE_API_DOMAIN}/case-scenarios/get/${route.params.category}/${route.params.id}`).then((res) => {
    //introduction
    caseScenario.introduction.scenario = res.data.scenario
    caseScenario.introduction.imageLink = res.data.image_link
    caseScenario.introduction.audioLink = res.data.audio_link

    //assessment
    caseScenario.assessment.subjectives = res.data.assessment.subjectives
    caseScenario.assessment.objectives = res.data.assessment.objectives

    //nursing diagnosis
    caseScenario.nursingDiagnosis = res.data.nursing_diagnosis

    //planning
    caseScenario.planning.shortTermGoalsDesc = res.data.planning.shortTermGoalsDesc
    caseScenario.planning.shortTermGoals = res.data.planning.shortTermGoals
    caseScenario.planning.longTermGoalsDesc = res.data.planning.longTermGoalsDesc
    caseScenario.planning.longTermGoals = res.data.planning.longTermGoals

    //intervention
    caseScenario.intervention.independents = res.data.intervention.independents
    caseScenario.intervention.dependents = res.data.intervention.dependents
  })
})

function assessmentScore(userAnswers) {
  let totalCorrectItems = 1 //initial value because subjective correct answer is always 1
  let correctAnswers = 0
  let subjectives = caseScenario.assessment.subjectives
  let objectives = caseScenario.assessment.objectives

  objectives.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  if (userAnswers.subjective === subjectives.correctValue) {
    correctAnswers++
  } else if (correctAnswers > 0) {
    correctAnswers--
  }

  userAnswers.objective.forEach((answer) => {
    if (objectives[objectives.map((e) => e.text).indexOf(answer)].isCorrect) {
      correctAnswers++
    } else if (correctAnswers > 0) {
      correctAnswers--
    }
  })

  return correctAnswers === 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
}

function nursingDiagScore(userAnswers) {
  let correctAnswer = caseScenario.nursingDiagnosis.correctValue
  return userAnswers === correctAnswer ? 20 : 0
}

function planningScore(userAnswers) {
  let totalCorrectItems = 0
  let correctAnswers = 0
  let shortTermGoals = caseScenario.planning.shortTermGoals
  let longTermGoals = caseScenario.planning.longTermGoals

  shortTermGoals.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  longTermGoals.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  userAnswers.shortTermGoal.forEach((answer) => {
    if (shortTermGoals[shortTermGoals.map((e) => e.text).indexOf(answer)].isCorrect) {
      correctAnswers++
    } else if (correctAnswers > 0) {
      correctAnswers--
    }
  })

  userAnswers.longTermGoal.forEach((answer) => {
    if (longTermGoals[longTermGoals.map((e) => e.text).indexOf(answer)].isCorrect) {
      correctAnswers++
    } else if (correctAnswers > 0) {
      correctAnswers--
    }
  })

  return correctAnswers === 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
}

function interventionScore(userAnswers) {
  let totalCorrectItems = 0
  let correctAnswers = 0
  let independents = caseScenario.intervention.independents
  let dependents = caseScenario.intervention.dependents

  independents.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  dependents.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  userAnswers.independent.forEach((answer) => {
    if (independents[independents.map((e) => e.text).indexOf(answer.split('::')[0])].isCorrect) {
      correctAnswers++
    } else if (correctAnswers > 0) {
      correctAnswers--
    }
  })

  userAnswers.dependent.forEach((answer) => {
    if (dependents[dependents.map((e) => e.text).indexOf(answer.split('::')[0])].isCorrect) {
      correctAnswers++
    } else if (correctAnswers > 0) {
      correctAnswers--
    }
  })

  return correctAnswers === 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
}

function evaluationScore(score1, score2, score3, score4) {
  let sumScores = score1 + score2 + score3 + score4
  return sumScores === 0 ? 0 : (sumScores / 80) * 100 * 0.2
}

function nextStep() {
  let headerHeight = 76
  let bottomEdge = scenarioRef.value.getBoundingClientRect().bottom + scrollableDiv.value.scrollTop - headerHeight

  scrollableDiv.value.scrollTo(0, bottomEdge)
  step.count++
}

function submit() {
  const formData = new FormData(formRef.value)
  const formDataObj = {}

  formData.forEach((value, key) => {
    if (key === 'objective' || key === 'short_term_goal' || key === 'long_term_goal' || key === 'independent' || key === 'dependent') {
      formDataObj[key] = formData.getAll(key)
    } else {
      formDataObj[key] = value
    }
  })

  let score1 = assessmentScore({
    subjective: formDataObj.subjective,
    objective: formDataObj.objective
  })

  let score2 = nursingDiagScore(formDataObj.nursing_diagnosis)

  let score3 = planningScore({
    shortTermGoal: formDataObj.short_term_goal,
    longTermGoal: formDataObj.long_term_goal
  })

  let score4 = interventionScore({
    independent: formDataObj.independent,
    dependent: formDataObj.dependent
  })

  let score5 = evaluationScore(score1, score2, score3, score4)

  let totalScore = score1 + score2 + score3 + score4 + score5

  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/case-scenario-history/create`, {
      userId: localStorage.getItem('ncp_user_id'),
      caseId: route.params.id,
      answers: formDataObj,
      assessmentScore: score1,
      nursingDiagScore: score2,
      planningScore: score3,
      interventionScore: score4,
      evaluationScore: score5,
      overallScore: totalScore
    })
    .then((res) => {
      router.push({ name: 'evaluation', params: { id: res.data.historyId } })
    })
}
</script>

<template>
  <form @submit.prevent="submit()" ref="formRef" class="flex h-[100svh] flex-col">
    <!-- case body -->
    <div class="grow overflow-y-auto scroll-smooth px-4 pb-4" ref="scrollableDiv">
      <div class="sticky top-0 z-10 bg-blue-50 pb-4 pt-6">
        <h1>Case Scenario {{ $route.params.number }}</h1>
      </div>

      <div :class="`bg-[url('${caseScenario.introduction.imageLink}')]`" class="h-56 w-full shrink-0 rounded-2xl bg-cover"></div>

      <!-- scenario -->
      <div class="flex flex-col items-center gap-1 pt-4" ref="scenarioRef">
        <p>{{ caseScenario.introduction.scenario }}</p>
        <div>
          <span class="text-sm text-neutral-600">Audio description here:</span>
          <audio controls class="block w-screen max-w-[320px]" :src="caseScenario.introduction.audioLink" type="audio/mp3"></audio>
        </div>
      </div>

      <hr class="mx-2 my-2 border-neutral-300" />

      <!-- subjective  -->
      <div v-show="step.count === 1">
        <h3 class="pb-2 font-medium">Subjective</h3>
        <div class="flex flex-col gap-1">
          <label
            v-for="(subjective, index) in caseScenario.assessment.subjectives.texts"
            :key="index"
            class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
          >
            <input type="radio" name="subjective" :value="subjective.text" />
            {{ subjective.text }}.
          </label>
        </div>

        <h3 class="pb-2 font-medium">Objective</h3>
        <div class="flex flex-col gap-1">
          <label
            v-for="(objective, index) in caseScenario.assessment.objectives"
            :key="index"
            class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
          >
            <input type="checkbox" name="objective" :value="objective.text" />
            {{ objective.text }}.
          </label>
        </div>
      </div>

      <div v-show="step.count === 2">
        <h3 class="pb-2 font-medium">Choices</h3>
        <div class="flex flex-col gap-1">
          <label
            v-for="(diagnosis, index) in caseScenario.nursingDiagnosis.texts"
            :key="index"
            class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
          >
            <input type="radio" name="nursing_diagnosis" :value="diagnosis.text" />
            {{ diagnosis.text }}.
          </label>
        </div>
      </div>

      <div v-show="step.count === 3">
        <h3 class="pb-2 font-medium">Short Term Goal</h3>
        <p class="font-medium">{{ caseScenario.planning.shortTermGoalsDesc }}:</p>
        <div class="flex flex-col gap-1">
          <label
            v-for="(shortTermGoal, index) in caseScenario.planning.shortTermGoals"
            :key="index"
            class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
          >
            <input type="checkbox" name="short_term_goal" :value="shortTermGoal.text" />
            {{ shortTermGoal.text }}.
          </label>
        </div>

        <h3 class="pb-2 font-medium">Long Term Goal</h3>
        <p class="font-medium">{{ caseScenario.planning.longTermGoalsDesc }}:</p>
        <div class="flex flex-col gap-1">
          <label
            v-for="(longTermGoal, index) in caseScenario.planning.longTermGoals"
            :key="index"
            class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
          >
            <input type="checkbox" name="long_term_goal" :value="longTermGoal.text" />
            {{ longTermGoal.text }}.
          </label>
        </div>
      </div>

      <div v-show="step.count === 4">
        <h3 class="pb-2 font-medium">Independent</h3>
        <div class="flex flex-col gap-1">
          <label
            v-for="(independent, index) in caseScenario.intervention.independents"
            :key="index"
            class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
          >
            <input type="checkbox" name="independent" :value="`${independent.text}::${independent.rationale}`" />
            <div>
              {{ independent.text }}. <br />
              <i>({{ independent.rationale }})</i>
            </div>
          </label>
        </div>

        <h3 class="pb-2 font-medium">Dependent</h3>
        <div class="flex flex-col gap-1">
          <label
            v-for="(dependent, index) in caseScenario.intervention.dependents"
            :key="index"
            class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
          >
            <input type="checkbox" name="dependent" :value="`${dependent.text}::${dependent.rationale}`" />
            <div>
              {{ dependent.text }}. <br />
              <i>({{ dependent.rationale }})</i>
            </div>
          </label>
        </div>
      </div>
    </div>

    <!-- progress -->
    <div class="w-screen">
      <div class="step-count h-1 bg-blue-400 ease-in"></div>
      <div class="grid auto-cols-[max-content_auto_max-content] grid-flow-col items-center gap-4 px-4 py-2 text-start">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-400 text-xl font-medium">{{ step.count }}</div>
        <div class="flex flex-col">
          <span class="text-sm leading-none">You are now on</span>
          <span class="text-lg font-bold leading-none">{{ stepLabel[step.count - 1] }}</span>
        </div>

        <VButton v-if="step.count < 4" @click="nextStep()" type="button" color="warning">
          <div class="flex flex-row items-center">
            <span>Next</span>
            <span class="material-icons"> chevron_right </span>
          </div>
        </VButton>

        <VButton v-else type="submit" color="warning">
          <div class="flex flex-row items-center">
            <span>Finish</span>
          </div>
        </VButton>
      </div>
    </div>
  </form>
</template>

<style scoped>
.step-count {
  width: v-bind('step.percent');
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>

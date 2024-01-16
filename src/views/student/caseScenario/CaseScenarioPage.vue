<script setup>
import { reactive, computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

const scrollableDiv = ref(null)
const scenarioRef = ref(null)

const stepLabel = ['Assessment', 'Nursing Diagnosis', 'Planning', 'Intervention']

const step = reactive({
  count: 1,
  percent: computed(() => {
    return (step.count / 5) * 100 + '%'
  })
})

const data = reactive({
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

const answers = ref({
  subjective: null,
  objective: [],
  nursingDiagnosis: null,
  shortTermGoal: [],
  longTermGoal: [],
  independent: [],
  dependent: []
})

const isLoading = ref(true)
onMounted(() => {
  step.count = parseInt(localStorage.getItem('ncp_case_scenario_step'))
  answers.value = JSON.parse(localStorage.getItem('ncp_case_scenario_answers'))

  axios.get(`${import.meta.env.VITE_API_DOMAIN}/case-scenarios/get/${route.params.category}/${route.params.id}`).then((res) => {
    //introduction
    data.introduction.scenario = res.data.scenario
    data.introduction.imageLink = res.data.image_link.replace(/dl=0/g, 'raw=1')
    data.introduction.audioLink = res.data.audio_link.replace(/dl=0/g, 'raw=1')

    //assessment
    data.assessment.subjectives = res.data.assessment.subjectives
    data.assessment.objectives = res.data.assessment.objectives

    //nursing diagnosis
    data.nursingDiagnosis = res.data.nursing_diagnosis

    //planning
    data.planning.shortTermGoalsDesc = res.data.planning.shortTermGoalsDesc
    data.planning.shortTermGoals = res.data.planning.shortTermGoals
    data.planning.longTermGoalsDesc = res.data.planning.longTermGoalsDesc
    data.planning.longTermGoals = res.data.planning.longTermGoals

    //intervention
    data.intervention.independents = res.data.intervention.independents
    data.intervention.dependents = res.data.intervention.dependents

    isLoading.value = false
  })
})

function assessmentScore(subjAnswer, objAnswer) {
  let totalCorrectItems = 1 //initial value because subjective correct answer is always 1
  let correctAnswers = 0
  let subjectives = data.assessment.subjectives
  let objectives = data.assessment.objectives

  objectives.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  if (subjAnswer === subjectives.correctValue) {
    correctAnswers++
  } else if (correctAnswers > 0) {
    correctAnswers--
  }

  objAnswer.forEach((answer) => {
    if (objectives[objectives.map((e) => e.text).indexOf(answer)].isCorrect) {
      correctAnswers++
    } else if (correctAnswers > 0) {
      correctAnswers--
    }
  })

  return correctAnswers === 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
}

function nursingDiagScore(ndAnswer) {
  let correctAnswer = data.nursingDiagnosis.correctValue
  return ndAnswer === correctAnswer ? 20 : 0
}

function planningScore(stgAnswer, ltgAnswer) {
  let totalCorrectItems = 0
  let correctAnswers = 0
  let shortTermGoals = data.planning.shortTermGoals
  let longTermGoals = data.planning.longTermGoals

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

  stgAnswer.forEach((answer) => {
    if (shortTermGoals[shortTermGoals.map((e) => e.text).indexOf(answer)].isCorrect) {
      correctAnswers++
    } else if (correctAnswers > 0) {
      correctAnswers--
    }
  })

  ltgAnswer.forEach((answer) => {
    if (longTermGoals[longTermGoals.map((e) => e.text).indexOf(answer)].isCorrect) {
      correctAnswers++
    } else if (correctAnswers > 0) {
      correctAnswers--
    }
  })

  return correctAnswers === 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
}

function interventionScore(indepAnswer, depAnswer) {
  let totalCorrectItems = 0
  let correctAnswers = 0
  let independents = data.intervention.independents
  let dependents = data.intervention.dependents

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

  indepAnswer.forEach((answer) => {
    if (independents[independents.map((e) => e.text).indexOf(answer.split('::')[0])].isCorrect) {
      correctAnswers++
    } else if (correctAnswers > 0) {
      correctAnswers--
    }
  })

  depAnswer.forEach((answer) => {
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

  localStorage.setItem('ncp_case_scenario_step', step.count)
  localStorage.setItem('ncp_case_scenario_answers', JSON.stringify(answers.value))
}

function disableNext() {
  switch (step.count) {
    case 1:
      return answers.value.subjective === null || answers.value.objective.length === 0
    case 2:
      return answers.value.nursingDiagnosis === null
    case 3:
      return answers.value.shortTermGoal.length === 0 || answers.value.longTermGoal.length === 0
    case 4:
      return answers.value.independent.length === 0 || answers.value.dependent.length === 0
  }
}

const isSubmitting = ref(false)
function submit() {
  let score1 = assessmentScore(answers.value.subjective, answers.value.objective)
  let score2 = nursingDiagScore(answers.value.nursingDiagnosis)
  let score3 = planningScore(answers.value.shortTermGoal, answers.value.longTermGoal)
  let score4 = interventionScore(answers.value.independent, answers.value.dependent)
  let score5 = evaluationScore(score1, score2, score3, score4)
  let totalScore = score1 + score2 + score3 + score4 + score5
  isSubmitting.value = true

  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/case-scenario-history/create`, {
      userId: localStorage.getItem('ncp_user_id'),
      caseId: route.params.id,
      answers: answers.value,
      assessmentScore: score1,
      nursingDiagScore: score2,
      planningScore: score3,
      interventionScore: score4,
      evaluationScore: score5,
      overallScore: totalScore
    })
    .then((res) => {
      localStorage.setItem('ncp_case_scenario_category', undefined)
      localStorage.setItem('ncp_case_scenario_number', undefined)
      localStorage.setItem('ncp_case_scenario_id', undefined)
      localStorage.setItem('ncp_case_scenario_session', false)
      localStorage.setItem('ncp_case_scenario_step', 1)
      localStorage.setItem(
        'ncp_case_scenario_answers',
        JSON.stringify({
          subjective: null,
          objective: [],
          nursingDiagnosis: null,
          shortTermGoal: [],
          longTermGoal: [],
          independent: [],
          dependent: []
        })
      )

      router.push({ name: 'evaluation', params: { id: res.data.historyId } })
    })
}
</script>

<template>
  <div class="flex h-[100svh] flex-col">
    <!-- case body -->
    <div class="grow overflow-y-auto scroll-smooth pb-[78px]" ref="scrollableDiv">
      <div class="sticky top-0 z-10 bg-blue-50/70 px-4 pb-4 pt-6 backdrop-blur-xl">
        <h1>Case Scenario {{ $route.params.number }}</h1>
      </div>

      <div v-if="isLoading" class="flex items-center justify-center p-4">
        <VLoader size="32px" thickness="2px" />
      </div>

      <div v-else class="flex flex-col px-4">
        <div class="flex flex-col items-center lg:flex-row lg:gap-4">
          <picture
            v-if="data.introduction.imageLink"
            class="relative block w-full max-w-[512px] overflow-hidden rounded-2xl pt-[56.25%] sm:h-[288px] sm:pt-0 lg:shrink-0"
          >
            <img
              :src="data.introduction.imageLink"
              :alt="data.introduction.imageLink"
              class="absolute left-0 top-0 h-full w-full object-cover object-center"
            />
          </picture>

          <!-- scenario -->
          <div class="flex flex-col items-center gap-1 pt-4" ref="scenarioRef">
            <p>{{ data.introduction.scenario }}</p>
            <div v-if="data.introduction.audioLink">
              <span class="text-sm text-neutral-600">Audio sample:</span>
              <audio controls class="block w-screen max-w-[320px]" :src="data.introduction.audioLink" type="audio/mp3"></audio>
            </div>
          </div>
        </div>

        <hr class="mx-2 my-2 border-neutral-300" />

        <div v-if="isLoading" class="flex items-center justify-center p-4">
          <VLoader size="32px" thickness="2px" />
        </div>

        <!-- possible answers -->
        <template v-else>
          <div v-show="step.count === 1">
            <h3 class="pb-2 font-medium">Subjective</h3>
            <div class="flex flex-col gap-1">
              <label
                v-for="(subjective, index) in data.assessment.subjectives.texts"
                :key="index"
                class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
              >
                <input v-model="answers.subjective" type="radio" :value="subjective.text" />
                {{ subjective.text }}
              </label>
            </div>

            <h3 class="pb-2 font-medium">Objective</h3>
            <div class="flex flex-col gap-1">
              <label
                v-for="(objective, index) in data.assessment.objectives"
                :key="index"
                class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
              >
                <input v-model="answers.objective" type="checkbox" :value="objective.text" />
                {{ objective.text }}
              </label>
            </div>
          </div>

          <div v-show="step.count === 2">
            <h3 class="pb-2 font-medium">Choices</h3>
            <div class="flex flex-col gap-1">
              <label
                v-for="(diagnosis, index) in data.nursingDiagnosis.texts"
                :key="index"
                class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
              >
                <input v-model="answers.nursingDiagnosis" type="radio" :value="diagnosis.text" />
                {{ diagnosis.text }}
              </label>
            </div>
          </div>

          <div v-show="step.count === 3">
            <h3 class="pb-2 font-medium">Short Term Goal</h3>
            <p class="font-medium">{{ data.planning.shortTermGoalsDesc }}:</p>
            <div class="flex flex-col gap-1">
              <label
                v-for="(shortTermGoal, index) in data.planning.shortTermGoals"
                :key="index"
                class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
              >
                <input v-model="answers.shortTermGoal" type="checkbox" :value="shortTermGoal.text" />
                {{ shortTermGoal.text }}
              </label>
            </div>

            <h3 class="pb-2 font-medium">Long Term Goal</h3>
            <p class="font-medium">{{ data.planning.longTermGoalsDesc }}:</p>
            <div class="flex flex-col gap-1">
              <label
                v-for="(longTermGoal, index) in data.planning.longTermGoals"
                :key="index"
                class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
              >
                <input v-model="answers.longTermGoal" type="checkbox" :value="longTermGoal.text" />
                {{ longTermGoal.text }}
              </label>
            </div>
          </div>

          <div v-show="step.count === 4">
            <h3 class="pb-2 font-medium">Independent</h3>
            <div class="flex flex-col gap-1">
              <label
                v-for="(independent, index) in data.intervention.independents"
                :key="index"
                class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
              >
                <input v-model="answers.independent" type="checkbox" :value="`${independent.text}::${independent.rationale}`" />
                <div>
                  {{ independent.text }}<br />
                  <i>({{ independent.rationale }})</i>
                </div>
              </label>
            </div>

            <h3 class="pb-2 font-medium">Dependent</h3>
            <div class="flex flex-col gap-1">
              <label
                v-for="(dependent, index) in data.intervention.dependents"
                :key="index"
                class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
              >
                <input v-model="answers.dependent" type="checkbox" name="dependent" :value="`${dependent.text}::${dependent.rationale}`" />
                <div>
                  {{ dependent.text }}<br />
                  <i>({{ dependent.rationale }})</i>
                </div>
              </label>
            </div>
          </div>
        </template>
      </div>
    </div>

    <!-- progress -->
    <div class="w-full border-t border-t-neutral-300 bg-blue-50/70 backdrop-blur-xl">
      <div class="step-count h-1 bg-blue-400 ease-in"></div>
      <div class="grid auto-cols-[max-content_auto_max-content] grid-flow-col items-center gap-4 px-4 py-2 text-start">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-400 text-xl font-medium">{{ step.count }}</div>
        <div class="flex flex-col">
          <span class="text-sm leading-none">You are now on</span>
          <span class="text-lg font-bold leading-none">{{ stepLabel[step.count - 1] }}</span>
        </div>

        <VButton v-if="step.count < 4" @click="nextStep()" :disabled="disableNext()" color="warning" class="w-[88px] justify-center">
          <div class="flex flex-row items-center">
            <span>Next</span>
            <span class="material-icons"> chevron_right </span>
          </div>
        </VButton>

        <VButton v-else @click="submit()" :disabled="disableNext() || isSubmitting" color="warning" class="w-[88px] justify-center">
          <div class="flex flex-row items-center">
            <VLoader v-if="isSubmitting" size="16px" thickness="2px" />
            <span v-else>Finish</span>
          </div>
        </VButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.step-count {
  width: v-bind('step.percent');
  transition-property: width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 300ms;
}
</style>

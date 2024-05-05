<script setup>
import { reactive, computed, watchEffect, watch, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { toastStore } from '@/store'
import axios from 'axios'
import draggable from 'vuedraggable'
import shuffleArray from '@/assets/scripts/shuffleArray'

const route = useRoute()
const router = useRouter()

const transitionOptions = {
  animation: 150,
  group: 'description',
  disabled: false,
  ghostClass: 'ghost'
}

const scrollableDiv = ref(null)
const scenarioRef = ref(null)

const stepLabel = [
  'Assessment',
  'Nursing Diagnosis: Part 1',
  'Nursing Diagnosis: Part 2',
  'Nursing Diagnosis: Part 3',
  'Planning',
  'Intervention: Part 1',
  'Intervention: Part 2',
  'Intervention: Part 3',
  'Intervention: Rationale'
]

const step = reactive({
  count: 1,
  percent: computed(() => {
    return (step.count / 7) * 100 + '%'
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
  nursingDiagnosis: {
    diagnosis: { texts: null, correctValue: null },
    relatedTo: { texts: null, correctValue: null },
    signsAndSymptoms: null
  },
  planning: {
    shortTermGoalsDesc: null,
    shortTermGoals: null,
    longTermGoalsDesc: null,
    longTermGoals: null
  }
  // intervention: {
  //   dependents: null,
  //   independents: null,
  //   collaboratives: null
  // }
})

const possibleAnswers = reactive({
  assessment: {
    subjectives: { texts: null, correctValue: null },
    objectives: null
  },
  nursingDiagnosis: {
    diagnosis: { texts: null, correctValue: null },
    relatedTo: { texts: null, correctValue: null },
    signsAndSymptoms: null
  },
  planning: {
    shortTermGoalsDesc: null,
    shortTermGoals: null,
    longTermGoalsDesc: null,
    longTermGoals: null
  },
  interventions: [],
  intervention: {
    dependents: null,
    independents: null,
    collaboratives: null,
    rationale: null
  }
})

const answers = ref({
  subjective: null,
  objective: [],
  diagnosis: null,
  relatedTo: null,
  signsAndSymptoms: [],
  shortTermGoal: [],
  longTermGoal: [],
  dependent: [],
  independent: [],
  collaborative: []
})

const dependentRationale = ref([])
const independentRationale = ref([])
const collabRationale = ref([])

watchEffect(() => {
  dependentRationale.value = Array(answers.value.dependent.length).fill('N/A')
  independentRationale.value = Array(answers.value.independent.length).fill('N/A')
  collabRationale.value = Array(answers.value.collaborative.length).fill('N/A')
})

const isLoading = ref(true)
onMounted(async () => {
  step.count = parseInt(localStorage.getItem('ncp_case_scenario_step'))
  answers.value = JSON.parse(localStorage.getItem('ncp_case_scenario_answers'))

  await axios({
    method: 'get',
    url: `${import.meta.env.VITE_API_DOMAIN}/case-scenarios/${route.params.id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('ncp_token')}`,
      Role: 'student'
    },
    params: {
      category: route.params.category
    }
  })
    .then((res) => {
      //introduction
      data.introduction.scenario = res.data.scenario
      data.introduction.imageLink = res.data.image_link.replace(/dl=0/g, 'raw=1')
      data.introduction.audioLink = res.data.audio_link.replace(/dl=0/g, 'raw=1')

      //assessment
      data.assessment.subjectives = res.data.assessment.subjectives
      data.assessment.objectives = res.data.assessment.objectives

      //nursing diagnosis
      data.nursingDiagnosis.diagnosis = res.data.nursing_diagnosis.diagnosis
      data.nursingDiagnosis.relatedTo = res.data.nursing_diagnosis.relatedTo
      data.nursingDiagnosis.signsAndSymptoms = res.data.nursing_diagnosis.signsAndSymptoms

      //planning
      data.planning.shortTermGoalsDesc = res.data.planning.shortTermGoalsDesc
      data.planning.shortTermGoals = res.data.planning.shortTermGoals
      data.planning.longTermGoalsDesc = res.data.planning.longTermGoalsDesc
      data.planning.longTermGoals = res.data.planning.longTermGoals

      //intervention
      // data.intervention.independents = res.data.intervention.independents
      // data.intervention.dependents = res.data.intervention.dependents
      // data.intervention.collaboratives = res.data.intervention.collaboratives

      /* This part is important, shuffleArray on a v-for while updating their answer leads to reshuffle every rerender, */
      //assessment
      possibleAnswers.assessment.subjectives.texts = shuffleArray(data.assessment.subjectives.texts)
      possibleAnswers.assessment.objectives = shuffleArray(data.assessment.objectives)

      //nursing diagnosis
      possibleAnswers.nursingDiagnosis.diagnosis.texts = shuffleArray(data.nursingDiagnosis.diagnosis.texts)
      possibleAnswers.nursingDiagnosis.relatedTo.texts = shuffleArray(data.nursingDiagnosis.relatedTo.texts)
      possibleAnswers.nursingDiagnosis.signsAndSymptoms = shuffleArray(data.nursingDiagnosis.signsAndSymptoms)

      //planning
      possibleAnswers.planning.shortTermGoals = shuffleArray(data.planning.shortTermGoals)
      possibleAnswers.planning.longTermGoals = shuffleArray(data.planning.longTermGoals)

      //intervention
      // possibleAnswers.intervention.dependents = shuffleArray(data.intervention.dependents)
      // possibleAnswers.intervention.independents = shuffleArray(data.intervention.independents)
      // possibleAnswers.intervention.collaboratives = shuffleArray(data.intervention.collaboratives)

      // possibleAnswers.intervention.rationale = [
      //   'N/A',
      //   ...shuffleArray([
      //     ...possibleAnswers.intervention.dependents.map((e) => e.rationale),
      //     ...possibleAnswers.intervention.independents.map((e) => e.rationale),
      //     ...possibleAnswers.intervention.collaboratives.map((e) => e.rationale)
      //   ])
      // ]
    })
    .catch((err) => {
      if (err.response.status == 401) {
        Object.keys(localStorage).forEach(function (key) {
          if (/^ncp_/.test(key)) {
            localStorage.removeItem(key)
          }
        })
        router.push({ name: 'login' })
      } else {
        toastStore.add({
          msg: err.response.data,
          duration: 4000
        })
      }
    })
    .finally(() => (isLoading.value = false))

  watch(
    () => step.count,
    () => {
      if (step.count >= 6) {
        let diagnosisIndex = data.nursingDiagnosis.diagnosis.texts.map((e) => e.text).indexOf(answers.value.diagnosis)

        //intervention
        possibleAnswers.interventions = [
          ...shuffleArray(data.nursingDiagnosis.diagnosis.texts[diagnosisIndex].intervention.independents.map((e) => e.text)),
          ...shuffleArray(data.nursingDiagnosis.diagnosis.texts[diagnosisIndex].intervention.dependents.map((e) => e.text)),
          ...shuffleArray(data.nursingDiagnosis.diagnosis.texts[diagnosisIndex].intervention.collaboratives.map((e) => e.text))
        ]

        possibleAnswers.interventions.rationale = [
          'N/A',
          ...shuffleArray([
            ...data.nursingDiagnosis.diagnosis.texts[diagnosisIndex].intervention.independents.map((e) => e.rationale),
            ...data.nursingDiagnosis.diagnosis.texts[diagnosisIndex].intervention.dependents.map((e) => e.rationale),
            ...data.nursingDiagnosis.diagnosis.texts[diagnosisIndex].intervention.collaboratives.map((e) => e.rationale)
          ])
        ]
      }
    },
    { immediate: true }
  )
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
  } else {
    correctAnswers--
  }

  objAnswer.forEach((answer) => {
    if (objectives[objectives.map((e) => e.text).indexOf(answer)].isCorrect) {
      correctAnswers++
    } else {
      correctAnswers -= 0.5
    }
  })

  return correctAnswers <= 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
}

function nursingDiagScore(diagAnswer, relToAnswer, SASAnswer) {
  let totalCorrectItems = 2 //
  let correctAnswers = 0
  let nursingDiagnosis = data.nursingDiagnosis

  nursingDiagnosis.signsAndSymptoms.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  if (diagAnswer !== nursingDiagnosis.diagnosis.correctValue) {
    return 0
  } else {
    correctAnswers++
  }

  if (relToAnswer !== nursingDiagnosis.relatedTo.correctValue) {
    return correctAnswers <= 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
  } else {
    correctAnswers++

    SASAnswer.forEach((answer) => {
      if (nursingDiagnosis.signsAndSymptoms[nursingDiagnosis.signsAndSymptoms.map((e) => e.text).indexOf(answer)].isCorrect) {
        correctAnswers++
      } else {
        correctAnswers--
      }
    })
  }

  return correctAnswers <= 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
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
    } else {
      correctAnswers--
    }
  })

  ltgAnswer.forEach((answer) => {
    if (longTermGoals[longTermGoals.map((e) => e.text).indexOf(answer)].isCorrect) {
      correctAnswers++
    } else {
      correctAnswers--
    }
  })

  return correctAnswers <= 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
}

function interventionScore(depAnswer, indepAnswer, collabAnswer) {
  let diagnosisIndex = data.nursingDiagnosis.diagnosis.texts.map((e) => e.text).indexOf(answers.value.diagnosis)

  let totalCorrectItems = 0
  let correctAnswers = 0
  let dependents = data.nursingDiagnosis.diagnosis.texts[diagnosisIndex].intervention.dependents
  let independents = data.nursingDiagnosis.diagnosis.texts[diagnosisIndex].intervention.independents
  let collaboratives = data.nursingDiagnosis.diagnosis.texts[diagnosisIndex].intervention.collaboratives

  dependents.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  independents.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  collaboratives.forEach((item) => {
    if (item.isCorrect) {
      totalCorrectItems++
    }
  })

  depAnswer.forEach((answer, index) => {
    let ansDependent = answer.split('::')[0]
    let ansRationale = answer.split('::')[1]
    let dataDependent = dependents[dependents.map((e) => e.text).indexOf(ansDependent)]

    if (dataDependent !== undefined) {
      if (dataDependent.isCorrect && dataDependent.rationale === ansRationale) {
        correctAnswers++
      }
    } else {
      correctAnswers--
    }

    if (dependents[index] && ansDependent !== dependents[index].text) {
      correctAnswers -= 0.25
    }
  })

  indepAnswer.forEach((answer, index) => {
    let ansIndependent = answer.split('::')[0]
    let ansRationale = answer.split('::')[1]
    let dataIndependent = independents[independents.map((e) => e.text).indexOf(ansIndependent)]

    if (dataIndependent !== undefined) {
      if (dataIndependent.isCorrect && dataIndependent.rationale === ansRationale) {
        correctAnswers++
      }
    } else {
      correctAnswers--
    }

    if (independents[index] && ansIndependent !== independents[index].text) {
      correctAnswers -= 0.25
    }
  })

  collabAnswer.forEach((answer) => {
    let ansCollab = answer.split('::')[0]
    let ansRationale = answer.split('::')[1]
    let dataCollab = collaboratives[collaboratives.map((e) => e.text).indexOf(ansCollab)]

    if (dataCollab !== undefined) {
      if (dataCollab.isCorrect && dataCollab.rationale === ansRationale) {
        correctAnswers++
      }
    } else {
      correctAnswers--
    }
  })

  return correctAnswers <= 0 ? 0 : (correctAnswers / totalCorrectItems) * 100 * 0.2
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
      return answers.value.diagnosis === null
    case 3:
      return answers.value.relatedTo === null
    case 4:
      return answers.value.signsAndSymptoms.length === 0
    case 5:
      return answers.value.shortTermGoal.length === 0 || answers.value.longTermGoal.length === 0
    case 6:
      return answers.value.dependent.length === 0 || answers.value.independent.length === 0 || answers.value.collaborative.length === 0
  }
}

const isSubmitting = ref(false)
async function submit() {
  isSubmitting.value = true
  answers.value.dependent.forEach((dependent, index) => {
    answers.value.dependent[index] = dependent + '::' + dependentRationale.value[index]
  })

  answers.value.independent.forEach((independent, index) => {
    answers.value.independent[index] = independent + '::' + independentRationale.value[index]
  })

  answers.value.collaborative.forEach((collaborative, index) => {
    answers.value.collaborative[index] = collaborative + '::' + collabRationale.value[index]
  })

  let score1 = assessmentScore(answers.value.subjective, answers.value.objective)
  let score2 = nursingDiagScore(answers.value.diagnosis, answers.value.relatedTo, answers.value.signsAndSymptoms)
  let score3 = planningScore(answers.value.shortTermGoal, answers.value.longTermGoal)
  let score4 = interventionScore(answers.value.dependent, answers.value.independent, answers.value.collaborative)
  let score5 = evaluationScore(score1, score2, score3, score4)
  let totalScore = score1 + score2 + score3 + score4 + score5

  await axios({
    method: 'post',
    url: `${import.meta.env.VITE_API_DOMAIN}/history/case-scenario`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('ncp_token')}`,
      Role: 'student'
    },
    data: {
      userId: localStorage.getItem('ncp_user_id'),
      caseId: route.params.id,
      answers: answers.value,
      assessmentScore: score1,
      nursingDiagScore: score2,
      planningScore: score3,
      interventionScore: score4,
      evaluationScore: score5,
      overallScore: totalScore
    },
    timeout: 7000
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
          diagnosis: null,
          relatedTo: null,
          signsAndSymptoms: [],
          shortTermGoal: [],
          longTermGoal: [],
          independent: [],
          dependent: [],
          collaborative: []
        })
      )

      toastStore.add({
        msg: 'Case scenario submitted',
        duration: 4000
      })

      router.push({ name: 'evaluation', params: { id: res.data.historyId } })
    })
    .catch((err) => {
      if (err.code === 'ECONNABORTED') {
        toastStore.add({
          msg: 'Request timed out',
          duration: 2000
        })
      } else if (err.response.status == 401) {
        Object.keys(localStorage).forEach(function (key) {
          if (/^ncp_/.test(key)) {
            localStorage.removeItem(key)
          }
        })
        router.push({ name: 'login' })
      } else {
        toastStore.add({
          msg: err.response.data,
          duration: 4000
        })
      }
    })
    .finally(() => (isSubmitting.value = false))
}
</script>

<template>
  <div class="flex h-[100svh] flex-col">
    <!-- case body -->
    <div class="grow overflow-y-scroll scroll-smooth pb-4" ref="scrollableDiv">
      <div class="sticky top-0 z-10 bg-blue-50/70 px-4 pb-4 pt-6 backdrop-blur-xl">
        <h1>Case Scenario {{ $route.params.number }}</h1>
      </div>

      <div v-if="isLoading" class="flex items-center justify-center p-4">
        <VLoader size="32px" thickness="2px" />
      </div>

      <div v-else class="flex flex-col items-center">
        <div class="flex w-full flex-col items-center px-4 lg:flex-row lg:gap-4">
          <picture
            v-if="data.introduction.imageLink"
            class="relative block w-full max-w-[640px] overflow-hidden rounded-2xl pt-[56.25%] sm:h-[360px] sm:pt-0 lg:shrink-0"
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

        <hr class="my-2 w-[calc(100%-32px)] border-neutral-300 px-4 pb-4" />

        <div v-if="isLoading" class="flex items-center justify-center px-8 py-4">
          <VLoader size="32px" thickness="2px" />
        </div>

        <!-- possible answers -->
        <template v-else>
          <transition name="fade-up" mode="out-in">
            <div v-if="step.count === 1" class="w-full max-w-[1024px] px-4">
              <h3 class="pb-2 font-medium">Subjective</h3>
              <div class="flex flex-col gap-1">
                <label
                  v-for="(subjective, index) in possibleAnswers.assessment.subjectives.texts"
                  :key="index"
                  class="flex shrink-0 cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
                >
                  <input v-model="answers.subjective" type="radio" :value="subjective.text" />
                  {{ subjective.text }}
                </label>
              </div>

              <h3 class="pb-2 font-medium">Objective</h3>
              <div class="flex flex-col gap-1">
                <label
                  v-for="(objective, index) in possibleAnswers.assessment.objectives"
                  :key="index"
                  class="flex shrink-0 cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
                >
                  <input v-model="answers.objective" type="checkbox" :value="objective.text" />
                  {{ objective.text }}
                </label>
              </div>
            </div>

            <div v-else-if="step.count === 2" class="w-full max-w-[1024px] px-4">
              <h3 class="pb-2 font-medium">Diagnosis</h3>
              <div class="flex flex-col gap-1">
                <label
                  v-for="(diagnosis, index) in possibleAnswers.nursingDiagnosis.diagnosis.texts"
                  :key="index"
                  class="flex shrink-0 cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
                >
                  <input v-model="answers.diagnosis" type="radio" :value="diagnosis.text" />
                  {{ diagnosis.text }}
                </label>
              </div>
            </div>

            <div v-else-if="step.count === 3" class="w-full max-w-[1024px] px-4">
              <h3 class="font-medium">Related to</h3>
              <p class="pb-2">"{{ answers.diagnosis }} related to..."</p>
              <div class="flex flex-col gap-1">
                <label
                  v-for="(relatedTo, index) in possibleAnswers.nursingDiagnosis.relatedTo.texts"
                  :key="index"
                  class="flex shrink-0 cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
                >
                  <input v-model="answers.relatedTo" type="radio" :value="relatedTo.text" />
                  {{ relatedTo.text }}
                </label>
              </div>
            </div>

            <div v-else-if="step.count === 4" class="w-full max-w-[1024px] px-4">
              <h3 class="font-medium">Signs and Symptoms</h3>
              <p class="pb-2">"{{ answers.diagnosis }} related to {{ answers.relatedTo }} as evidenced by..."</p>
              <div class="flex flex-col gap-1">
                <label
                  v-for="(signAndSymptom, index) in possibleAnswers.nursingDiagnosis.signsAndSymptoms"
                  :key="index"
                  class="flex shrink-0 cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
                >
                  <input v-model="answers.signsAndSymptoms" type="checkbox" :value="signAndSymptom.text" />
                  {{ signAndSymptom.text }}
                </label>
              </div>
            </div>

            <div v-else-if="step.count === 5" class="w-full max-w-[1024px] px-4">
              <h3 class="pb-2 font-medium">Short Term Goal/s</h3>
              <p class="font-medium">{{ data.planning.shortTermGoalsDesc }}</p>
              <div class="flex flex-col gap-1">
                <label
                  v-for="(shortTermGoal, index) in possibleAnswers.planning.shortTermGoals"
                  :key="index"
                  class="flex shrink-0 cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
                >
                  <input v-model="answers.shortTermGoal" type="checkbox" :value="shortTermGoal.text" />
                  {{ shortTermGoal.text }}
                </label>
              </div>

              <h3 class="pb-2 font-medium">Long Term Goal/s</h3>
              <p class="font-medium">{{ data.planning.longTermGoalsDesc }}</p>
              <div class="flex flex-col gap-1">
                <label
                  v-for="(longTermGoal, index) in possibleAnswers.planning.longTermGoals"
                  :key="index"
                  class="flex shrink-0 cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
                >
                  <input v-model="answers.longTermGoal" type="checkbox" :value="longTermGoal.text" />
                  {{ longTermGoal.text }}
                </label>
              </div>
            </div>

            <div v-else-if="step.count === 6" class="flex w-full max-w-[1024px] flex-col items-center">
              <div
                class="mb-4 flex w-[calc(100%-32px)] max-w-[1024px] flex-row items-center justify-center gap-1 rounded-lg bg-amber-400 px-4 py-4 text-lg font-medium lg:px-12"
              >
                <span class="material-icons-round">edit</span>
                <p>Move the Interventions to their appropriate boxes by clicking and dragging the icon.</p>
              </div>
              <div class="flex w-full flex-row gap-4 overflow-x-auto px-4">
                <div
                  class="flex w-[calc(100vw-100px)] max-w-[calc(100vw-100px)] shrink-0 flex-col gap-1 md:w-[calc(100%-8px)] md:max-w-[calc(100%-8px)] md:shrink-[1]"
                >
                  <h3 class="pb-2 font-medium">Interventions</h3>
                  <draggable
                    :list="possibleAnswers.interventions"
                    v-bind="transitionOptions"
                    tag="ul"
                    handle=".handle"
                    group="interventions"
                    item-key="order"
                    force-fallback="true"
                    class="max-h-[75vh] min-h-12 w-full space-y-2 overflow-y-auto border border-gray-300 p-1"
                  >
                    <template #item="{ element }">
                      <li class="flex flex-row items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                        <span class="material-icons-round handle cursor-move"> drag_handle </span>
                        {{ element }}
                      </li>
                    </template>
                  </draggable>
                </div>

                <div
                  class="flex max-h-[calc(75vh+36px+4px)] w-[calc(100vw-100px)] max-w-[calc(100vw-100px)] shrink-0 flex-col gap-4 overflow-y-auto md:w-[calc(100%-8px)] md:max-w-[calc(100%-8px)] md:shrink-[1] lg:max-h-[calc(75vh+40.5px+4px)]"
                >
                  <div class="flex w-full flex-col gap-1">
                    <h3 class="pb-2 font-medium">Independent</h3>
                    <draggable
                      v-model="answers.independent"
                      v-bind="transitionOptions"
                      tag="ul"
                      handle=".handle"
                      group="interventions"
                      item-key="order"
                      force-fallback="true"
                      class="min-h-12 w-full space-y-2 overflow-y-auto border border-gray-300 p-1"
                    >
                      <template #item="{ element }">
                        <li class="flex flex-row items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                          <span class="material-icons-round handle cursor-move"> drag_handle </span>
                          {{ element }}
                        </li>
                      </template>
                    </draggable>
                  </div>

                  <div class="flex w-full flex-col gap-1">
                    <h3 class="pb-2 font-medium">Dependent</h3>
                    <draggable
                      v-model="answers.dependent"
                      v-bind="transitionOptions"
                      tag="ul"
                      handle=".handle"
                      group="interventions"
                      item-key="order"
                      force-fallback="true"
                      class="min-h-12 w-full space-y-2 overflow-y-auto border border-gray-300 p-1"
                    >
                      <template #item="{ element }">
                        <li class="flex flex-row items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                          <span class="material-icons-round handle cursor-move"> drag_handle </span>
                          {{ element }}
                        </li>
                      </template>
                    </draggable>
                  </div>

                  <div class="flex w-full flex-col gap-1">
                    <h3 class="pb-2 font-medium">Collaborative</h3>
                    <draggable
                      v-model="answers.collaborative"
                      v-bind="transitionOptions"
                      tag="ul"
                      handle=".handle"
                      group="interventions"
                      item-key="order"
                      force-fallback="true"
                      class="min-h-12 w-full space-y-2 overflow-y-auto border border-gray-300 p-1"
                    >
                      <template #item="{ element }">
                        <li class="flex flex-row items-center gap-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
                          <span class="material-icons-round handle cursor-move"> drag_handle </span>
                          {{ element }}
                        </li>
                      </template>
                    </draggable>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="step.count === 7" class="w-full max-w-[1366px] px-4">
              <h3 class="pb-2 font-medium">Rationale</h3>
              <div class="xl:flex xl:flex-row xl:gap-2">
                <div class="xl:shrink-0 xl:basis-1/3">
                  <p class="font-medium">Your Independents:</p>
                  <div class="flex flex-col gap-1">
                    <div v-for="(answer, index) in answers.independent" :key="index" class="flex cursor-pointer flex-col gap-1 rounded-xl py-1">
                      <p class="text-neutral-600">{{ `${index + 1}.  ${answer.split('::')[0]}` }}</p>
                      <VSelect v-model="independentRationale[index]" :options="possibleAnswers.interventions.rationale" class="w-full" />
                    </div>
                  </div>
                </div>

                <hr class="my-4 border-neutral-300 xl:hidden" />

                <div class="xl:shrink-0 xl:basis-1/3">
                  <p class="font-medium">Your Dependents:</p>
                  <div class="flex flex-col gap-1">
                    <div v-for="(answer, index) in answers.dependent" :key="index" class="flex cursor-pointer flex-col gap-1 rounded-xl py-1">
                      <p class="text-neutral-600">{{ `${index + 1}.  ${answer.split('::')[0]}` }}</p>
                      <VSelect v-model="dependentRationale[index]" :options="possibleAnswers.interventions.rationale" class="w-full" />
                    </div>
                  </div>
                </div>

                <hr class="my-4 border-neutral-300 xl:hidden" />

                <div class="xl:shrink-0 xl:basis-1/3">
                  <p class="font-medium">Your Collaboratives:</p>
                  <div class="flex flex-col gap-1">
                    <div v-for="(answer, index) in answers.collaborative" :key="index" class="flex cursor-pointer flex-col gap-1 rounded-xl py-1">
                      <p class="text-neutral-600">{{ `${index + 1}. ${answer.split('::')[0]}` }}</p>
                      <VSelect v-model="collabRationale[index]" :options="possibleAnswers.interventions.rationale" class="w-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </template>
      </div>
    </div>

    <!-- progress -->
    <div class="w-full border-t border-t-neutral-300 bg-blue-50/70 backdrop-blur-xl">
      <div class="step-count h-1 bg-blue-400 ease-in"></div>
      <div class="grid auto-cols-[max-content_auto_max-content] grid-flow-col items-center gap-4 px-4 py-2 text-start">
        <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-400 text-xl font-medium">{{ step.count }}</div>
        <div class="flex flex-col">
          <span class="text-sm leading-none">You are now on </span>
          <span class="text-lg font-bold leading-none">{{ stepLabel[step.count - 1] }}</span>
        </div>

        <VButton v-if="step.count < 7" @click="nextStep()" :disabled="disableNext()" color="warning" class="w-[88px] justify-center">
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

.ghost {
  @apply border-gray-200 bg-gray-200 text-gray-200;
}
</style>

<script setup>
import { onMounted, reactive, ref, watchEffect } from 'vue'
import { scrollStore, toastStore } from '@/store'
import { useRouter } from 'vue-router'
import generatePDF from '@/assets/scripts/pdf'
import debounce from '@/assets/scripts/debounce'
import axios from 'axios'

const router = useRouter()

const data = ref(null)
const history = ref([])
const lastFetch = ref([])
const isLoading = ref(true)
const moreLoading = ref(true)
const moreLoadingRef = ref(null)
const lastID = ref(null)
const search = ref({
  text: '',
  section: 'All',
  category: 'All'
})

const getHistory = debounce(async (text, section, category) => {
  if (lastFetch.value.length === 50 || lastFetch.value.length === 0) {
    await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_DOMAIN}/history/case-scenario/search`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ncpadmin_token')}`,
        Role: 'admin'
      },
      params: {
        search: text,
        section: section,
        category: category,
        cursor: lastID.value
      }
    })
      .then((res) => {
        lastFetch.value = res.data
        history.value.push(...lastFetch.value)

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
        moreLoading.value = false
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
    getHistory(search.value.text, search.value.section, search.value.category)
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
const answersData = reactive({
  answers: null,
  parsedAnswers: null,
  isLoading: false,
  async goParse(answers, category, id) {
    this.isLoading = true
    await axios({
      method: 'get',
      url: `${import.meta.env.VITE_API_DOMAIN}/case-scenarios/${category}/${id}`,
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ncpadmin_token')}`,
        Role: 'admin'
      }
    })
      .then((res) => {
        let parsedAnswers = {}
        let diagnosisIndex = res.data.nursing_diagnosis.diagnosis.texts.map((e) => e.text).indexOf(answers.diagnosis)

        parsedAnswers.subjective = {
          answer: answers.subjective,
          isCorrect: answers.subjective === res.data.assessment.subjectives.correctValue
        }

        parsedAnswers.objectives = []
        answers.objective.forEach((element) => {
          res.data.assessment.objectives.forEach((item) => {
            if (element === item.text) {
              parsedAnswers.objectives.push({
                answer: element,
                isCorrect: item.isCorrect
              })
            }
          })
        })

        parsedAnswers.diagnosis = {
          answer: answers.diagnosis,
          isCorrect: answers.diagnosis === res.data.nursing_diagnosis.diagnosis.correctValue
        }
        parsedAnswers.relatedTo = {
          answer: answers.relatedTo,
          isCorrect: answers.relatedTo === res.data.nursing_diagnosis.relatedTo.correctValue
        }
        parsedAnswers.signsAndSymptoms = []
        answers.signsAndSymptoms.forEach((element) => {
          res.data.nursing_diagnosis.signsAndSymptoms.forEach((item) => {
            if (element === item.text) {
              parsedAnswers.signsAndSymptoms.push({
                answer: element,
                isCorrect: item.isCorrect
              })
            }
          })
        })

        parsedAnswers.shortTermGoals = []
        answers.shortTermGoal.forEach((element) => {
          res.data.planning.shortTermGoals.forEach((item) => {
            if (element === item.text) {
              parsedAnswers.shortTermGoals.push({
                answer: element,
                isCorrect: item.isCorrect
              })
            }
          })
        })
        parsedAnswers.longTermGoals = []
        answers.longTermGoal.forEach((element) => {
          res.data.planning.longTermGoals.forEach((item) => {
            if (element === item.text) {
              parsedAnswers.longTermGoals.push({
                answer: element,
                isCorrect: item.isCorrect
              })
            }
          })
        })

        parsedAnswers.independents = []
        answers.independent.forEach((element, eIndex) => {
          let currentLength = parsedAnswers.independents.length
          res.data.nursing_diagnosis.diagnosis.texts[diagnosisIndex].intervention.independents.forEach((item, iIndex) => {
            if (element.split('::')[0] === item.text) {
              if (eIndex === iIndex) {
                parsedAnswers.independents.push({
                  answer: element,
                  isCorrect: item.isCorrect,
                  rationaleCorrect: element.split('::')[1] === item.rationale && item.isCorrect,
                  orderCorrect: true
                })
              } else {
                parsedAnswers.independents.push({
                  answer: element,
                  isCorrect: item.isCorrect,
                  rationaleCorrect: element.split('::')[1] === item.rationale && item.isCorrect,
                  orderCorrect: false
                })
              }
            }
          })

          if (currentLength === parsedAnswers.independents.length) {
            parsedAnswers.independents.push({
              answer: element,
              isCorrect: false,
              rationaleCorrect: false,
              orderCorrect: false
            })
          }
        })

        parsedAnswers.dependents = []
        answers.dependent.forEach((element, eIndex) => {
          let currentLength = parsedAnswers.dependents.length
          res.data.nursing_diagnosis.diagnosis.texts[diagnosisIndex].intervention.dependents.forEach((item, iIndex) => {
            if (element.split('::')[0] === item.text) {
              if (eIndex === iIndex) {
                parsedAnswers.dependents.push({
                  answer: element,
                  isCorrect: item.isCorrect,
                  rationaleCorrect: element.split('::')[1] === item.rationale && item.isCorrect,
                  orderCorrect: true
                })
              } else {
                parsedAnswers.dependents.push({
                  answer: element,
                  isCorrect: item.isCorrect,
                  rationaleCorrect: element.split('::')[1] === item.rationale && item.isCorrect,
                  orderCorrect: false
                })
              }
            }
          })

          if (currentLength === parsedAnswers.dependents.length) {
            parsedAnswers.dependents.push({
              answer: element,
              isCorrect: false,
              rationaleCorrect: false,
              orderCorrect: false
            })
          }
        })

        parsedAnswers.collaboratives = []
        answers.collaborative.forEach((element, eIndex) => {
          let currentLength = parsedAnswers.collaboratives.length
          res.data.nursing_diagnosis.diagnosis.texts[diagnosisIndex].intervention.collaboratives.forEach((item, iIndex) => {
            if (element.split('::')[0] === item.text) {
              if (eIndex === iIndex) {
                parsedAnswers.collaboratives.push({
                  answer: element,
                  isCorrect: item.isCorrect,
                  rationaleCorrect: element.split('::')[1] === item.rationale && item.isCorrect,
                  orderCorrect: true
                })
              } else {
                parsedAnswers.collaboratives.push({
                  answer: element,
                  isCorrect: item.isCorrect,
                  rationaleCorrect: element.split('::')[1] === item.rationale && item.isCorrect,
                  orderCorrect: false
                })
              }
            }
          })

          if (currentLength === parsedAnswers.collaboratives.length) {
            parsedAnswers.collaboratives.push({
              answer: element,
              isCorrect: false,
              rationaleCorrect: false,
              orderCorrect: false
            })
          }
        })

        this.parsedAnswers = parsedAnswers
      })
      .catch((err) => {
        console.log(err)
        if (err.response.status == 401) {
          router.push({ name: 'admin login' })
        } else {
          toastStore.add({
            msg: err.response.data,
            duration: 4000
          })
        }
      })
      .finally(() => (this.isLoading = false))
  },
  name: ''
})
//Answers modal
const modals = ref({
  showAnswersModal: false,
  showAnswersOpen(entryAnswers, name, category, id) {
    answersData.answers = entryAnswers
    answersData.name = name

    answersData.goParse(entryAnswers, category, id)
    this.showAnswersModal = true
  },
  showAnswersClose() {
    setTimeout(() => {
      answersData.answers = null
      answersData.parsedAnswers = null
      answersData.name = null
    }, 150)
    this.showAnswersModal = false
  }
})

//generate pdf
async function beforeGeneratePDF(id, name, category, caseId, timesTaken, dateTaken) {
  await axios({
    method: 'get',
    url: `${import.meta.env.VITE_API_DOMAIN}/history/case-scenario/${id}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('ncpadmin_token')}`,
      Role: 'admin'
    }
  })
    .then((res) => {
      data.value = res.data
      return data.value
    })
    .then((data) => {
      let scores = []

      scores.push(data.score.assessment)
      scores.push(data.score.nursingDiagnosis)
      scores.push(data.score.planning)
      scores.push(data.score.intervention)
      scores.push(data.score.evaluation)
      scores.push(data.score.overall)

      generatePDF(name, category, caseId, timesTaken, new Date(dateTaken).toLocaleString().replace(',', ' -'), scores)
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
}
</script>

<template>
  <div class="w-full">
    <div class="sticky top-[68.5px] flex w-full flex-row items-center gap-6 bg-blue-50 px-4 py-2">
      <h3>Case Scenario History</h3>
      <VFormTextbox v-model="search.text" placeholder="Search for Name or Case ID" class="w-72" />
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
      <tr class="sticky top-[138px] bg-blue-200">
        <th class="w-16">#</th>
        <th class="px-6 py-4 text-start">Name</th>
        <th class="px-6 py-4 text-start">Section</th>
        <th class="px-6 py-4 text-start">Category</th>
        <th class="px-6 py-4 text-start">Case ID</th>
        <th class="px-6 py-4 text-start">Times Taken</th>
        <th class="px-6 py-4 text-start">Date Taken</th>
        <th class="px-6 py-4">Answers</th>
        <th class="px-6 py-4">Nursing Care Plan</th>
      </tr>

      <tr v-if="isLoading">
        <td colspan="9">
          <div class="flex w-full items-center justify-center py-6">
            <VLoader size="40px" thickness="2px" />
          </div>
        </td>
      </tr>

      <tr v-else-if="history.length > 0" v-for="(entry, index) in history" :key="index" class="text-center odd:bg-blue-100">
        <td class="w-16 text-center">{{ index + 1 }}</td>
        <td class="max-w-[200px] truncate px-6 py-1 text-start">{{ entry.name }}</td>
        <td class="px-6 py-1 text-start">{{ entry.section }}</td>
        <td class="px-6 py-1 text-start">{{ entry.category }}</td>
        <td class="px-6 py-1 text-start">{{ entry.caseId }}</td>
        <td class="px-6 py-1 text-start">{{ entry.timesTaken }}</td>
        <td class="px-6 py-1 text-start">{{ new Date(entry.dateTaken).toLocaleString().replace(',', ' -') }}</td>
        <td class="px-6 py-1 text-start">
          <div class="flex h-full w-full flex-row items-center justify-center">
            <VButton
              @click="modals.showAnswersOpen(entry.answers, entry.name, entry.category, entry.caseId)"
              variant="filled"
              start-icon="visibility"
              color="success"
            >
              Show
            </VButton>
          </div>
        </td>
        <td class="px-6 py-1">
          <div class="flex h-full w-full flex-row items-center justify-center">
            <VButton
              @click="beforeGeneratePDF(entry.id, entry.name, entry.category, entry.caseId, entry.timesTaken, entry.dateTaken)"
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
        <td colspan="9">
          <div class="flex w-full items-center justify-center py-6">No entries found</div>
        </td>
      </tr>

      <tr v-show="moreLoading && !isLoading" ref="moreLoadingRef">
        <td colspan="9">
          <div class="flex w-full items-center justify-center py-6">
            <VLoader size="40px" thickness="2px" />
          </div>
        </td>
      </tr>
    </table>

    <!-- Modal for answers -->
    <VModal v-model:go-open="modals.showAnswersModal" :click-outside="false">
      <div class="flex max-h-[calc(100svh-32px)] flex-col overflow-y-auto overflow-x-hidden px-4 pb-4">
        <div class="sticky top-0 z-10 flex flex-row items-center justify-between bg-blue-50 py-4">
          <div>
            <h2 class="leading-none">Answers</h2>
          </div>

          <VIconButton @click="modals.showAnswersClose()" variant="ghost" size="lg" icon="close" />
        </div>

        <div v-if="answersData.answers && !answersData.parsedAnswers" class="relative flex flex-col">
          <!-- assessment -->
          <div>
            <h2>Assessment</h2>
            <div class="flex flex-col gap-2 px-2">
              <div>
                <h3>Subjective</h3>
                <p>{{ answersData.answers.subjective }}</p>
              </div>
              <div>
                <h3>Objectives</h3>
                <ul class="list-disc pl-4">
                  <li v-for="objective in answersData.answers.objective" :key="objective">
                    {{ objective }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr class="my-4" />
          <!-- Nursing Diagnosis -->
          <div>
            <h2>Nursing Diagnosis</h2>
            <div class="px-2">
              <p>
                <span>{{ answersData.answers.diagnosis }}</span>
                related to
                <span>{{ answersData.answers.relatedTo }}</span>
                as evidenced by
                <span v-for="(sas, index) in answersData.answers.signsAndSymptoms" :key="sas">
                  {{ `${sas}${index + 1 < answersData.answers.signsAndSymptoms.length ? ', ' : '.'}` }}
                </span>
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <!--  -->
          <div>
            <h2>Planning</h2>
            <div class="flex flex-col gap-2 px-2">
              <div>
                <h3>Short Term Goals</h3>
                <ul class="list-disc pl-4">
                  <li v-for="goal in answersData.answers.shortTermGoal" :key="goal">
                    {{ goal }}
                  </li>
                </ul>
              </div>
              <div>
                <h3>Long Term Goals</h3>
                <ul class="list-disc pl-4">
                  <li v-for="goal in answersData.answers.longTermGoal" :key="goal">
                    {{ goal }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr class="my-4" />
          <!--  -->
          <div>
            <h2>Interventions and Rationale</h2>
            <div class="flex flex-col gap-4 px-2 pt-2">
              <table class="w-full table-fixed">
                <tr>
                  <th class="border border-black">Independents</th>
                  <th class="border border-black">Rationale</th>
                </tr>

                <tr v-for="independent in answersData.answers.independent" :key="independent">
                  <td class="border border-black p-2">
                    {{ independent.split('::')[0] }}
                  </td>
                  <td class="border border-black p-2">
                    {{ independent.split('::')[0] }}
                  </td>
                </tr>
              </table>

              <table class="w-full table-fixed">
                <tr>
                  <th class="border border-black">Dependents</th>
                  <th class="border border-black">Rationale</th>
                </tr>

                <tr v-for="dependent in answersData.answers.dependent" :key="dependent">
                  <td class="border border-black p-2">
                    {{ dependent.split('::')[0] }}
                  </td>
                  <td class="border border-black p-2">
                    {{ dependent.split('::')[0] }}
                  </td>
                </tr>
              </table>

              <table class="w-full table-fixed">
                <tr>
                  <th class="border border-black">Collaborative</th>
                  <th class="border border-black">Rationale</th>
                </tr>

                <tr v-for="collaborative in answersData.answers.collaborative" :key="collaborative">
                  <td class="border border-black p-2">
                    {{ collaborative.split('::')[0] }}
                  </td>
                  <td class="border border-black p-2">
                    {{ collaborative.split('::')[0] }}
                  </td>
                </tr>
              </table>
            </div>
          </div>

          <VLoader size="40px" thickness="2px" class="fixed right-4 top-[68px]" />
        </div>

        <div v-else-if="answersData.parsedAnswers" class="flex flex-col">
          <!-- assessment -->
          <div>
            <h2>Assessment</h2>
            <div class="flex flex-col gap-2 px-2">
              <div>
                <h3>Subjective</h3>
                <p :class="answersData.parsedAnswers.subjective.isCorrect ? 'text-emerald-400' : 'text-red-400'">
                  {{ answersData.parsedAnswers.subjective.answer }}
                </p>
              </div>
              <div>
                <h3>Objectives</h3>
                <ul class="list-disc pl-4">
                  <li
                    v-for="objective in answersData.parsedAnswers.objectives"
                    :class="objective.isCorrect ? 'text-emerald-400' : 'text-red-400'"
                    :key="objective"
                  >
                    {{ objective.answer }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr class="my-4" />
          <!-- Nursing Diagnosis -->
          <div>
            <h2>Nursing Diagnosis</h2>
            <div class="px-2">
              <p>
                <span :class="answersData.parsedAnswers.diagnosis.isCorrect ? 'text-emerald-400' : 'text-red-400'">
                  {{ answersData.parsedAnswers.diagnosis.answer }}
                </span>
                related to
                <span :class="answersData.parsedAnswers.relatedTo.isCorrect ? 'text-emerald-400' : 'text-red-400'">
                  {{ answersData.parsedAnswers.relatedTo.answer }}
                </span>
                as evidenced by
                <span
                  v-for="(sas, index) in answersData.parsedAnswers.signsAndSymptoms"
                  :key="sas"
                  :class="sas.isCorrect ? 'text-emerald-400' : 'text-red-400'"
                >
                  {{ `${sas.answer}${index + 1 < answersData.parsedAnswers.signsAndSymptoms.length ? ', ' : '.'}` }}
                </span>
              </p>
            </div>
          </div>

          <hr class="my-4" />
          <!--  -->
          <div>
            <h2>Planning</h2>
            <div class="flex flex-col gap-2 px-2">
              <div>
                <h3>Short Term Goals</h3>
                <ul class="list-disc pl-4">
                  <li
                    v-for="goal in answersData.parsedAnswers.shortTermGoals"
                    :key="goal"
                    :class="goal.isCorrect ? 'text-emerald-400' : 'text-red-400'"
                  >
                    {{ goal.answer }}
                  </li>
                </ul>
              </div>
              <div>
                <h3>Long Term Goals</h3>
                <ul class="list-disc pl-4">
                  <li v-for="goal in answersData.parsedAnswers.longTermGoals" :key="goal" :class="goal.isCorrect ? 'text-emerald-400' : 'text-red-400'">
                    {{ goal.answer }}
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr class="my-4" />
          <!--  -->
          <div>
            <h2>Interventions and Rationale</h2>
            <div class="flex flex-col gap-4 px-2 pt-2">
              <table class="w-full table-fixed">
                <tr>
                  <th class="border border-black">Independents</th>
                  <th class="border border-black">Rationale</th>
                </tr>

                <tr v-for="independent in answersData.parsedAnswers.independents" :key="independent">
                  <td :class="['border border-black p-2', independent.isCorrect ? 'text-emerald-400' : 'text-red-400']">
                    {{ independent.orderCorrect ? '' : '*' }} {{ independent.answer.split('::')[0] }}
                  </td>
                  <td :class="['border border-black p-2', independent.rationaleCorrect ? 'text-emerald-400' : 'text-red-400']">
                    {{ independent.answer.split('::')[1] }}
                  </td>
                </tr>
              </table>

              <table class="w-full table-fixed">
                <tr>
                  <th class="border border-black">Dependents</th>
                  <th class="border border-black">Rationale</th>
                </tr>

                <tr v-for="dependent in answersData.parsedAnswers.dependents" :key="dependent">
                  <td :class="['border border-black p-2', dependent.isCorrect ? 'text-emerald-400' : 'text-red-400']">
                    {{ dependent.orderCorrect ? '' : '*' }} {{ dependent.answer.split('::')[0] }}
                  </td>
                  <td :class="['border border-black p-2', dependent.rationaleCorrect ? 'text-emerald-400' : 'text-red-400']">
                    {{ dependent.answer.split('::')[1] }}
                  </td>
                </tr>
              </table>

              <table class="w-full table-fixed">
                <tr>
                  <th class="border border-black">Collaborative</th>
                  <th class="border border-black">Rationale</th>
                </tr>

                <tr v-for="collaborative in answersData.parsedAnswers.collaboratives" :key="collaborative">
                  <td :class="['border border-black p-2', collaborative.isCorrect ? 'text-emerald-400' : 'text-red-400']">
                    {{ collaborative.answer.split('::')[0] }}
                  </td>
                  <td :class="['border border-black p-2', collaborative.rationaleCorrect ? 'text-emerald-400' : 'text-red-400']">
                    {{ collaborative.answer.split('::')[1] }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
      </div>
    </VModal>

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
          {{ `${data.answers.diagnosis} related to ${data.answers.relatedTo} as evidenced by` }}
          <span v-for="(signAndSymptom, index) in data.answers.signsAndSymptoms" :key="index">
            {{ `${signAndSymptom}${index + 1 < data.answers.signsAndSymptoms.length ? ', ' : '.'}` }}
          </span>
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
          Dependent:<br />
          <template v-for="(dependent, index) in data.answers.dependent" :key="index">
            <template v-if="index + 1 !== data.answers.dependent.length"> • {{ dependent.split('::')[0] }} <br /><br /> </template>
            <template v-else> • {{ dependent.split('::')[0] }} <br /> </template>
          </template>

          <br />Independent:<br />
          <template v-for="(independent, index) in data.answers.independent" :key="index">
            <template v-if="index + 1 !== data.answers.independent.length"> • {{ independent.split('::')[0] }} <br /><br /> </template>
            <template v-else> • {{ independent.split('::')[0] }} <br /> </template>
          </template>

          <br />Collaborative:<br />
          <template v-for="(collaborative, index) in data.answers.collaborative" :key="index">
            <template v-if="index + 1 !== data.answers.collaborative.length"> • {{ collaborative.split('::')[0] }} <br /><br /> </template>
            <template v-else> • {{ collaborative.split('::')[0] }} <br /> </template>
          </template>
        </td>
        <td class="border border-black px-4 py-2 text-start align-top">
          Dependent:<br />
          <template v-for="(dependent, index) in data.answers.dependent" :key="index">
            <template v-if="index + 1 !== data.answers.dependent.length"> • {{ dependent.split('::')[1] }} <br /><br /> </template>
            <template v-else> • {{ dependent.split('::')[1] }} <br /> </template>
          </template>

          <br />Independent:<br />
          <template v-for="(independent, index) in data.answers.independent" :key="index">
            <template v-if="index + 1 !== data.answers.independent.length"> • {{ independent.split('::')[1] }} <br /><br /> </template>
            <template v-else> • {{ independent.split('::')[1] }} <br /> </template>
          </template>

          <br />Collaborative:<br />
          <template v-for="(collaborative, index) in data.answers.collaborative" :key="index">
            <template v-if="index + 1 !== data.answers.collaborative.length"> • {{ collaborative.split('::')[1] }} <br /><br /> </template>
            <template v-else> • {{ collaborative.split('::')[1] }} <br /> </template>
          </template>
        </td>
        <td class="border border-black px-4 py-2 text-start align-top">
          Short Term Goal:<br />
          - {{ data.answers.shortTermGoalsDesc }}<br /><br />
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
          - {{ data.answers.longTermGoalsDesc }}<br /><br />
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

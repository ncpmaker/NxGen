<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { toastStore } from '@/store'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

//introduction
const scenario = ref('')
const imageLink = ref('')
const audioLink = ref('')

//assessment
const subjectives = ref({ texts: [{ text: '' }], correctValue: '' })
const objectives = ref([{ text: '', isCorrect: false }])

//nursing diagnosis
const nursingDiagnosis = ref({ texts: [{ text: '' }], correctValue: '' })

//planning
const shortTermGoalsDesc = ref('')
const shortTermGoals = ref([{ text: '', isCorrect: false }])
const longTermGoalsDesc = ref('')
const longTermGoals = ref([{ text: '', isCorrect: false }])

//intervention
const independents = ref([{ text: '', rationale: '', isCorrect: false }])
const dependents = ref([{ text: '', rationale: '', isCorrect: false }])

onMounted(() => {
  axios.get(`http://localhost:3000/case-scenarios/get/${route.params.category}/${route.params.id}`).then((res) => {
    scenario.value = res.data.scenario
    imageLink.value = res.data.image_link
    audioLink.value = res.data.audio_link

    subjectives.value = res.data.assessment.subjectives
    objectives.value = res.data.assessment.objectives

    nursingDiagnosis.value = res.data.nursing_diagnosis

    shortTermGoalsDesc.value = res.data.planning.shortTermGoalsDesc
    shortTermGoals.value = res.data.planning.shortTermGoals

    longTermGoalsDesc.value = res.data.planning.longTermGoalsDesc
    longTermGoals.value = res.data.planning.longTermGoals

    independents.value = res.data.intervention.independents
    dependents.value = res.data.intervention.dependents
  })
})

function addTextbox(section) {
  if (section === 'subjective') {
    subjectives.value.texts.push({ text: '' })
  } else if (section === 'objective') {
    objectives.value.push({ isCorrect: false, text: '' })
  } else if (section === 'nursing diagnosis') {
    nursingDiagnosis.value.texts.push({ text: '' })
  } else if (section === 'short term goal') {
    shortTermGoals.value.push({ isCorrect: false, text: '' })
  } else if (section === 'long term goal') {
    longTermGoals.value.push({ isCorrect: false, text: '' })
  } else if (section === 'independent') {
    independents.value.push({ isCorrect: false, text: '', rationale: '' })
  } else if (section === 'dependent') {
    dependents.value.push({ isCorrect: false, text: '', rationale: '' })
  }
}

function removeTextbox(index, section) {
  if (section === 'subjective') {
    subjectives.value.texts.splice(index, 1)
  } else if (section === 'objective') {
    objectives.value.splice(index, 1)
  } else if (section === 'nursing diagnosis') {
    nursingDiagnosis.value.texts.splice(index, 1)
  } else if (section === 'short term goal') {
    shortTermGoals.value.splice(index, 1)
  } else if (section === 'long term goal') {
    longTermGoals.value.splice(index, 1)
  } else if (section === 'independent') {
    independents.value.splice(index, 1)
  } else if (section === 'dependent') {
    dependents.value.splice(index, 1)
  }
}

function create() {
  axios
    .post('http://localhost:3000/case-scenarios/create', {
      category: route.params.category,
      scenario: scenario.value,
      image_link: imageLink.value,
      audio_link: audioLink.value,
      assessment: {
        subjectives: subjectives.value,
        objectives: objectives.value
      },
      nursing_diagnosis: nursingDiagnosis.value,
      planning: {
        shortTermGoalsDesc: shortTermGoalsDesc.value,
        shortTermGoals: shortTermGoals.value,
        longTermGoalsDesc: longTermGoalsDesc.value,
        longTermGoals: longTermGoals.value
      },
      intervention: {
        independents: independents.value,
        dependents: dependents.value
      }
    })
    .then(() => {
      router.push({ name: 'admin case scenarios', params: { category: 'neuro' } })
      toastStore.add({
        msg: 'Case created.',
        duration: 4000
      })
    })
    .catch((err) => console.log(err))
}

function save() {
  axios
    .put(`http://localhost:3000/case-scenarios/edit/${route.params.category}/${route.params.id}`, {
      category: route.params.category,
      scenario: scenario.value,
      image_link: imageLink.value,
      audio_link: audioLink.value,
      assessment: {
        subjectives: subjectives.value,
        objectives: objectives.value
      },
      nursing_diagnosis: nursingDiagnosis.value,
      planning: {
        shortTermGoalsDesc: shortTermGoalsDesc.value,
        shortTermGoals: shortTermGoals.value,
        longTermGoalsDesc: longTermGoalsDesc.value,
        longTermGoals: longTermGoals.value
      },
      intervention: {
        independents: independents.value,
        dependents: dependents.value
      }
    })
    .then(() => {
      toastStore.add({
        msg: 'Case updated.',
        duration: 4000
      })
    })

  console.log(subjectives.value)
}
</script>

<template>
  <VIconButton @click="$router.go(-1)" icon="arrow_back" variant="ghost" size="lg" class="!absolute left-52 top-[88px]" />
  <div class="pt-4 text-center">
    <h1>{{ $route.params.category.charAt(0).toUpperCase() + $route.params.category.slice(1) }} - Case Scenario {{ $route.params.number }}</h1>
  </div>

  <div class="flex flex-col gap-6 px-64 pb-32">
    <div>
      <h2 class="sticky top-[61px] z-10 bg-blue-50 pt-4">Scenario Section</h2>
      <hr class="m-2 border-neutral-300" />
      <VFormTextbox v-model="scenario" textarea label="Scenario *" placeholder="Put any scenario description here" />
      <VFormTextbox v-model="imageLink" label="Image Link" placeholder="URL" />
      <VFormTextbox v-model="audioLink" label="Audio Link" placeholder="URL" />
    </div>

    <div>
      <h2 class="sticky top-[61px] z-10 bg-blue-50 pt-4">Assessment Section</h2>
      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Subjectives *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-2">
          <div v-for="(choice, index) in subjectives.texts" :key="index" class="flex w-full flex-row items-center gap-2">
            <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Choice ' + (index + 1)" />

            <label class="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-400/20">
              <input v-model="subjectives.correctValue" :value="choice.text" name="subjective" type="radio" class="cursor-pointer" />
            </label>

            <VIconButton
              @click.prevent="removeTextbox(index, 'subjective')"
              :disabled="subjectives.texts.length <= 1"
              variant="ghost"
              color="error"
              size="lg"
              icon="close"
            />
          </div>

          <VIconButton @click.prevent="addTextbox('subjective')" variant="ghost" icon="add" size="lg" />
        </div>
      </div>

      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Objectives *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-2">
          <div v-for="(choice, index) in objectives" :key="index" class="flex w-full flex-row items-center gap-2">
            <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Choice ' + (index + 1)" />

            <label class="flex cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-400/20">
              <input v-model="choice.isCorrect" :value="choice.isCorrect" type="checkbox" name="subjective" class="cursor-pointer" />
            </label>

            <VIconButton
              @click.prevent="removeTextbox(index, 'objective')"
              :disabled="objectives.length <= 1"
              variant="ghost"
              color="error"
              size="lg"
              icon="close"
            />
          </div>

          <VIconButton @click.prevent="addTextbox('objective')" variant="ghost" icon="add" size="lg" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="sticky top-[61px] z-10 bg-blue-50 pt-4">Nursing Diagnosis Section</h2>
      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Diagnoses *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-2">
          <div v-for="(choice, index) in nursingDiagnosis.texts" :key="index" class="flex w-full flex-row items-center gap-2">
            <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Choice ' + (index + 1)" />

            <label class="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-400/20">
              <input v-model="nursingDiagnosis.correctValue" :value="choice.text" name="nursing_diagnosis" type="radio" class="cursor-pointer" />
            </label>

            <VIconButton
              @click.prevent="removeTextbox(index, 'nursing diagnosis')"
              :disabled="nursingDiagnosis.texts.length <= 1"
              variant="ghost"
              color="error"
              size="lg"
              icon="close"
            />
          </div>

          <VIconButton @click.prevent="addTextbox('nursing diagnosis')" variant="ghost" icon="add" size="lg" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="sticky top-[61px] z-10 bg-blue-50 pt-4">Planning Section</h2>
      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <VFormTextbox
          v-model="shortTermGoalsDesc"
          label="Short Term Goal Description *"
          type="text"
          class="w-full"
          placeholder="Ex. Within 3 days of nursing interventions, the client will be able to"
        />

        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Short Term Goals *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-2">
          <div v-for="(choice, index) in shortTermGoals" :key="index" class="flex w-full flex-row items-center gap-2">
            <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Goal ' + (index + 1)" />

            <label class="flex cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-400/20">
              <input v-model="choice.isCorrect" :value="choice.isCorrect" type="checkbox" name="short_term_goals" class="cursor-pointer" />
            </label>

            <VIconButton
              @click.prevent="removeTextbox(index, 'short term goal')"
              :disabled="shortTermGoals.length <= 1"
              variant="ghost"
              color="error"
              size="lg"
              icon="close"
            />
          </div>

          <VIconButton @click.prevent="addTextbox('short term goal')" variant="ghost" icon="add" size="lg" />
        </div>
      </div>

      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <VFormTextbox
          v-model="longTermGoalsDesc"
          label="Long Term Goal Description *"
          type="text"
          class="w-full"
          placeholder="Ex. Within 1 week of nursing interventions, the client will be able to"
        />

        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Long Term Goals *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div v-for="(choice, index) in longTermGoals" :key="index" class="flex w-full flex-row items-center gap-2">
          <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Goal ' + (index + 1)" />

          <label class="flex cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-400/20">
            <input v-model="choice.isCorrect" :value="choice.isCorrect" type="checkbox" name="long_term_goals" class="cursor-pointer" />
          </label>

          <VIconButton
            @click.prevent="removeTextbox(index, 'long term goal')"
            :disabled="longTermGoals.length <= 1"
            variant="ghost"
            color="error"
            size="lg"
            icon="close"
          />
        </div>

        <VIconButton @click.prevent="addTextbox('long term goal')" variant="ghost" icon="add" size="lg" />
      </div>
    </div>

    <div>
      <h2 class="sticky top-[61px] z-10 bg-blue-50 pt-4">Invervention and Rationale Section</h2>
      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Independents *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-4">
          <div v-for="(choice, index) in independents" :key="index" class="flex w-full flex-row items-center gap-2">
            <div class="flex w-full flex-col gap-2">
              <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Choice ' + (index + 1)" />
              <VTextbox v-model="choice.rationale" type="text" class="w-full" :placeholder="'Rationale ' + (index + 1)" />
            </div>

            <label class="flex cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-400/20">
              <input v-model="choice.isCorrect" :value="choice.isCorrect" type="checkbox" name="independents" class="cursor-pointer" />
            </label>

            <VIconButton
              @click.prevent="removeTextbox(index, 'independent')"
              :disabled="independents.length <= 1"
              variant="ghost"
              color="error"
              size="lg"
              icon="close"
            />
          </div>
        </div>

        <VIconButton @click.prevent="addTextbox('independent')" variant="ghost" icon="add" size="lg" />
      </div>

      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Dependents *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-4">
          <div v-for="(choice, index) in dependents" :key="index" class="flex w-full flex-row items-center gap-2">
            <div class="flex w-full flex-col gap-2">
              <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Choice ' + (index + 1)" />
              <VTextbox v-model="choice.rationale" type="text" class="w-full" :placeholder="'Rationale ' + (index + 1)" />
            </div>

            <label class="flex cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-400/20">
              <input v-model="choice.isCorrect" :value="choice.isCorrect" type="checkbox" name="dependents" class="cursor-pointer" />
            </label>

            <VIconButton
              @click.prevent="removeTextbox(index, 'dependent')"
              :disabled="dependents.length <= 1"
              variant="ghost"
              color="error"
              size="lg"
              icon="close"
            />
          </div>
        </div>
        <VIconButton @click.prevent="addTextbox('dependent')" variant="ghost" icon="add" size="lg" />
      </div>
    </div>
  </div>

  <VButton v-if="$route.name === 'admin create case'" @click="create()" size="lg" class="fixed bottom-10 right-16">
    <span class="material-icons"> add </span>
    Create
  </VButton>

  <VButton v-else @click="save()" size="lg" class="fixed bottom-10 right-16">
    <span class="material-icons"> save </span>
    Save
  </VButton>
</template>

<style scoped></style>

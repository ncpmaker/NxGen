<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toastStore } from '@/store'

const router = useRouter()

const subjectives = ref([{ id: 0, text: '', isCorrect: 0 }])
const objectives = ref([{ id: 0, text: '', isCorrect: false }])
const nursingDiagnosis = ref([{ id: 0, text: '', isCorrect: false }])
const shortTermGoals = ref([{ id: 0, text: '', isCorrect: false }])
const longTermGoals = ref([{ id: 0, text: '', isCorrect: false }])
const independents = ref([{ id: 0, text: '', rationale: '', isCorrect: false }])
const dependents = ref([{ id: 0, text: '', rationale: '', isCorrect: false }])

function addTextbox(step, section) {
  if (section === 'subjective') {
    subjectives.value.push({ id: subjectives.value.length, step: step, isCorrect: subjectives.value.length, text: '' })
  } else if (section === 'objective') {
    objectives.value.push({ id: objectives.value.length, step: step, isCorrect: objectives.value.length, text: '' })
  } else if (section === 'nursing diagnosis') {
    nursingDiagnosis.value.push({ id: nursingDiagnosis.value.length, step: step, isCorrect: nursingDiagnosis.value.length, text: '' })
  } else if (section === 'short term goal') {
    shortTermGoals.value.push({ id: shortTermGoals.value.length, step: step, isCorrect: shortTermGoals.value.length, text: '' })
  } else if (section === 'long term goal') {
    longTermGoals.value.push({ id: longTermGoals.value.length, step: step, isCorrect: longTermGoals.value.length, text: '' })
  } else if (section === 'independent') {
    independents.value.push({ id: independents.value.length, step: step, isCorrect: independents.value.length, text: '', rationale: '' })
  } else if (section === 'dependent') {
    dependents.value.push({ id: dependents.value.length, step: step, isCorrect: dependents.value.length, text: '', rationale: '' })
  }
}

function removeTextbox(index, section) {
  if (section === 'subjective') {
    subjectives.value.splice(index, 1)
  } else if (section === 'objective') {
    objectives.value.splice(index, 1)
  } else if (section === 'nursing diagnosis') {
    nursingDiagnosis.value.splice(index, 1)
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
  toastStore.add({
    msg: 'Case created.',
    duration: 4000
  })
  router.push({ name: 'admin case scenarios', params: { category: 'neuro' } })
}

function save() {
  toastStore.add({
    msg: 'Case saved.',
    duration: 4000
  })
  router.push({ name: 'admin case scenarios', params: { category: 'neuro' } })
}
</script>

<template>
  <div class="pt-4 text-center">
    <h1>Case Scenario {{ $route.params.id }}</h1>
  </div>

  <div class="flex flex-col gap-6 px-64 pb-32">
    <div>
      <h2 class="sticky top-[65px] bg-blue-50 pt-4">Scenario Section</h2>
      <hr class="m-2 border-neutral-300" />
      <VFormTextbox textarea label="Scenario *" placeholder="Put any scenario description here" />
      <VFormTextbox label="Image Link" placeholder="URL" />
      <VFormTextbox label="Audio Link" placeholder="URL" />
    </div>

    <div>
      <h2 class="sticky top-[65px] bg-blue-50 pt-4">Assessment Section</h2>
      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Subjectives *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-2">
          <div v-for="(choice, index) in subjectives" :key="choice.id" class="flex w-full flex-row items-center gap-2">
            <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Choice ' + (index + 1)" />

            <label class="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-400/20">
              <input v-model="choice.isCorrect" :value="choice.isCorrect" name="subjective" type="radio" class="cursor-pointer" />
            </label>

            <VIconButton
              @click.prevent="removeTextbox(index, 'subjective')"
              :disabled="subjectives.length <= 1"
              variant="ghost"
              color="error"
              size="lg"
              icon="close"
            />
          </div>

          <VIconButton @click.prevent="addTextbox('assessment', 'subjective')" variant="ghost" icon="add" size="lg" />
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
          <div v-for="(choice, index) in objectives" :key="choice.id" class="flex w-full flex-row items-center gap-2">
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

          <VIconButton @click.prevent="addTextbox('assessment', 'objective')" variant="ghost" icon="add" size="lg" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="sticky top-[65px] bg-blue-50 pt-4">Nursing Diagnosis Section</h2>
      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Diagnoses *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-2">
          <div v-for="(choice, index) in nursingDiagnosis" :key="choice.id" class="flex w-full flex-row items-center gap-2">
            <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Choice ' + (index + 1)" />

            <label class="flex h-fit w-fit cursor-pointer items-center justify-center rounded-full p-4 hover:bg-neutral-400/20">
              <input v-model="choice.isCorrect" :value="choice.isCorrect" name="nursing_diagnosis" type="radio" class="cursor-pointer" />
            </label>

            <VIconButton
              @click.prevent="removeTextbox(index, 'nursing diagnosis')"
              :disabled="nursingDiagnosis.length <= 1"
              variant="ghost"
              color="error"
              size="lg"
              icon="close"
            />
          </div>

          <VIconButton @click.prevent="addTextbox('nursing diagnosis', 'nursing diagnosis')" variant="ghost" icon="add" size="lg" />
        </div>
      </div>
    </div>

    <div>
      <h2 class="sticky top-[65px] bg-blue-50 pt-4">Planning Section</h2>
      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <VFormTextbox
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
          <div v-for="(choice, index) in shortTermGoals" :key="choice.id" class="flex w-full flex-row items-center gap-2">
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

          <VIconButton @click.prevent="addTextbox('planning', 'short term goal')" variant="ghost" icon="add" size="lg" />
        </div>
      </div>

      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <VFormTextbox
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

        <div v-for="(choice, index) in longTermGoals" :key="choice.id" class="flex w-full flex-row items-center gap-2">
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

        <VIconButton @click.prevent="addTextbox('planning', 'long term goal')" variant="ghost" icon="add" size="lg" />
      </div>
    </div>

    <div>
      <h2 class="sticky top-[65px] bg-blue-50 pt-4">Implementation and Rationale Section</h2>
      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Independents *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-4">
          <div v-for="(choice, index) in independents" :key="choice.id" class="flex w-full flex-row items-center gap-2">
            <div class="flex w-full flex-col gap-2">
              <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Choice ' + (index + 1)" />
              <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Rationale ' + (index + 1)" />
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

          <VIconButton @click.prevent="addTextbox('implementation', 'independent')" variant="ghost" icon="add" size="lg" />
        </div>
      </div>

      <hr class="m-2 border-neutral-300" />
      <div class="flex flex-col items-center gap-1">
        <div class="flex w-full flex-row items-center place-self-start text-sm text-neutral-600 lg:text-base">
          <span class="grow">Dependents *</span>
          <span class="">Correct</span>
          <span class="basis-[32px]"></span>
        </div>

        <div class="flex w-full flex-col items-center gap-2">
          <div v-for="(choice, index) in dependents" :key="choice.id" class="flex w-full flex-row items-center gap-2">
            <div class="flex w-full flex-col gap-2">
              <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Choice ' + (index + 1)" />
              <VTextbox v-model="choice.text" type="text" class="w-full" :placeholder="'Rationale ' + (index + 1)" />
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

          <VIconButton @click.prevent="addTextbox('implementation', 'dependent')" variant="ghost" icon="add" size="lg" />
        </div>
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

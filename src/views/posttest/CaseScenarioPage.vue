<script setup>
import { reactive, computed, ref } from 'vue'

const stepLabel = ['Assessment', 'Nursing Diagnosis', 'Planning', 'Implementation']

const step = reactive({
  count: 1,
  percent: computed(() => {
    return (step.count / 5) * 100 + '%'
  })
})

const scrollableDiv = ref(null)
const scenarioRef = ref(null)

function nextStep() {
  let headerHeight = 76
  let bottomEdge = scenarioRef.value.getBoundingClientRect().bottom + scrollableDiv.value.scrollTop - headerHeight

  scrollableDiv.value.scrollTo(0, bottomEdge)
  step.count++
}
</script>

<template>
  <div class="flex h-[100svh] flex-col">
    <!-- case body -->
    <div class="grow overflow-y-auto scroll-smooth px-4 pb-4" ref="scrollableDiv">
      <div class="sticky top-0 z-10 bg-blue-50 pb-4 pt-6">
        <h1>Case Scenario {{ $route.params.id }}</h1>
      </div>

      <div
        class="h-56 w-full shrink-0 rounded-2xl bg-[url('https://marketplace.canva.com/EAFOtK0VoYQ/1/0/1600w/canva-brown-simple-aesthetic-desktop-wallpaper-kf83cZpRSuM.jpg')] bg-cover"
      ></div>

      <!-- scenario -->
      <div class="flex flex-col items-center gap-1 pt-4" ref="scenarioRef">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed pretium ut arcu at dignissim. Donec aliquam elementum ex, et tincidunt mauris
          placerat semper. Fusce in tellus purus. Nullam cursus, mauris non ornare maximus, nibh odio volutpat nulla, nec fringilla metus sem sed massa.
          Sed orci tellus, efficitur ut ante vel, laoreet dignissim ex. Phasellus convallis sapien vitae libero bibendum rutrum. Quisque convallis
          condimentum augue, quis volutpat magna sodales non. Mauris malesuada ultricies nibh nec sagittis. Proin semper, libero non laoreet
          ullamcorper, sem dui dignissim eros, a dignissim neque libero efficitur nulla. Donec lacinia, nisi ac egestas tempus, ipsum augue semper
          risus, vel pharetra elit justo id neque. Aliquam rhoncus lorem ex.
        </p>
        <div>
          <span class="text-sm text-neutral-600">Audio description here:</span>
          <audio controls class="block w-screen max-w-[320px]">
            <source />
          </audio>
        </div>
      </div>

      <hr class="mx-2 my-2 border-neutral-300" />

      <!-- subjective  -->
      <div v-if="step.count === 1">
        <h3 class="pb-2 font-medium">Subjective</h3>
        <div class="flex flex-col gap-1">
          <label v-for="x in 4" :key="x" class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
            <input type="radio" name="subjective" id="" />
            Put answers here blah blah blah hambrrrrrrrt asdjakjdjkasdh askjdhajkshdkashdk akshd kajshdjkashd
          </label>
        </div>

        <h3 class="pb-2 font-medium">Objective</h3>
        <div class="flex flex-col gap-1">
          <label v-for="x in 4" :key="x" class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
            <input type="checkbox" name="" id="" />
            Put answers here blah blah blah hambrrrrrrrt asdjakjdjkasdh askjdhajkshdkashdk akshd kajshdjkashd
          </label>
        </div>
      </div>

      <div v-else-if="step.count === 2">
        <h3 class="pb-2 font-medium">Choices</h3>
        <div class="flex flex-col gap-1">
          <label v-for="x in 4" :key="x" class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
            <input type="radio" name="subjective" id="" />
            Put answers here blah blah blah hambrrrrrrrt asdjakjdjkasdh askjdhajkshdkashdk akshd kajshdjkashd
          </label>
        </div>
      </div>

      <div v-else-if="step.count === 3">
        <h3 class="pb-2 font-medium">Short Term Goal</h3>
        <p class="font-medium">Within 3 days of nursing interventions, the client will:</p>
        <div class="flex flex-col gap-1">
          <label v-for="x in 4" :key="x" class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
            <input type="checkbox" name="" id="" />
            Put answers here blah blah blah hambrrrrrrrt asdjakjdjkasdh askjdhajkshdkashdk akshd kajshdjkashd
          </label>
        </div>

        <h3 class="pb-2 font-medium">Long Term Goal</h3>
        <p class="font-medium">Within 1 week of nursing interventions, the client will:</p>
        <div class="flex flex-col gap-1">
          <label v-for="x in 4" :key="x" class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
            <input type="checkbox" name="" id="" />
            Put answers here blah blah blah hambrrrrrrrt asdjakjdjkasdh askjdhajkshdkashdk akshd kajshdjkashd
          </label>
        </div>
      </div>

      <div v-else-if="step.count === 4">
        <h3 class="pb-2 font-medium">Independent</h3>
        <div class="flex flex-col gap-1">
          <label v-for="x in 4" :key="x" class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
            <input type="checkbox" name="" id="" />
            Put answers here blah blah blah hambrrrrrrrt asdjakjdjkasdh <br />
            (Rationale here blah blah)
          </label>
        </div>

        <h3 class="pb-2 font-medium">Dependent</h3>
        <div class="flex flex-col gap-1">
          <label v-for="x in 4" :key="x" class="flex flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
            <input type="checkbox" name="" id="" />
            Put answers here blah blah blah hambrrrrrrrt asdjakjdjkasdh <br />
            (Rationale here blah blah)
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

        <VButton v-if="step.count < 4" @click="nextStep()" color="warning">
          <div class="flex flex-row items-center">
            <span>Next</span>
            <span class="material-icons"> chevron_right </span>
          </div>
        </VButton>

        <VButton v-else @click="$router.push({ name: 'evaluation', params: { id: '1' } })" color="warning">
          <div class="flex flex-row items-center">
            <span>Finish</span>
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

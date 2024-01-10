<script setup>
import { reactive } from 'vue'

const introSteps = reactive({
  preTest: true,
  goToHomePage: true
})

const modals = reactive({
  welcomeModal: false,
  welcomeToggle() {
    this.welcomeModal = !this.welcomeModal
  },
  closeWelcomeToggle() {
    this.welcomeModal = !this.welcomeModal
    introSteps.preTest = false
    introSteps.goToHomePage = false
  },
  preTestModal: false,
  preTestToggle() {
    this.preTestModal = !this.preTestModal
  },
  postIntroModal: false,
  postIntroToggle() {
    this.postIntroModal = !this.postIntroModal
  }
})
</script>

<template>
  <div class="flex h-[100svh] w-full items-center justify-center px-4">
    <div class="flex w-full flex-col items-center justify-center gap-4 sm:w-3/4">
      <h1 class="place-self-start">Introduction</h1>
      <VIntroButton @click="modals.welcomeToggle()" title="Intro to TakeCare" desc="A video tutorial on how to use this app" :step="1" />
      <VIntroButton
        @click="$router.push({ name: 'pre-test' })"
        :disabled="introSteps.preTest"
        title="Pre-test"
        desc="A test to take your initial scores"
        :step="2"
      />
    </div>
  </div>

  <VModal v-model:go-open="modals.welcomeModal" :click-outside="false">
    <div class="flex flex-col gap-2 p-4">
      <div class="relative w-full overflow-hidden rounded-2xl pt-[56.25%]">
        <iframe
          src="https://drive.google.com/file/d/1SCeWcte7wUk9IQbwmlBVMzVgLqtjd0HL/preview"
          class="absolute left-0 top-0 h-full w-full"
          allowfullscreen
        ></iframe>
      </div>

      <VButton @click="modals.closeWelcomeToggle()" class="justify-center">Close</VButton>
    </div>
  </VModal>
</template>

<style scoped></style>

<script setup>
import { reactive } from 'vue'

const modals = reactive({
  welcomeModal: false,
  welcomeToggle() {
    this.welcomeModal = !this.welcomeModal
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
  <div class="flex h-[100svh] w-screen flex-col items-center justify-center gap-4 px-4">
    <VIntroButton @click="modals.welcomeToggle()" title="Intro to app_name" desc="A video tutorial on how to use this app" />
    <VIntroButton disabled title="Pre-test" desc="A test to take your initial scores" />
    <VIntroButton
      @click="modals.postIntroToggle()"
      disabled
      title="Instructions before Post-test"
      desc="A video explaining on what to do on taking the post-test"
    />

    <VButton @click="$router.push({ name: 'home' })" disabled class="w-full max-w-[400px] justify-center">
      <div class="flex flex-row items-center gap-1">
        <span>Next</span>
        <span class="material-icons"> chevron_right </span>
      </div>
    </VButton>
  </div>

  <VModal v-model:go-open="modals.welcomeModal" :click-outside="false">
    <div class="flex flex-col gap-2">
      <span>Video Introduction here</span>

      <VButton @click="modals.welcomeToggle()" class="justify-center">Close</VButton>
    </div>
  </VModal>

  <VModal v-model:go-open="modals.postIntroModal" :click-outside="false">
    <div class="flex flex-col gap-2">
      <span>Video Post Introduction here</span>

      <VButton @click="modals.postIntroToggle()" class="justify-center">Close</VButton>
    </div>
  </VModal>
</template>

<style scoped></style>

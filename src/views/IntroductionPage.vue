<script setup>
import { onMounted, reactive, ref } from 'vue'

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

const userId = ref(null)

onMounted(() => {
  userId.value = localStorage.getItem('ncp_user_id')
})
</script>

<template>
  <div class="flex h-[100svh] w-screen flex-col items-center justify-center gap-4 px-4">
    <VIntroButton @click="modals.welcomeToggle()" title="Intro to app_name" desc="A video tutorial on how to use this app" />
    <VIntroButton
      @click="$router.push({ name: 'case scenario', params: { id: 1 } })"
      :disabled="introSteps.preTest"
      title="Pre-test"
      desc="A test to take your initial scores"
    />

    <VButton
      @click="$router.push({ name: 'home', params: { userId: userId } })"
      :disabled="introSteps.goToHomePage"
      class="w-full max-w-[400px] justify-center"
    >
      <div class="flex flex-row items-center gap-1">
        <span>Next</span>
        <span class="material-icons"> chevron_right </span>
      </div>
    </VButton>
  </div>

  <VModal v-model:go-open="modals.welcomeModal" :click-outside="false">
    <div class="flex flex-col gap-2">
      <span>Video Introduction here</span>

      <VButton @click="modals.closeWelcomeToggle()" class="justify-center">Close</VButton>
    </div>
  </VModal>
</template>

<style scoped></style>

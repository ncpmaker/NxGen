<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { studentTabStore, toastStore } from '@/store'
import axios from 'axios'

const userId = localStorage.getItem('ncp_user_id')
const router = useRouter()
const modals = ref({
  profileModal: false,
  profileToggle() {
    this.profileModal = !this.profileModal
  },
  postTestModal: !JSON.parse(localStorage.getItem('ncp_finished_intro')),
  async postTestToggle() {
    this.postTestModal = !this.postTestModal

    toastStore.add({
      msg: 'Updating information...',
      duration: 2000
    })

    await axios
      .put(`${import.meta.env.VITE_API_DOMAIN}/user/update/${userId}`, {
        finished_intro: true
      })
      .then(() => {
        localStorage.setItem('ncp_finished_intro', true)
        toastStore.add({
          msg: 'Successfully updated.',
          duration: 4000
        })
      })
      .catch(() => {
        toastStore.add({
          msg: 'Update failed',
          duration: 4000
        })
      })
  }
})

const isLoggingOut = ref(false)
function logout() {
  isLoggingOut.value = true
  axios
    .delete(`${import.meta.env.VITE_API_DOMAIN}/user/logout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ncp_token')}`
      }
    })
    .then(() => {
      localStorage.removeItem('ncp_user_id')
      localStorage.removeItem('ncp_user_section')
      localStorage.removeItem('ncp_token')
      localStorage.removeItem('ncp_finished_pre_test')
      localStorage.removeItem('ncp_finished_post_test')
      localStorage.removeItem('ncp_pre_test_session')
      localStorage.removeItem('ncp_post_test_session')
      localStorage.removeItem('ncp_case_scenario_category')
      localStorage.removeItem('ncp_case_scenario_number')
      localStorage.removeItem('ncp_case_scenario_id')
      localStorage.removeItem('ncp_case_scenario_session')
      localStorage.removeItem('ncp_case_scenario_step')
      localStorage.removeItem('ncp_case_scenario_answers')
      router.push({ name: 'login' })
      studentTabStore.set(0)

      toastStore.add({
        msg: 'Logged out successfully.',
        duration: 4000
      })
    })
    .catch((err) => console.log(err))
}

const isDeleting = ref(false)
const deleteDialog = ref({
  state: false,
  toggle() {
    this.state = !this.state
  },
  confirm() {
    isDeleting.value = true
    this.toggle()

    axios
      .delete(`${import.meta.env.VITE_API_DOMAIN}/user/delete/${userId}`)
      .then(() => {
        localStorage.removeItem('ncp_user_id')
        localStorage.removeItem('ncp_user_section')
        localStorage.removeItem('ncp_token')
        localStorage.removeItem('ncp_finished_pre_test')
        localStorage.removeItem('ncp_finished_post_test')
        localStorage.removeItem('ncp_pre_test_session')
        localStorage.removeItem('ncp_post_test_session')
        localStorage.removeItem('ncp_case_scenario_category')
        localStorage.removeItem('ncp_case_scenario_number')
        localStorage.removeItem('ncp_case_scenario_id')
        localStorage.removeItem('ncp_case_scenario_session')
        localStorage.removeItem('ncp_case_scenario_step')
        localStorage.removeItem('ncp_case_scenario_answers')
        router.push({ name: 'login' })
        studentTabStore.set(0)

        toastStore.add({
          msg: 'Account deleted successfully',
          duration: 4000
        })
      })
      .catch((err) => {
        isLoggingOut.value = false
        isDeleting.value = false
        console.log(err)
      })
  }
})
</script>

<template>
  <div class="flex h-[100svh] flex-col">
    <div class="flex grow flex-col overflow-y-scroll">
      <div class="sticky top-0 flex flex-row items-center justify-between bg-blue-50/70 px-4 pb-4 pt-6 backdrop-blur-xl">
        <h1>App Name</h1>

        <VIconButton @click="modals.profileToggle()" variant="ghost" size="lg" icon="settings" />
      </div>

      <!-- content slot -->
      <slot />
    </div>

    <div class="flex w-full shrink-0 flex-row items-center justify-between overflow-hidden border-t bg-blue-50 px-3 font-medium">
      <div class="mt-0 flex w-full flex-row items-center justify-around gap-4">
        <button @click="studentTabStore.set(0)" :class="[studentTabStore.index === 0 ? 'active' : '']" class="nav-points">
          <span class="material-icons-round"> space_dashboard </span>
          <span>Dashboard</span>
        </button>
        <button @click="studentTabStore.set(1)" :class="[studentTabStore.index === 1 ? 'active' : '']" class="nav-points">
          <span class="material-icons"> view_stream </span>
          <span>Cases</span>
        </button>
        <button @click="studentTabStore.set(2)" :class="[studentTabStore.index === 2 ? 'active' : '']" class="nav-points">
          <span class="material-icons"> history </span>
          <span>Case History</span>
        </button>
      </div>
    </div>
  </div>

  <VModal v-model:go-open="modals.postTestModal" :click-outside="false">
    <div class="flex flex-col gap-2 p-4">
      <div class="relative w-full overflow-hidden rounded-2xl pt-[56.25%]">
        <video class="absolute left-0 top-0 h-full w-full" controls>
          <source
            src="https://www.dropbox.com/scl/fi/ilr9358x8bgmo65usni4h/Mobile-App-Presentation-_-Video-Template.mp4?rlkey=ddsds9sbx2w970vpz7c3g7nk2&raw=1"
            type="video/mp4"
          />
          Your browser does not support HTML video.
        </video>
      </div>

      <VButton @click="modals.postTestToggle()" class="justify-center">Close</VButton>
    </div>
  </VModal>

  <VModal v-model:go-open="modals.profileModal" :click-outside="false">
    <div class="flex flex-col gap-2 p-4">
      <div class="flex flex-row items-center justify-between">
        <h2>Settings</h2>
        <VIconButton @click="modals.profileToggle()" variant="ghost" size="lg" icon="close" />
      </div>

      <VButton @click="logout()" :disabled="isLoggingOut" color="warning" class="justify-center">
        <VLoader v-if="isLoggingOut" size="16px" thickness="2px" />
        <span v-else>Logout</span>
      </VButton>
      <VButton @click="deleteDialog.toggle()" :disabled="isDeleting" color="error" class="justify-center">
        <VLoader v-if="isDeleting" size="16px" thickness="2px" />
        <span v-else>Delete Account</span>
      </VButton>
      <p class="flex flex-row items-center gap-1 text-sm text-neutral-500">
        <span class="material-icons-round text-[16px]"> warning </span>
        This will delete all of the data related to you including your test and case scenario histories
      </p>
    </div>
  </VModal>

  <VDialog
    v-model:go-open="deleteDialog.state"
    header="Account Deletion"
    body="Do you really want to delete your account?"
    cancel-label="No"
    confirm-label="Yes"
    @confirm="deleteDialog.confirm()"
  />
</template>

<style scoped>
.nav-points {
  @apply flex w-full flex-col items-center whitespace-nowrap py-2 text-[0.75rem] text-sm text-neutral-950/50 transition-colors md:flex-row md:justify-center md:gap-2 md:py-4 md:text-base;
}

.nav-points.active {
  @apply text-blue-400;
}
</style>

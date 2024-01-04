<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { studentTabStore, toastStore } from '@/store'
import axios from 'axios'

const router = useRouter()
const modals = reactive({
  profileModal: false,
  profileToggle() {
    this.profileModal = !this.profileModal
  }
})

function logout() {
  axios
    .delete('http://localhost:3000/user/logout', {
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
</script>

<template>
  <div class="flex h-[100svh] flex-col">
    <!-- content slot -->
    <slot />

    <!-- the sidebar wrapper -->
    <div class="flex shrink-0 flex-row items-center justify-between overflow-hidden overflow-x-hidden border-t border-t-neutral-200 p-3 font-medium">
      <div class="flex w-full flex-row items-center justify-around">
        <div class="mt-0 flex w-full flex-row items-center justify-around gap-4">
          <button @click="studentTabStore.set(0)" :class="[studentTabStore.index === 0 ? 'active' : '']" class="nav-points">
            <span class="material-icons"> task </span>
            <span>Post Test</span>
          </button>
          <button @click="studentTabStore.set(1)" :class="[studentTabStore.index === 1 ? 'active' : '']" class="nav-points">
            <span class="material-icons"> category </span>
            <span>Cases</span>
          </button>
          <button @click="studentTabStore.set(2)" :class="[studentTabStore.index === 2 ? 'active' : '']" class="nav-points">
            <span class="material-icons"> timeline </span>
            <span>Case History</span>
          </button>
          <button @click="modals.profileToggle()" class="nav-points">
            <div class="flex h-8 w-8 items-center justify-center rounded-full bg-blue-400">UA</div>
            <span>Profile</span>
          </button>
        </div>
      </div>
    </div>
  </div>

  <VModal v-model:go-open="modals.profileModal">
    <div class="flex flex-col gap-2 p-4">
      <h2>Profile Settings</h2>

      <VButton color="primary" size="sm" class="justify-center">Terms and Conditions</VButton>
      <VButton color="error" size="sm" class="justify-center">Delete Account</VButton>
      <VButton @click="logout()" color="warning" size="sm" class="justify-center">Logout</VButton>
    </div>
  </VModal>
</template>

<style scoped>
.nav-points {
  @apply flex w-full flex-col items-center gap-1 text-[0.75rem] text-sm font-semibold text-blue-900;
}

.nav-points > .material-icons {
  @apply w-8 rounded-full p-1 transition-all;
}

.nav-points > div {
  @apply border border-blue-400 transition-all hover:border-blue-900;
}

.nav-points.active > .material-icons {
  @apply !w-16 !bg-blue-400;
}

.nav-points:focus > div {
  @apply !border-blue-900;
}

.nav-points:hover > .material-icons {
  @apply w-16 bg-blue-400/25;
}

.nav-points:disabled {
  @apply opacity-60;
}

.nav-points:hover:disabled > .material-icons {
  @apply w-8 bg-transparent;
}
</style>

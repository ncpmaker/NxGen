<script setup>
import { onMounted, ref } from 'vue'
import { adminTabStore, toastStore, scrollStore } from '@/store'
import { useRouter } from 'vue-router'
import axios from 'axios'

//others
const router = useRouter()

const modals = ref({
  settingsModal: false,
  settingsToggle() {
    this.settingsModal = !this.settingsModal
  }
})

//home
function goHome() {
  adminTabStore.set(0)
  router.push({ name: 'admin dashboard' })
}

//logout
const isLoggingOut = ref(false)

function logout() {
  isLoggingOut.value = true
  axios
    .delete(`${import.meta.env.VITE_API_DOMAIN}/admin/logout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('ncp_admin_token')}`
      }
    })
    .then(() => {
      localStorage.removeItem('ncp_admin_token')
      router.push({ name: 'admin login' })
      adminTabStore.set(0)

      toastStore.add({
        msg: 'Logged out successfully.',
        duration: 4000
      })
    })
    .catch((err) => console.log(err))
}

//Enabled sections
const isUpdating = ref(false)
const enabledSections = ref({
  A1: false,
  B1: false,
  C1: false,
  D1: false
})

onMounted(async () => {
  await axios.get(`${import.meta.env.VITE_API_DOMAIN}/enable-post-test/get`).then((res) => {
    enabledSections.value.A1 = res.data.A1
    enabledSections.value.B1 = res.data.B1
    enabledSections.value.C1 = res.data.C1
    enabledSections.value.D1 = res.data.D1
  })
})

function updateEnablePostTest() {
  isUpdating.value = true
  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/enable-post-test`, {
      A1: enabledSections.value.A1,
      B1: enabledSections.value.B1,
      C1: enabledSections.value.C1,
      D1: enabledSections.value.D1
    })
    .then(() => {
      isUpdating.value = false
      toastStore.add({
        msg: 'Enabled/disabled successfully',
        duration: 4000
      })
    })
}
</script>

<template>
  <div :class="{ 'overflow-y-scroll': $route.name !== 'admin login' }" class="flex h-[100svh] flex-col" ref="scrollStore">
    <div v-if="$route.name !== 'admin login'" class="sticky top-0 z-20 grid grid-cols-3 items-center border-b bg-blue-50 px-6 py-2 shadow-lg">
      <!-- logo -->
      <div>
        <button @click="goHome()" class="text-2xl">App Name</button>
      </div>

      <!-- middle  -->
      <div class="flex flex-row items-center justify-center gap-2">
        <button
          @click="adminTabStore.set(0)"
          :class="[adminTabStore.index === 0 ? 'active' : '']"
          class="relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"
        >
          <span class="material-icons text-3xl"> space_dashboard </span>
        </button>
        <button
          @click="adminTabStore.set(1)"
          :class="[adminTabStore.index === 1 ? 'active' : '']"
          class="relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"
        >
          <span class="material-icons text-3xl"> history </span>
        </button>
        <button
          @click="adminTabStore.set(2)"
          :class="[adminTabStore.index === 2 ? 'active' : '']"
          class="relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"
        >
          <span class="material-icons text-3xl"> timeline </span>
        </button>
      </div>

      <!-- profile -->
      <div class="flex flex-row items-center justify-end gap-4">
        <VIconButton @click="modals.settingsToggle()" variant="ghost" size="lg" icon="settings" />
      </div>
    </div>

    <div class="flex grow flex-col items-center">
      <slot />
    </div>

    <VModal v-model:go-open="modals.settingsModal" :click-outside="false">
      <div class="flex flex-col gap-2 p-4">
        <div class="flex flex-row items-center justify-between">
          <h2>Settings</h2>

          <VIconButton @click="modals.settingsToggle()" variant="ghost" size="lg" icon="close" />
        </div>

        <div class="flex flex-row items-center justify-between px-6">
          <div>
            <h3>Enable Post Test</h3>
            <div class="flex flex-row gap-2">
              <label class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
                <input v-model="enabledSections.A1" type="checkbox" class="cursor-pointer" />
                1A
              </label>
              <label class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
                <input v-model="enabledSections.B1" type="checkbox" class="cursor-pointer" />
                1B
              </label>
              <label class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
                <input v-model="enabledSections.C1" type="checkbox" class="cursor-pointer" />
                1C
              </label>
              <label class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100">
                <input v-model="enabledSections.D1" type="checkbox" class="cursor-pointer" />
                1D
              </label>
            </div>
          </div>

          <VButton @click="updateEnablePostTest()" :disabled="isUpdating" class="w-[81px] justify-center">
            <VLoader v-if="isUpdating" size="16px" thickness="2px" />
            <span v-else>Update</span>
          </VButton>
        </div>

        <hr class="m-2 border-stone-400" />

        <VButton @click="logout()" :disabled="isLoggingOut" color="warning" class="justify-center">
          <VLoader v-if="isLoggingOut" size="16px" thickness="2px" />
          <span v-else>Logout</span>
        </VButton>
      </div>
    </VModal>
  </div>
</template>

<style scoped>
.active {
  @apply before:absolute before:bottom-0 before:h-[2px] before:w-full before:rounded-full before:bg-blue-400 before:content-[''];
}
</style>

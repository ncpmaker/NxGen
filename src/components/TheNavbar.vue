<script setup>
import { onMounted, reactive } from 'vue'
import { adminTabStore, toastStore } from '@/store'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()

const modals = reactive({
  profileModal: false,
  profileToggle() {
    this.profileModal = !this.profileModal
  }
})

function goHome() {
  adminTabStore.set(0)

  router.push({ name: 'admin dashboard' })
}

function logout() {
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

const enabledSections = reactive({
  A1: false,
  B1: false,
  C1: false,
  D1: false
})

onMounted(async () => {
  await axios.get(`${import.meta.env.VITE_API_DOMAIN}/enable-post-test/get`).then((res) => {
    enabledSections.A1 = res.data.A1
    enabledSections.B1 = res.data.B1
    enabledSections.C1 = res.data.C1
    enabledSections.D1 = res.data.D1
  })
})

function updateEnablePostTest() {
  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/enable-post-test`, {
      A1: enabledSections.A1,
      B1: enabledSections.B1,
      C1: enabledSections.C1,
      D1: enabledSections.D1
    })
    .then(() => {
      toastStore.add({
        msg: 'Enabled/disabled successfully',
        duration: 4000
      })
    })
}
</script>

<template>
  <div :class="{ 'overflow-y-scroll': $route.name !== 'admin login' }" class="flex h-[100svh] flex-col">
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
          <span v-if="adminTabStore.index === 0" class="material-icons text-3xl"> space_dashboard </span>
          <span v-else class="material-icons-outlined text-3xl"> space_dashboard </span>
        </button>
        <button
          @click="adminTabStore.set(1)"
          :class="[adminTabStore.index === 1 ? 'active' : '']"
          class="relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"
        >
          <span v-if="adminTabStore.index === 1" class="material-icons text-3xl"> history </span>
          <span v-else class="material-icons-outlined text-3xl"> history </span>
        </button>
        <button
          @click="adminTabStore.set(2)"
          :class="[adminTabStore.index === 2 ? 'active' : '']"
          class="relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"
        >
          <span v-if="adminTabStore.index === 2" class="material-icons text-3xl"> timeline </span>
          <span v-else class="material-icons-outlined text-3xl"> timeline </span>
        </button>
      </div>

      <!-- profile -->
      <div class="flex flex-row items-center justify-end gap-4">
        <VIconButton @click="modals.profileToggle()" variant="ghost" size="lg" icon="settings" />
      </div>
    </div>

    <div class="flex grow flex-col items-center">
      <slot />
    </div>

    <VModal v-model:go-open="modals.profileModal" :click-outside="false">
      <div class="flex flex-col gap-2 p-4">
        <div class="flex flex-row items-center justify-between">
          <h2>Settings</h2>

          <VIconButton @click="modals.profileToggle()" variant="ghost" size="lg" icon="close" />
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

          <VButton @click="updateEnablePostTest()"> Update </VButton>
        </div>
        <hr class="m-2 border-stone-400" />
        <VButton @click="logout()" color="warning" class="justify-center">Logout</VButton>
      </div>
    </VModal>
  </div>
</template>

<style scoped>
.active {
  @apply before:absolute before:bottom-0 before:h-[2px] before:w-full before:rounded-full before:bg-blue-400 before:content-[''];
}
</style>

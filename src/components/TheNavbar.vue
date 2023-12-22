<script setup>
import { pageStore } from '@/store'
import { reactive } from 'vue'

const modals = reactive({
  profileModal: false,
  profileToggle() {
    this.profileModal = !this.profileModal
  }
})
</script>

<template>
  <div class="flex h-[100svh] flex-col">
    <!-- content slot -->
    <slot />

    <!-- the sidebar wrapper -->
    <div class="flex shrink-0 flex-row items-center justify-between overflow-hidden overflow-x-hidden border-t border-t-neutral-200 p-3 font-medium">
      <div class="flex w-full flex-row items-center justify-around">
        <div class="mt-0 flex w-full flex-row items-center justify-around gap-4">
          <button @click="pageStore.set(0)" :class="[pageStore.index === 0 ? 'active' : '']" class="nav-points">
            <span class="material-icons"> space_dashboard </span>
            <span>Dashboard</span>
          </button>
          <button @click="pageStore.set(1)" :class="[pageStore.index === 1 ? 'active' : '']" class="nav-points">
            <span class="material-icons"> timeline </span>
            <span>Test History</span>
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
    <div class="flex flex-col gap-2">
      <h2>Profile Settings</h2>

      <VButton color="primary" size="sm" class="justify-center">Terms and Conditions</VButton>
      <VButton color="error" size="sm" class="justify-center">Delete Account</VButton>
      <VButton color="warning" size="sm" class="justify-center">Logout</VButton>
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

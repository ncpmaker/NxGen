<script setup>
import { reactive } from 'vue'

const modals = reactive({
  profileModal: false,
  profileToggle() {
    this.profileModal = !this.profileModal
  }
})
</script>

<template>
  <div :class="{ 'overflow-y-scroll': $route.name !== 'admin login' }" class="flex h-[100svh] flex-col">
    <div v-if="$route.name !== 'admin login'" class="sticky top-0 z-10 grid grid-cols-3 items-center border-b bg-blue-50 px-6 py-2 shadow-lg">
      <!-- logo -->
      <div>
        <h2>App Name</h2>
      </div>

      <!-- middle  -->
      <div class="flex flex-row items-center justify-center gap-2">
        <router-link
          :to="{ name: 'admin dashboard' }"
          :class="{
            ' before:absolute before:bottom-0 before:h-[2px] before:w-full before:rounded-full before:bg-blue-400 before:content-[\'\']':
              $route.name !== 'admin test records'
          }"
          class="relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"
        >
          <span v-if="$route.name !== 'admin test records'" class="material-icons text-3xl"> space_dashboard </span>
          <span v-else class="material-icons-outlined text-3xl"> space_dashboard </span>
        </router-link>
        <router-link
          :to="{ name: 'admin test records' }"
          :class="{
            ' before:absolute before:bottom-0 before:h-[2px] before:w-full before:rounded-full before:bg-blue-400 before:content-[\'\']':
              $route.name === 'admin test records'
          }"
          class="relative flex items-center justify-center rounded-lg px-6 py-1 transition-colors hover:bg-neutral-400/20"
        >
          <span v-if="$route.name === 'admin test records'" class="material-icons text-3xl"> table_chart </span>
          <span v-else class="material-icons-outlined text-3xl"> table_chart </span>
        </router-link>
      </div>

      <!-- profile -->
      <div class="flex flex-row items-center justify-end gap-4">
        <button @click="modals.profileToggle()">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-blue-400 text-lg font-semibold hover:bg-blue-500 active:bg-blue-600">
            A
          </div>
        </button>
      </div>
    </div>

    <div class="grow">
      <router-view></router-view>
    </div>

    <VModal v-model:go-open="modals.profileModal" :click-outside="false">
      <div class="flex flex-col gap-2">
        <div class="flex flex-row items-center justify-between">
          <h2>Account Settings</h2>

          <VIconButton @click="modals.profileToggle()" variant="ghost" size="lg" icon="close" />
        </div>
        <VButton color="warning" class="justify-center">Logout</VButton>
      </div>
    </VModal>
  </div>
</template>

<style scoped></style>

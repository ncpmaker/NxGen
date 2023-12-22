<script setup></script>

<template>
  <div class="grow overflow-y-auto px-4 pb-4">
    <div class="sticky top-0 z-10 border-b border-b-neutral-200 bg-blue-50 pb-4 pt-6">
      <h1>Test History</h1>
    </div>

    <div class="flex flex-col">
      <router-link
        v-for="x in 100"
        :key="x"
        :to="{ name: 'evaluation', params: { id: x } }"
        class="inline-grid select-none auto-cols-[max-content_auto_max-content] grid-flow-col items-center border-b border-b-neutral-200 py-4 transition-colors hover:bg-neutral-400/10"
      >
        <div class="flex h-10 w-10 items-center justify-center">
          <span class="text-xl font-bold">{{ x }}</span>
        </div>
        <div class="flex flex-col pl-2">
          <span class="text-lg font-medium leading-none">MM-DD-YY HH:MM</span>
          <span class="leading-none">Category: Something</span>
        </div>
        <div class="flex flex-row items-center gap-1 pr-2">
          <span class="material-icons"> chevron_right </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<style scoped></style>

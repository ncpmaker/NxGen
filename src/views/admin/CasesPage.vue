<script setup></script>

<template>
  <div class="flex flex-col gap-2 px-64">
    <div class="my-4 flex h-96 flex-row items-end justify-between rounded-2xl bg-gradient-to-b from-blue-300 to-blue-400 p-8 shadow-xl">
      <div class="flex flex-col">
        <span class="text-4xl font-semibold leading-none">Neuro</span>
        <span class="text-xl font-medium leading-none">Description here</span>
      </div>

      <button
        @click="$router.push({ name: 'admin create case', params: { category: 'neuro' } })"
        class="rounded-full px-4 py-2 text-2xl font-medium transition-colors hover:bg-blue-950/10"
      >
        + New Case
      </button>
    </div>

    <router-link
      v-for="x in 5"
      :key="x"
      :to="{ name: 'admin edit case', params: { id: x, category: 'neuro' } }"
      class="rounded-2xl border border-neutral-400 px-10 py-4 text-xl font-medium transition-colors hover:bg-neutral-400/20"
      >Case {{ x }}</router-link
    >
  </div>
</template>

<style scoped></style>

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

    <div
      v-for="x in 5"
      :key="x"
      class="flex flex-row items-center rounded-2xl border border-neutral-400 py-4 pr-5 transition-colors hover:bg-neutral-400/20"
    >
      <router-link :to="{ name: 'admin edit case', params: { id: x, category: 'neuro' } }" class="grow pl-10 text-xl font-medium"
        >Case {{ x }}</router-link
      >
      <VIconButton variant="ghost" color="error" size="lg" icon="delete" class="shrink-0" />
    </div>
  </div>
</template>

<style scoped></style>

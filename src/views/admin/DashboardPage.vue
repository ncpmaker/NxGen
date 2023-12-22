<script setup></script>

<template>
  <div class="relative z-10 grid grid-cols-2 gap-2 px-32 py-4">
    <router-link
      :to="{ name: 'admin case scenarios', params: { category: 'neuro' } }"
      v-for="x in 7"
      :key="x"
      class="flex h-32 flex-col justify-end rounded-2xl bg-blue-400 p-4 shadow-xl transition-all hover:bg-blue-500 hover:py-6"
    >
      <span class="text-4xl font-semibold leading-none">Neuro</span>
      <span class="text-xl font-medium leading-none">Number of Cases: 4</span>
    </router-link>
  </div>
</template>

<style scoped></style>

<script setup>
const categories = [
  {
    text: 'Activity/Rest',
    desc: 'Ability to engage in necessary/desired activities of life (work and leisure) and to obtain adequate sleep/rest'
  },
  {
    text: 'Elimination',
    desc: 'Ability to excrete waste products'
  },
  {
    text: 'Food/Fluid',
    desc: 'Ability to maintain intake of and utilize nutrients and liquids to meet physiological needs'
  },
  {
    text: 'Pain/Discomfort',
    desc: 'Ability to control internal/external environment to maintain comfort'
  },
  {
    text: 'Respiration',
    desc: 'Ability to provide and use oxygen to meet physiological needs'
  },
  {
    text: 'Safety',
    desc: 'Ability to provide safe, growth-promoting environment'
  },
  {
    text: 'Teaching/Learning',
    desc: 'Ability to incorporate and use information to achieve healthy lifestyle/optimal wellness'
  }
]
</script>

<template>
  <div class="mb-4 w-[calc(100%-10rem)] place-self-center border-b border-b-stone-400 py-6 text-center">
    <h1>Categories</h1>
  </div>

  <div class="relative z-10 grid w-full grid-cols-2 gap-2 px-32 pb-4">
    <router-link
      :to="{ name: 'admin case scenarios', params: { category: category.text } }"
      v-for="category in categories"
      :key="category.text"
      class="flex h-32 flex-col justify-end rounded-2xl bg-blue-400 p-4 shadow-xl transition-all hover:bg-blue-500 hover:py-6"
    >
      <span class="text-4xl font-semibold leading-none">{{ category.text.charAt(0).toUpperCase() + category.text.slice(1) }}</span>
      <span class="font-medium leading-none">{{ category.desc }}</span>
    </router-link>
  </div>
</template>

<style scoped></style>

<script setup>
const props = defineProps({
  title: {
    type: String,
    default: null
  },
  desc: {
    type: String,
    default: null
  }
})
</script>

<template>
  <button
    class="group inline-grid w-full min-w-0 select-none auto-cols-[max-content_auto_max-content] grid-flow-col flex-row items-center rounded-2xl bg-blue-200 outline-none hover:enabled:bg-blue-300 active:enabled:bg-blue-400 disabled:opacity-50"
  >
    <div
      class="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-blue-400 text-4xl font-bold group-hover:enabled:bg-blue-500 group-active:enabled:enabled:bg-blue-600"
    >
      VD
    </div>
    <div class="flex h-full w-full min-w-0 flex-col justify-center px-4">
      <h3 class="truncate text-start leading-none">{{ props.title }}</h3>
      <span class="text-start text-sm leading-none">{{ props.desc }}</span>
    </div>

    <div
      class="mr-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/20 group-hover:enabled:bg-blue-500/50 group-active:enabled:bg-blue-600/20"
    >
      <span class="material-icons"> chevron_right </span>
    </div>
  </button>
</template>

<style scoped></style>

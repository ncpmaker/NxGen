<script setup>
const props = defineProps({
  step: {
    type: Number,
    default: 0
  }
})

const steps = [
  {
    icon: 'assessment',
    label: 'Assessment'
  },
  {
    icon: 'monitor_heart',
    label: 'Nursing Diagnosis'
  },
  {
    icon: 'assignment',
    label: 'Planning'
  },
  {
    icon: 'settings',
    label: 'Implementation'
  },
  {
    icon: 'checklist_rtl',
    label: 'Evaluation'
  }
]
</script>

<template>
  <ul class="flex select-none flex-row items-center overflow-x-auto py-2">
    <li
      v-for="(step, index) in steps"
      :key="step.label"
      :class="[props.step >= index + 1 ? 'active' : '']"
      class="relative flex shrink-0 basis-32 flex-col items-center gap-1 text-center"
    >
      <div class="z-10 flex h-10 w-10 items-center justify-center rounded-full text-blue-950">
        <span class="material-icons"> {{ step.icon }} </span>
      </div>
      <span>{{ step.label }}</span>
    </li>
  </ul>
</template>

<style scoped>
ul > li:not(:first-child):before {
  @apply absolute top-5 z-0 ms-[-100%] h-2 w-full -translate-y-1/2 bg-blue-200 content-[''];
}

ul > li > div {
  @apply bg-blue-200;
}

ul > li.active:not(:first-child):before {
  @apply bg-blue-400;
}

ul > li.active > div {
  @apply bg-blue-400;
}
</style>

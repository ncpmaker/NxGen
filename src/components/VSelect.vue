<script setup>
const props = defineProps({
  options: {
    type: Array,
    default: null
  },
  label: {
    type: String,
    default: null
  },
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="relative flex cursor-pointer select-none flex-col justify-center gap-1">
    <span v-if="props.label" class="text-sm text-neutral-600">{{ props.label }}</span>
    <select
      v-bind="$attrs"
      @input="$emit('update:modelValue', $event.target.value)"
      class="select-tag cursor-pointer truncate rounded-full border border-neutral-400 bg-transparent px-4 py-2 outline-none transition-colors hover:border-neutral-500 focus:border-neutral-950"
    >
      <option v-for="(option, index) in props.options" :key="index" :value="option">{{ option }}</option>
    </select>
    <span :class="{ 'translate-y-1/2': props.label }" class="material-icons pointer-events-none absolute right-4"> expand_more </span>
  </label>
</template>

<style scoped>
.select-tag {
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}
</style>

<script setup>
const props = defineProps({
  label: {
    type: String,
    default: null
  },
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <label class="flex flex-col gap-1">
    <span v-if="props.label" class="text-sm text-neutral-600 lg:text-base">{{ props.label }}</span>
    <VTextbox v-bind="$attrs" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" />
  </label>
</template>

<style scoped></style>

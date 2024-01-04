<script setup>
import { useAttrs } from 'vue'

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  subLabel: {
    type: String,
    default: null
  },
  modelValue: String
})

defineEmits(['update:modelValue'])

const attrs = useAttrs()
function setColor() {
  let color

  if (attrs.color === 'neutral' || props.color === null) {
    color = 'text-neutral-600'
  } else if (attrs.color === 'primary') {
    color = 'text-blue-400'
  } else if (attrs.color === 'secondary') {
    color = 'text-blue-200'
  } else if (attrs.color === 'info') {
    color = 'text-teal-400'
  } else if (attrs.color === 'warning') {
    color = 'text-yellow-400'
  } else if (attrs.color === 'success') {
    color = 'text-emerald-400'
  } else if (attrs.color === 'error') {
    color = 'text-red-500'
  }

  return color
}
</script>

<template>
  <label class="flex flex-col gap-1">
    <span v-if="props.label" :class="setColor()" class="text-sm lg:text-base">{{ props.label }}</span>
    <VTextbox v-bind="$attrs" :value="props.modelValue" @input="$emit('update:modelValue', $event.target.value)" />
    <span v-if="props.subLabel" :class="setColor()" class="place-self-end text-sm lg:text-base">{{ props.subLabel }}</span>
  </label>
</template>

<style scoped></style>

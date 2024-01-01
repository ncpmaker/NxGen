<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'base'
  },
  variant: {
    type: String,
    default: 'filled'
  },
  textarea: {
    type: Boolean,
    default: false
  },
  modelValue: String
})

defineEmits(['update:modelValue'])
</script>

<template>
  <textarea
    v-if="props.textarea"
    v-bind="$attrs"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="{
      'border-transparent bg-neutral-950/5 transition-colors hover:border-neutral-500 focus:border-neutral-950': props.variant === 'filled',
      'border-neutral-400 transition-colors hover:border-neutral-500 focus:border-neutral-950': props.variant === 'outlined',
      'h-[120px] px-2 py-1 text-sm': props.variant !== 'ghost' && props.size === 'sm',
      'h-[168px] px-4 py-2 text-base': props.variant !== 'ghost' && props.size === 'base',
      'h-[216px] px-6 py-3 text-xl': props.variant !== 'ghost' && props.size === 'lg'
    }"
    class="resize-none rounded-2xl border font-medium outline-none"
  ></textarea>
  <input
    v-else
    v-bind="$attrs"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="{
      'border-transparent bg-neutral-950/5 transition-colors hover:border-neutral-500 focus:border-neutral-950': props.variant === 'filled',
      'border-neutral-400 transition-colors hover:border-neutral-500 focus:border-neutral-950': props.variant === 'outlined',
      'h-[30px] max-h-[30px] px-2 py-1 text-sm': props.variant !== 'ghost' && props.size === 'sm',
      'h-[42px] max-h-[42px] px-4 py-2 text-base': props.variant !== 'ghost' && props.size === 'base',
      'h-[54px] max-h-[54px] px-6 py-3 text-xl': props.variant !== 'ghost' && props.size === 'lg'
    }"
    class="truncate rounded-full border font-medium outline-none"
  />
</template>

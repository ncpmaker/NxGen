<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'base'
  },
  color: {
    type: String,
    default: 'neutral'
  },
  textarea: {
    type: Boolean,
    default: false
  },
  modelValue: String
})

defineEmits(['update:modelValue'])

function setColor() {
  let color
  let size

  if (props.color === 'neutral' || props.color === null) {
    color = 'border-transparent bg-neutral-950/5 transition-colors hover:border-neutral-500 focus:border-neutral-950'
  } else if (props.color === 'primary') {
    color = 'border-transparent bg-blue-400/10 transition-colors hover:border-blue-400/50 focus:border-blue-400'
  } else if (props.color === 'secondary') {
    color = 'border-transparent bg-blue-200/10 transition-colors hover:border-blue-300 focus:border-blue-700'
  } else if (props.color === 'info') {
    color = 'border-transparent bg-teal-400/10 transition-colors hover:border-teal-400/50 focus:border-teal-400'
  } else if (props.color === 'warning') {
    color = 'border-transparent bg-yellow-400/10 transition-colors hover:border-yellow-400/50 focus:border-yellow-400'
  } else if (props.color === 'success') {
    color = 'border-transparent bg-emerald-400/10 transition-colors hover:border-emerald-400/50 focus:border-emerald-400'
  } else if (props.color === 'error') {
    color = 'border-transparent bg-red-400/10 transition-colors hover:border-red-400/50 focus:border-red-400'
  }

  if (props.textarea) {
    if (props.size === 'sm') {
      size = 'h-[120px] px-2 py-1 text-sm'
    } else if (props.size === 'base') {
      size = 'h-[168px] px-4 py-2 text-base'
    } else if (props.size === 'lg') {
      size = 'h-[216px] px-6 py-3 text-xl'
    }
  } else {
    if (props.size === 'sm') {
      size = ' px-2 py-1 text-sm'
    } else if (props.size === 'base') {
      size = ' px-4 py-2 text-base'
    } else if (props.size === 'lg') {
      size = ' px-6 py-3 text-xl'
    }
  }

  return color + ' ' + size
}
</script>

<template>
  <textarea
    v-if="props.textarea"
    v-bind="$attrs"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="setColor()"
    class="resize-none rounded-2xl border font-medium outline-none"
  ></textarea>
  <input
    v-else
    v-bind="$attrs"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="setColor()"
    class="truncate rounded-full border font-medium outline-none"
  />
  <!-- <input
    v-else
    v-bind="$attrs"
    :value="props.modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    :class="{
      'border-transparent bg-neutral-950/5 transition-colors hover:border-neutral-500 focus:border-neutral-950': props.variant === 'filled',
      'h-[30px] max-h-[30px] px-2 py-1 text-sm': props.variant !== 'ghost' && props.size === 'sm',
      'h-[42px] max-h-[42px] px-4 py-2 text-base': props.variant !== 'ghost' && props.size === 'base',
      'h-[54px] max-h-[54px] px-6 py-3 text-xl': props.variant !== 'ghost' && props.size === 'lg'
    }"
    class="truncate rounded-full border font-medium outline-none"
  /> -->
</template>

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
  color: {
    type: String,
    default: 'primary'
  },
  startIcon: {
    type: String,
    default: null
  },
  endIcon: {
    type: String,
    default: null
  }
})

function btnStyle() {
  let btnColor
  let btnVariant

  if (props.variant === 'ghost') {
    if (props.color === 'primary') {
      btnColor = 'border-transparent bg-transparent hover:enabled:bg-neutral-400/20 active:enabled:bg-neutral-500/20 text-blue-400'
    } else if (props.color === 'secondary') {
      btnColor = 'border-transparent bg-transparent hover:enabled:bg-neutral-400/20 active:enabled:bg-neutral-500/20 text-blue-200'
    } else if (props.color === 'info') {
      btnColor = 'border-transparent bg-transparent hover:enabled:bg-neutral-400/20 active:enabled:bg-neutral-500/20 text-teal-400'
    } else if (props.color === 'warning') {
      btnColor = 'border-transparent bg-transparent hover:enabled:bg-neutral-400/20 active:enabled:bg-neutral-500/20 text-yellow-400'
    } else if (props.color === 'success') {
      btnColor = 'border-transparent bg-transparent hover:enabled:bg-neutral-400/20 active:enabled:bg-neutral-500/20 text-emerald-400'
    } else if (props.color === 'error') {
      btnColor = 'border-transparent bg-transparent hover:enabled:bg-neutral-400/20 active:enabled:bg-neutral-500/20 text-red-400'
    } else if (props.color === 'neutral') {
      btnColor = 'border-transparent bg-transparent hover:enabled:bg-neutral-400/20 active:enabled:bg-neutral-500/20 text-blue-950'
    }
  } else if (props.variant === 'filled') {
    if (props.color === 'primary') {
      btnColor = 'border-transparent bg-blue-400 text-blue-950 hover:enabled:bg-blue-500 active:enabled:bg-blue-600'
    } else if (props.color === 'secondary') {
      btnColor = 'border-transparent bg-blue-200 text-blue-950 hover:enabled:bg-blue-300 active:enabled:bg-blue-400'
    } else if (props.color === 'info') {
      btnColor = 'border-transparent bg-teal-400 text-teal-950 hover:enabled:bg-teal-500 active:enabled:bg-teal-600'
    } else if (props.color === 'warning') {
      btnColor = 'border-transparent bg-yellow-400 text-yellow-950 hover:enabled:bg-yellow-500 active:enabled:bg-yellow-600'
    } else if (props.color === 'success') {
      btnColor = 'border-transparent bg-emerald-400 text-emerald-950 hover:enabled:bg-emerald-500 active:enabled:bg-emerald-600'
    } else if (props.color === 'error') {
      btnColor = 'border-transparent bg-red-400 text-red-950 hover:enabled:bg-red-500 active:enabled:bg-red-600'
    }
  }

  if (props.variant === 'outlined') {
    if (props.color === 'primary') {
      btnColor =
        'border-neutral-400 hover:enabled:border-blue-400 active:enabled:border-blue-500/20 active:enabled:bg-blue-500 hover:enabled:bg-blue-400/20 text-blue-400'
    } else if (props.color === 'secondary') {
      btnColor =
        'border-neutral-400 hover:enabled:border-blue-200 active:enabled:border-blue-300 active:enabled:bg-blue-300/20 hover:enabled:bg-blue-200/20 text-blue-200'
    } else if (props.color === 'info') {
      btnColor =
        'border-neutral-400 hover:enabled:border-teal-400 active:enabled:border-teal-500 active:enabled:bg-teal-500/20 hover:enabled:bg-teal-400/20 text-teal-400'
    } else if (props.color === 'warning') {
      btnColor =
        'border-neutral-400 hover:enabled:border-yellow-400 active:enabled:border-yellow-500 active:enabled:bg-yellow-500/10 hover:enabled:bg-yellow-400/10 text-yellow-400'
    } else if (props.color === 'success') {
      btnColor =
        'border-neutral-400 hover:enabled:border-emerald-400 active:enabled:border-emerald-500 active:enabled:bg-emerald-500/20 hover:enabled:bg-emerald-400/20 text-emerald-400'
    } else if (props.color === 'error') {
      btnColor =
        'border-neutral-400 hover:enabled:border-red-400 active:enabled:border-red-500 active:enabled:bg-red-500/20 hover:enabled:bg-red-400/20 text-red-400'
    }
  }

  if (props.size === 'sm') {
    btnVariant = 'h-[30px] max-h-[30px] gap-1 px-2 py-1 text-sm'
  } else if (props.size === 'base') {
    btnVariant = 'h-[42px] max-h-[42px] lg:h-[47px] lg:max-h-[47px] gap-2 px-4 py-2 text-base'
  } else if (props.size === 'lg') {
    btnVariant = 'h-[54px] max-h-[54px] gap-3 px-6 py-3 text-xl'
  }

  return btnColor + ' ' + btnVariant
}
</script>

<template>
  <button
    :class="btnStyle()"
    class="inline-grid select-none auto-cols-[max-content_auto_max-content] grid-flow-col items-center rounded-full border text-start font-medium outline-none disabled:opacity-50"
  >
    <span
      v-if="props.startIcon"
      :class="{
        'text-base leading-none': props.size === 'sm',
        'text-lg leading-none': props.size === 'base',
        'text-2xl leading-none': props.size === 'lg'
      }"
      class="material-icons"
    >
      {{ props.startIcon }}
    </span>
    <slot />
    <span v-if="props.endIcon" class="material-icons"> {{ props.endIcon }} </span>
  </button>
</template>

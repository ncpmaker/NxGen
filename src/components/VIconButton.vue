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
    default: 'neutral'
  },
  icon: {
    type: String,
    default: null
  }
})

function btnStyle() {
  let btnColor
  let btnVariant

  if (props.variant === 'ghost') {
    if (props.color === 'neutral') {
      btnColor =
        "relative border-transparent bg-transparent active:enabled:before:bg-neutral-500/20 before:absolute before:rounded-full before:content-[''] hover:enabled:before:bg-neutral-400/20 text-blue-950"
    } else if (props.color === 'primary') {
      btnColor =
        "relative border-transparent bg-transparent active:enabled:before:bg-neutral-500/20 before:absolute before:rounded-full before:content-[''] hover:enabled:before:bg-neutral-400/20 text-blue-400"
    } else if (props.color === 'secondary') {
      btnColor =
        "relative border-transparent bg-transparent active:enabled:before:bg-neutral-500/20 before:absolute before:rounded-full before:content-[''] hover:enabled:before:bg-neutral-400/20 text-blue-200"
    } else if (props.color === 'info') {
      btnColor =
        "relative border-transparent bg-transparent active:enabled:before:bg-neutral-500/20 before:absolute before:rounded-full before:content-[''] hover:enabled:before:bg-neutral-400/20 text-teal-400"
    } else if (props.color === 'warning') {
      btnColor =
        "relative border-transparent bg-transparent active:enabled:before:bg-neutral-500/20 before:absolute before:rounded-full before:content-[''] hover:enabled:before:bg-neutral-400/20 text-yellow-400"
    } else if (props.color === 'success') {
      btnColor =
        "relative border-transparent bg-transparent active:enabled:before:bg-neutral-500/20 before:absolute before:rounded-full before:content-[''] hover:enabled:before:bg-neutral-400/20 text-emerald-400"
    } else if (props.color === 'error') {
      btnColor =
        "relative border-transparent bg-transparent active:enabled:before:bg-neutral-500/20 before:absolute before:rounded-full before:content-[''] hover:enabled:before:bg-neutral-400/20 text-red-400"
    }

    if (props.size === 'sm') {
      btnVariant = 'before:-bottom-1 before:-left-1 before:-right-1 before:-top-1'
    } else if (props.size === 'base') {
      btnVariant = 'before:-bottom-2 before:-left-2 before:-right-2 before:-top-2'
    } else if (props.size === 'lg') {
      btnVariant = 'before:-bottom-3 before:-left-3 before:-right-3 before:-top-3'
    }
  } else {
    if (props.variant === 'filled') {
      if (props.color === 'primary') {
        btnColor = 'border-transparent bg-blue-400 text-blue-950 hover:bg-blue-500 active:bg-blue-600'
      } else if (props.color === 'secondary') {
        btnColor = 'border-transparent bg-blue-200 text-blue-950 hover:bg-blue-300 active:bg-blue-400'
      } else if (props.color === 'info') {
        btnColor = 'border-transparent bg-teal-400 text-teal-950 hover:bg-teal-500 active:bg-bluteale-600'
      } else if (props.color === 'warning') {
        btnColor = 'border-transparent bg-yellow-400 text-yellow-950 hover:bg-yellow-500 active:bg-yellow-600'
      } else if (props.color === 'success') {
        btnColor = 'border-transparent bg-emerald-400 text-emerald-950 hover:bg-emerald-500 active:bg-emerald-600'
      } else if (props.color === 'error') {
        btnColor = 'border-transparent bg-red-400 text-red-950 hover:bg-red-500 active:bg-red-600'
      }
    }

    if (props.variant === 'outlined') {
      if (props.color === 'primary') {
        btnColor = 'border-neutral-400 hover:border-blue-400 hover:bg-blue-400/20 active:bg-blue-500/20 text-blue-400'
      } else if (props.color === 'secondary') {
        btnColor = 'border-neutral-400 hover:border-blue-200 hover:bg-blue-200/20 active:bg-blue-300/20 text-blue-200'
      } else if (props.color === 'info') {
        btnColor = 'border-neutral-400 hover:border-teal-400 hover:bg-teal-400/20 active:bg-teal-500/20 text-teal-400'
      } else if (props.color === 'warning') {
        btnColor = 'border-neutral-400 hover:border-yellow-400 hover:bg-yellow-400/10 active:bg-yellow-500/10 text-yellow-400'
      } else if (props.color === 'success') {
        btnColor = 'border-neutral-400 hover:border-emerald-400 hover:bg-emerald-400/20 active:bg-emerald-500/20 text-emerald-400'
      } else if (props.color === 'error') {
        btnColor = 'border-neutral-400 hover:border-red-400 hover:bg-red-400/20 active:bg-red-500/20 text-red-400'
      }
    }

    if (props.size === 'sm') {
      btnVariant = 'h-[30px] max-h-[30px] w-[30px] max-w-[30px]'
    } else if (props.size === 'base') {
      btnVariant = 'h-[42px] max-h-[42px] w-[42px] max-w-[42px]'
    } else if (props.size === 'lg') {
      btnVariant = 'h-[54px] max-h-[54px] w-[54px] max-w-[54px]'
    }
  }

  return btnColor + ' ' + btnVariant
}
</script>

<template>
  <button
    :class="btnStyle()"
    class="flex h-fit w-fit select-none items-center justify-center rounded-full border outline-none disabled:cursor-not-allowed disabled:opacity-50"
  >
    <span
      :class="{
        'text-base leading-none': props.size === 'sm',
        'text-lg leading-none': props.size === 'base',
        'text-2xl leading-none': props.size === 'lg'
      }"
      class="material-icons"
    >
      {{ props.icon }}
    </span>
  </button>
</template>

<script setup>
const props = defineProps({
  size: {
    type: String,
    default: 'base'
  },
  variant: {
    type: String,
    default: 'link'
  },
  color: {
    type: String,
    default: 'primary'
  },
  icon: {
    type: String,
    default: null
  }
})

function btnStyle() {
  let btnColor
  let btnVariant

  if (props.color === 'primary') {
    btnColor = 'text-blue-400 transition-colors duration-100 ease-in-out hover:text-blue-500'
  } else if (props.color === 'secondary') {
    btnColor = 'text-blue-200 transition-colors duration-100 ease-in-out hover:text-blue-300'
  } else if (props.color === 'info') {
    btnColor = 'text-teal-400 transition-colors duration-100 ease-in-out hover:text-teal-500'
  } else if (props.color === 'warning') {
    btnColor = 'text-yello-400 transition-colors duration-100 ease-in-out hover:text-yello-500'
  } else if (props.color === 'success') {
    btnColor = 'text-emerald-400 transition-colors duration-100 ease-in-out hover:text-emerald-500'
  } else if (props.color === 'error') {
    btnColor = 'text-red-400 transition-colors duration-100 ease-in-out hover:text-red-500'
  }

  return btnColor + ' ' + btnVariant
}
</script>

<template>
  <router-link v-if="props.variant === 'link'" :class="btnStyle()"><slot /></router-link>
  <button v-else-if="props.variant === 'button'" :class="btnStyle()"><slot /></button>
</template>

<style scoped></style>

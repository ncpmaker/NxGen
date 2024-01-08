<script setup>
const props = defineProps({
  thickness: {
    type: String,
    default: '16px'
  },
  size: {
    type: String,
    default: '80px'
  },
  color: {
    type: String,
    default: 'neutral'
  }
})

function setColor() {
  if (props.color === 'neutral') {
    return 'black'
  } else if (props.color === 'primary') {
    return '#60a5fa'
  } else if (props.color === 'secondary') {
    return '#bfdbfe'
  } else if (props.color === 'info') {
    return '#2dd4bf'
  } else if (props.color === 'warning') {
    return '#facc15'
  } else if (props.color === 'success') {
    return '#34d399'
  } else if (props.color === 'error') {
    return '#f87171'
  }
}
</script>

<template>
  <div class="loader animate-spin rounded-full"></div>
</template>

<style scoped>
.loader {
  border: v-bind('props.thickness') solid #e5e5e57f;
  border-top: v-bind('props.thickness') solid v-bind('setColor()');
  width: v-bind('props.size');
  height: v-bind('props.size');
}
</style>

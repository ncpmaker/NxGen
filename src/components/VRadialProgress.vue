<script setup>
const props = defineProps({
  progress: {
    type: Number,
    default: 0
  },
  maxValue: {
    type: Number,
    default: 20
  },
  size: {
    type: String,
    default: '128px'
  },
  thickness: {
    type: String,
    default: '16px'
  },
  color: {
    type: String,
    default: 'primary'
  }
})
</script>

<template>
  <div class="radial-progress flex shrink-0 items-center justify-center">
    <div
      v-bind="$attrs"
      :class="{
        'text-blue-950': props.color === 'primary',
        'text-yellow-950': props.color === 'warning',
        'text-emerald-950': props.color === 'success',
        'text-red-950': props.color === 'error'
      }"
      class="radial-center flex items-center justify-center rounded-full bg-blue-50"
    >
      {{ props.progress }}%
    </div>
  </div>
</template>

<style scoped>
.radial-center {
  width: calc(100% - v-bind('props.thickness'));
  height: calc(100% - v-bind('props.thickness'));
}
.radial-progress {
  width: v-bind('props.size');
  height: v-bind('props.size');
  border-radius: 50%;
  background: conic-gradient(
    v-bind(
        "props.color === 'primary' ? '#60a5fa': props.color === 'warning' ? '#facc15': props.color === 'success' ? '#34d399': props.color === 'error' ? '#f87171' : ''"
      )
      v-bind("(props.progress/props.maxValue)*100 + '%'"),
    v-bind(
        "props.color === 'primary' ? '#bfdbfe': props.color === 'warning' ? '#fef08a': props.color === 'success' ? '#a7f3d0': props.color === 'error' ? '#fecaca' : ''"
      )
      0
  );
}
</style>

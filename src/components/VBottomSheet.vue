<script setup>
const props = defineProps({
  goUp: Boolean
})

defineEmits(['update:goUp'])
</script>

<template>
  <div
    :class="[props.goUp ? 'visible opacity-100' : 'invisible opacity-0']"
    class="fixed left-0 top-0 h-[100svh] w-screen overflow-hidden transition-all duration-300"
  >
    <!-- the backdrop -->
    <div @click="$emit('update:goUp', !props.goUp)" class="absolute left-0 top-0 h-full w-full bg-neutral-950/25"></div>

    <!-- the sheet wrapper -->
    <div
      :class="[props.goUp ? 'opacity-full translate-y-0' : 'translate-y-full opacity-0']"
      class="absolute bottom-0 max-h-[calc(100svh-(100svh/3))] min-h-[80px] w-full overflow-hidden rounded-t-2xl bg-blue-50 transition-all duration-300"
    >
      <slot />
    </div>
  </div>
</template>

<style scoped></style>

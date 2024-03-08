<script setup>
const props = defineProps({
  goOpen: Boolean,
  clickOutside: {
    type: Boolean,
    default: true
  }
})

defineEmits(['update:goOpen'])
</script>

<template>
  <div
    class="absolute left-0 top-0 z-40 flex h-[100svh] w-full items-center justify-center p-4 transition-all"
    :class="[props.goOpen ? 'visible opacity-100' : 'invisible opacity-0']"
  >
    <div v-if="clickOutside" @click="$emit('update:goOpen', !props.goOpen)" class="absolute top-0 h-full w-full bg-neutral-950/25"></div>
    <div v-else class="absolute top-0 h-full w-full bg-neutral-950/25"></div>
    <div
      class="z-10 max-h-[calc(100svh-32px)] w-full overflow-hidden rounded-2xl bg-blue-50 transition-transform duration-150 ease-in-out md:min-w-[560px] md:max-w-[900px]"
      :class="[props.goOpen ? 'scale-100' : 'scale-95']"
    >
      <slot></slot>
    </div>
  </div>
</template>

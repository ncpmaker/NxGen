<script setup>
const props = defineProps({
  goOpen: Boolean,
  header: String,
  body: String,
  confirmLabel: String,
  cancelLabel: String,
  confirmState: {
    type: String,
    default: 'success'
  }
})

defineEmits(['update:goOpen'])
</script>

<template>
  <div
    class="fixed left-0 top-0 z-40 flex h-[100svh] w-full items-center justify-center p-4 transition-all"
    :class="[props.goOpen ? 'visible opacity-100' : 'invisible opacity-0']"
  >
    <div class="absolute top-0 h-full w-full bg-neutral-950/25"></div>
    <div
      class="z-10 w-full min-w-0 max-w-[640px] rounded-2xl bg-blue-50 px-4 pb-2 pt-4 transition-all lg:min-w-[400px]"
      :class="[props.goOpen ? 'scale-100' : 'scale-95']"
    >
      <h2>{{ props.header }}</h2>
      <p class="px-2 pb-4 pt-2">{{ props.body }}</p>
      <div class="flex flex-col-reverse gap-2 md:flex-row md:items-center md:justify-end">
        <VButton @click="$emit('update:goOpen', !props.goOpen)" color="neutral" variant="ghost" class="w-full justify-center md:w-fit">
          {{ props.cancelLabel }}
        </VButton>
        <VButton @click="$emit('confirm')" :color="props.confirmState" variant="ghost" class="w-full justify-center md:w-fit">
          {{ props.confirmLabel }}
        </VButton>
      </div>
    </div>
  </div>
</template>

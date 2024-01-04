<script setup>
import { ref, watch } from 'vue'
import { toastStore } from '@/store'

/*Toast section*/
const displayAlert = ref([])
let timeout = null

watch(
  () => toastStore.list,
  () => {
    if (toastStore.list.length >= 1 && timeout === null) {
      setTimeout(() => {
        displayAlert.value.push(toastStore.list[0].msg)
      }, 150)

      timeout = setTimeout(() => {
        toastStore.list.shift()
        displayAlert.value.shift()
        timeout = null
      }, toastStore.list[0].duration)
    }
  },
  { deep: true }
)

function reload() {
  window.location.reload()
}
</script>

<template>
  <TransitionGroup name="toast-fade-scale" tag="ul">
    <li
      v-for="(currentAlert, index) in displayAlert"
      :key="index"
      class="pointer-events-none absolute left-4 right-4 top-4 z-50 flex min-w-0 flex-row items-center justify-between gap-4 rounded-xl bg-stone-800 p-4 font-medium text-stone-200 md:left-auto md:min-w-[440px] md:text-lg"
    >
      {{ currentAlert }}
      <button
        v-if="toastStore.list[0].showAction"
        @click="reload()"
        class="pointer-events-auto h-full text-blue-600 transition-colors hover:text-blue-500"
      >
        Refresh
      </button>
    </li>
  </TransitionGroup>
</template>

<style scoped></style>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { goToPostTestStore } from '@/store'
import axios from 'axios'

const router = useRouter()

function reverseString(str) {
  let splitString = str.split('')
  let reverseArray = splitString.reverse()
  let joinArray = reverseArray.join('')
  return joinArray
}

const postTestEnabled = ref(null)
const postTestFinished = ref(null)
const isLoading = ref(true)
onMounted(async () => {
  let sections
  let userSection = reverseString(localStorage.getItem('ncp_user_section'))

  await axios.get(`${import.meta.env.VITE_API_DOMAIN}/enable-post-test/get`).then((res) => {
    sections = res.data
    isLoading.value = false
  })

  postTestEnabled.value = sections[userSection]
  postTestFinished.value = JSON.parse(localStorage.getItem('ncp_finished_post_test'))
})

function readyPostTest() {
  goToPostTestStore.value = true
  router.push({ name: 'post-test' })
}
</script>

<template>
  <div class="flex grow items-center justify-center px-2 md:pb-10 md:pt-5">
    <button
      @click="readyPostTest()"
      :disabled="!postTestEnabled || postTestFinished"
      class="group col-span-8 h-64 w-full overflow-hidden rounded-2xl bg-[url('https://www.ucl.ac.uk/ioe/sites/ioe/files/styles/large_image/public/lilac-blouse-school-uniform.png?itok=KGavEVWp')] bg-cover bg-top shadow-lg sm:h-80 md:h-full"
    >
      <div
        v-if="isLoading"
        class="flex h-full w-full flex-row items-end justify-center gap-6 bg-gradient-to-t from-gray-950/50 to-transparent px-4 pb-16 group-disabled:bg-gradient-to-t group-disabled:from-gray-950/70 group-disabled:to-gray-950/40"
      >
        <h1 class="font-medium leading-none text-blue-50 drop-shadow-md md:text-5xl">Please wait</h1>
        <VLoader size="30px" thickness="2px" class="md:hidden" />
        <VLoader size="48px" thickness="2px" class="hidden md:block" />
      </div>

      <div
        v-else-if="postTestFinished"
        class="flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-gray-950/50 to-transparent px-4 pb-16 group-disabled:bg-gradient-to-t group-disabled:from-gray-950/70 group-disabled:to-gray-950/40"
      >
        <h1 class="font-medium leading-none text-blue-50 drop-shadow-md md:text-5xl">Finished taking Post Test</h1>
      </div>

      <div
        v-else
        class="flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-gray-950/50 to-transparent px-4 pb-6 group-disabled:bg-gradient-to-t group-disabled:from-gray-950/70 group-disabled:to-gray-950/40 md:items-start md:px-10 md:py-10"
      >
        <h1 class="font-medium leading-none text-blue-50 drop-shadow-md md:text-5xl">Take the Post Test</h1>
        <span v-if="!postTestEnabled" class="text-sm text-blue-50 drop-shadow-md md:text-base">(Please wait for the moderator to enable this)</span>
        <span v-else class="text-sm text-blue-50 drop-shadow-md md:text-base">Click Here</span>
      </div>
    </button>
  </div>
</template>

<style scoped></style>

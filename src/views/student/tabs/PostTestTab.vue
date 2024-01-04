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
onMounted(async () => {
  let sections
  let userSection = reverseString(localStorage.getItem('ncp_user_section'))

  await axios.get(`${import.meta.env.VITE_API_DOMAIN}/enable-post-test/get`).then((res) => {
    sections = res.data
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
  <div class="flex grow flex-col overflow-y-auto pb-4">
    <div class="sticky top-0 z-10 bg-blue-50 px-4 pb-4 pt-6">
      <h1>Welcome to App Name</h1>
    </div>

    <div class="flex grow items-center justify-center px-4">
      <button
        @click="readyPostTest()"
        :disabled="!postTestEnabled || postTestFinished"
        class="group col-span-8 h-64 w-full overflow-hidden rounded-2xl bg-[url('https://marketplace.canva.com/EAFOtK0VoYQ/1/0/1600w/canva-brown-simple-aesthetic-desktop-wallpaper-kf83cZpRSuM.jpg')] shadow-lg"
      >
        <div
          v-if="postTestFinished"
          class="flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-gray-950/50 to-transparent pb-16 group-disabled:bg-gradient-to-t group-disabled:from-gray-950/70 group-disabled:to-gray-950/40"
        >
          <h1 class="font-medium leading-none text-blue-50 drop-shadow-md">Thank you for taking the Post Test</h1>
        </div>
        <div
          v-else
          class="flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-gray-950/50 to-transparent pb-6 group-disabled:bg-gradient-to-t group-disabled:from-gray-950/70 group-disabled:to-gray-950/40"
        >
          <h1 class="font-medium leading-none text-blue-50 drop-shadow-md">Take the Post Test</h1>
          <span v-if="!postTestEnabled" class="text-sm text-blue-50 drop-shadow-md">(Please wait for the moderator to enable this)</span>
          <span v-else class="text-sm text-blue-50 drop-shadow-md">Click Here</span>
        </div>
      </button>
    </div>
  </div>
</template>

<style scoped></style>

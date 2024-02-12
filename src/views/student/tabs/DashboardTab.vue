<script setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { goToPostTestStore, toastStore } from '@/store'
import axios from 'axios'

const route = useRoute()
const router = useRouter()

function reverseString(str) {
  let splitString = str.split('')
  let reverseArray = splitString.reverse()
  let joinArray = reverseArray.join('')
  return joinArray
}

const postTestEnabled = ref(null)
const postTestFinished = ref(null)
const scores = ref([])
const isLoading = ref(true)
onMounted(async () => {
  let sections
  let userSection = reverseString(localStorage.getItem('ncp_user_section'))

  await axios({
    method: 'get',
    url: `${import.meta.env.VITE_API_DOMAIN}/enable-post-test`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem('ncp_token')}`,
      Role: 'student'
    }
  })
    .then((res) => (sections = res.data))
    .then(async () => {
      await axios({
        method: 'get',
        url: `${import.meta.env.VITE_API_DOMAIN}/history/test/${route.params.userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('ncp_token')}`,
          Role: 'student'
        }
      }).then((res) => {
        let preTestData = res.data.find((item) => item.test_type === 'PRETEST')
        let postTestData = res.data.find((item) => item.test_type === 'POSTTEST')

        scores.value = {
          preTest: preTestData.score,
          postTest: postTestData !== undefined ? postTestData.score : null
        }
      })
    })
    .catch((err) => {
      if (err.response.status == 401) {
        Object.keys(localStorage).forEach(function (key) {
          if (/^ncp_/.test(key)) {
            localStorage.removeItem(key)
          }
        })

        router.push({ name: 'login' })
      } else {
        toastStore.add({
          msg: err.response.data,
          duration: 4000
        })
      }
    })
    .finally(() => (isLoading.value = false))

  postTestEnabled.value = sections[userSection]
  postTestFinished.value = JSON.parse(localStorage.getItem('ncp_finished_post_test'))
})

function readyPostTest() {
  goToPostTestStore.value = true
  router.push({ name: 'post-test' })
}

const postTestDialog = ref({
  state: false,
  toggle() {
    this.state = !this.state
  },
  confirm() {
    readyPostTest()
  }
})
</script>

<template>
  <div class="flex w-full flex-col gap-2 px-2 pb-2 sm:gap-4 lg:min-h-[560px] lg:grow lg:flex-row lg:pb-10 lg:pt-5 xl:px-24">
    <button
      @click="postTestDialog.toggle()"
      :disabled="!postTestEnabled || postTestFinished"
      class="group col-span-8 h-96 overflow-hidden rounded-2xl bg-[url('https://www.ucl.ac.uk/ioe/sites/ioe/files/styles/large_image/public/lilac-blouse-school-uniform.png?itok=KGavEVWp')] bg-cover bg-top shadow-lg sm:h-[560px] lg:h-full lg:basis-1/2"
    >
      <div
        v-if="isLoading"
        class="flex h-full w-full flex-row items-end justify-center gap-6 bg-gradient-to-t from-gray-950/50 to-transparent px-4 pb-16 group-disabled:bg-gradient-to-t group-disabled:from-gray-950/70 group-disabled:to-gray-950/40"
      >
        <p class="text-4xl font-medium leading-none text-blue-50 drop-shadow-md sm:text-5xl">Please wait</p>
        <VLoader size="30px" thickness="2px" class="md:hidden" />
        <VLoader size="48px" thickness="2px" class="hidden md:block" />
      </div>

      <div
        v-else-if="postTestFinished"
        class="flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-gray-950/50 to-transparent px-4 pb-16 group-disabled:bg-gradient-to-t group-disabled:from-gray-950/70 group-disabled:to-gray-950/40"
      >
        <p class="text-4xl font-medium leading-none text-blue-50 drop-shadow-md sm:text-5xl">Post Test Done</p>
        <p class="text-sm text-blue-50 drop-shadow-md sm:text-base">Thank you for participating</p>
      </div>

      <div
        v-else
        class="flex h-full w-full flex-col items-center justify-end bg-gradient-to-t from-gray-950/50 to-transparent px-4 pb-6 group-disabled:bg-gradient-to-t group-disabled:from-gray-950/70 group-disabled:to-gray-950/40 md:items-start md:px-10 md:py-10"
      >
        <p class="text-4xl font-medium leading-none text-blue-50 drop-shadow-md sm:text-5xl">Take the Post Test</p>
        <p v-if="!postTestEnabled" class="text-sm text-blue-50 drop-shadow-md sm:text-base">Please wait for your moderator to enable this</p>
        <p v-else class="text-sm text-blue-50 drop-shadow-md sm:text-base">Click Here</p>
      </div>
    </button>

    <!-- pre test and post test scores -->
    <div class="flex flex-col gap-2 sm:gap-4 lg:basis-1/2">
      <div class="flex h-44 w-full flex-col rounded-2xl border border-neutral-300 p-4 shadow-lg lg:h-auto lg:basis-1/2 lg:flex-col">
        <p class="text-2xl sm:text-3xl">Pre Test Score</p>
        <div class="flex grow items-center justify-center">
          <template v-if="isLoading">
            <VLoader size="30px" thickness="2px" class="md:hidden" />
            <VLoader size="48px" thickness="2px" class="hidden md:block" />
          </template>

          <div v-else-if="scores.preTest !== null" class="flex flex-row items-end gap-1">
            <p class="text-5xl font-bold sm:text-7xl sm:font-black lg:text-9xl">
              {{ scores.preTest.split('/')[0] }}
            </p>
            <p class="text-lg sm:pb-1 sm:text-xl lg:pb-4 lg:text-3xl">out of {{ scores.preTest.split('/')[1] }}</p>
          </div>
        </div>
      </div>

      <div class="flex h-44 w-full flex-col rounded-2xl border border-neutral-300 p-4 shadow-lg lg:h-auto lg:basis-1/2 lg:flex-col">
        <p class="text-2xl sm:text-3xl">Post Test Score</p>
        <div class="flex grow items-center justify-center">
          <template v-if="isLoading">
            <VLoader size="30px" thickness="2px" class="md:hidden" />
            <VLoader size="48px" thickness="2px" class="hidden md:block" />
          </template>

          <div v-else-if="scores.postTest !== null" class="flex flex-row items-end gap-1">
            <p class="text-5xl font-bold sm:text-7xl sm:font-black lg:text-9xl">
              {{ scores.postTest.split('/')[0] }}
            </p>
            <p class="text-lg sm:pb-1 sm:text-xl lg:pb-4 lg:text-3xl">out of {{ scores.postTest.split('/')[1] }}</p>
          </div>

          <p v-else class="text-3xl font-medium sm:text-4xl sm:font-semibold">Not yet taken</p>
        </div>
      </div>
    </div>

    <VDialog
      v-model:go-open="postTestDialog.state"
      header="Post Test"
      body="Ready to take the test?"
      cancel-label="No"
      confirm-label="Yes"
      @confirm="postTestDialog.confirm()"
    />
  </div>
</template>

<style scoped></style>

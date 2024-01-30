<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toastStore } from '@/store'

const router = useRouter()

const formValues = ref({
  email: null,
  password: null
})

const states = ref({
  email: {
    message: null,
    color: null
  },
  password: {
    message: null,
    color: null
  }
})

const isLoading = ref(false)
function submit() {
  isLoading.value = true
  states.value.email.message = null
  states.value.email.color = null
  states.value.password.message = null
  states.value.password.color = null

  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/user/login`, {
      email: formValues.value.email,
      password: formValues.value.password
    })
    .then((res) => {
      localStorage.setItem('ncp_user_id', res.data.userId)
      localStorage.setItem('ncp_user_email', res.data.email)
      localStorage.setItem('ncp_user_section', res.data.section)
      localStorage.setItem('ncp_token', res.data.token)
      localStorage.setItem('ncp_finished_pre_test', res.data.finishedPreTest)
      localStorage.setItem('ncp_finished_post_test', res.data.finishedPostTest)
      localStorage.setItem('ncp_finished_intro', res.data.finishedIntro)
      localStorage.setItem('ncp_pre_test_session', false)
      localStorage.setItem('ncp_post_test_session', false)
      localStorage.setItem('ncp_case_scenario_category', undefined)
      localStorage.setItem('ncp_case_scenario_number', undefined)
      localStorage.setItem('ncp_case_scenario_id', undefined)
      localStorage.setItem('ncp_case_scenario_session', false)
      localStorage.setItem('ncp_case_scenario_step', 1)
      localStorage.setItem(
        'ncp_case_scenario_answers',
        JSON.stringify({
          subjective: null,
          objective: [],
          diagnosis: null,
          relatedTo: null,
          signsAndSymptoms: [],
          shortTermGoal: [],
          longTermGoal: [],
          independent: [],
          dependent: [],
          collaborative: []
        })
      )
      router.push({ name: 'introduction' })
      toastStore.add({
        msg: 'Successfully logged in',
        duration: 2000
      })
    })
    .catch((err) => {
      isLoading.value = false
      if (err.response.data.message === 'Account not yet approved.' || err.response.status === 401 || err.response.status === 400) {
        states.value.email.message = err.response.data.message
        states.value.email.color = 'error'
        states.value.password.message = null
        states.value.password.color = 'error'
      } else if (err.response.data.message === 'Wrong password!') {
        states.value.email.message = null
        states.value.email.color = null
        states.value.password.message = err.response.data.message
        states.value.password.color = 'error'
      } else {
        toastStore.add({
          msg: err.response.data,
          duration: 4000
        })
      }
    })
}
</script>

<template>
  <div class="flex h-[100svh] flex-col justify-end bg-gradient-to-b from-blue-300 to-blue-500 sm:items-center sm:justify-center">
    <div class="flex w-full flex-col gap-2 sm:max-w-[600px] sm:p-4">
      <h1 class="px-4 drop-shadow-lg">Welcome to TakeCare</h1>

      <!-- login form -->
      <form @submit.prevent="submit()" class="flex w-full flex-col gap-2 rounded-t-2xl bg-blue-50 px-4 py-4 sm:rounded-2xl">
        <VFormTextbox
          v-model="formValues.email"
          :color="states.email.color"
          :sub-label="states.email.message"
          label="Email"
          type="email"
          autocomplete="username"
          required
        />
        <VFormTextbox
          v-model="formValues.password"
          :color="states.password.color"
          :sub-label="states.password.message"
          label="Password"
          type="password"
          autocomplete="current-password"
          required
        />

        <VButton :disabled="isLoading" class="justify-center">
          <VLoader v-if="isLoading" size="16px" thickness="2px" />
          <span v-else>Login</span>
        </VButton>
        <div class="text-right text-sm lg:text-base">
          Don't have an account?
          <VLinkButton :to="{ name: 'signup' }"> Create one </VLinkButton>
        </div>
      </form>
    </div>
  </div>
</template>

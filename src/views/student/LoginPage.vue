<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { toastStore } from '@/store'

const router = useRouter()

const formValues = reactive({
  email: null,
  password: null
})
const states = reactive({
  email: {
    message: null,
    color: null
  },
  password: {
    message: null,
    color: null
  }
})
const submit = () => {
  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/user/login`, {
      email: formValues.email,
      password: formValues.password
    })
    .then((res) => {
      localStorage.setItem('ncp_user_id', res.data.userId)
      localStorage.setItem('ncp_user_section', res.data.section)
      localStorage.setItem('ncp_token', res.data.token)
      localStorage.setItem('ncp_finished_pre_test', res.data.finishedPreTest)
      localStorage.setItem('ncp_finished_post_test', res.data.finishedPostTest)
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
          nursingDiagnosis: null,
          shortTermGoal: [],
          longTermGoal: [],
          independent: [],
          dependent: []
        })
      )

      router.push({ name: 'introduction' })

      toastStore.add({
        msg: 'Successfully logged in.',
        duration: 2000
      })
    })
    .catch((err) => {
      if (err.response.data.message === 'Account not yet approved.' || err.response.status === 401) {
        states.email.message = err.response.data.message
        states.email.color = 'error'
        states.password.message = null
        states.password.color = 'error'
      } else if (err.response.data.message === 'Wrong password!') {
        states.email.message = null
        states.email.color = null
        states.password.message = err.response.data.message
        states.password.color = 'error'
      }
    })
}
</script>

<template>
  <div class="flex h-[100svh] flex-col justify-end gap-2 bg-gradient-to-b from-blue-300 to-blue-500">
    <h1 class="px-4">Login Page</h1>

    <!-- login form -->
    <form @submit.prevent="submit()" class="flex w-screen flex-col gap-2 rounded-t-2xl bg-blue-50 px-4 py-4">
      <VFormTextbox v-model="formValues.email" :color="states.email.color" label="Email" :sub-label="states.email.message" type="email" required />
      <VFormTextbox
        v-model="formValues.password"
        :color="states.password.color"
        label="Password"
        :sub-label="states.password.message"
        type="password"
        required
      />

      <VButton class="justify-center"> Login </VButton>
      <div class="text-right text-sm">
        Don't have an account?
        <VLinkButton :to="{ name: 'signup' }"> Create one </VLinkButton>
      </div>
    </form>
  </div>
</template>

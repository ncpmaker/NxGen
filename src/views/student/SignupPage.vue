<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { toastStore } from '@/store'
import axios from 'axios'

const router = useRouter()

const tacModal = ref(false)
const isAgreeing = ref(false)
const formValues = ref({
  email: null,
  password: null,
  confirmPassword: null,
  firstName: null,
  lastName: null,
  section: '1A'
})

const states = ref({
  email: {
    message: null,
    color: null
  },
  password: {
    color: null
  },
  confirmPassword: {
    message: null,
    color: null
  }
})

const isLoading = ref(false)
function submit() {
  if (formValues.value.password === formValues.value.confirmPassword) {
    isLoading.value = true
    states.value.email.message = null
    states.value.email.color = null
    states.value.password.color = null
    states.value.confirmPassword.message = null
    states.value.confirmPassword.color = null

    axios
      .post(`${import.meta.env.VITE_API_DOMAIN}/user/create`, {
        email: formValues.value.email,
        password: formValues.value.password,
        name: formValues.value.firstName + ' ' + formValues.value.lastName,
        section: formValues.value.section
      })
      .then(() => {
        toastStore.add({
          msg: 'Account created successfully',
          duration: 2000
        })

        toastStore.add({
          msg: 'Please wait for the account approval',
          duration: 4000
        })

        router.push({ name: 'login' })
      })
      .catch((err) => {
        if (err.response.status === 409) {
          toastStore.add({
            msg: 'An error occured!',
            duration: 2000
          })

          states.value.email.message = 'Email is already used'
          states.value.email.color = 'error'
        } else {
          toastStore.add({
            msg: err.response.message,
            duration: 4000
          })
        }
        isLoading.value = false
      })
  } else {
    states.value.password.color = 'error'
    states.value.confirmPassword.message = 'Passwords are not the same'
    states.value.confirmPassword.color = 'error'
  }
}
</script>

<template>
  <div class="flex h-[100svh] flex-col justify-end bg-gradient-to-b from-blue-300 to-blue-500 sm:items-center sm:justify-center">
    <div class="flex w-full flex-col gap-2 sm:max-w-[600px] sm:p-4">
      <h1 class="px-4 drop-shadow-lg">Create an account</h1>
      <form @submit.prevent="submit()" class="flex w-full flex-col gap-2 overflow-hidden rounded-t-2xl bg-blue-50 pb-4 sm:rounded-2xl">
        <div class="flex max-h-[360px] flex-col gap-2 overflow-y-auto px-4 pt-6 sm:max-h-[calc(480px-72pxpx)]">
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
            label="Password"
            type="password"
            autocomplete="new-password"
            required
          />
          <VFormTextbox
            v-model="formValues.confirmPassword"
            :color="states.confirmPassword.color"
            :sub-label="states.confirmPassword.message"
            label="Confirm Password"
            type="password"
            autocomplete="new-password"
            required
          />
          <div class="flex flex-col gap-2 sm:flex-row sm:items-center">
            <VFormTextbox v-model="formValues.firstName" label="First Name" type="text" class="sm:w-full" required />
            <VFormTextbox v-model="formValues.lastName" label="Last Name" type="text" class="sm:w-full" required />
          </div>
          <VSelect v-model="formValues.section" label="Class Section" :options="['1A', '1B', '1C', '1D']" />
        </div>

        <div class="flex flex-col gap-2 px-4">
          <!-- Terms and conditions -->
          <div class="flex flex-row gap-1 text-sm">
            <input v-model="isAgreeing" type="checkbox" class="cursor-pointer" />
            I Agree to the
            <VLinkButton variant="button" type="button" @click="tacModal = !tacModal"> Terms and Conditions </VLinkButton>
          </div>

          <VButton :disabled="!isAgreeing || isLoading" type="submit" class="justify-center">
            <VLoader v-if="isLoading" size="16px" thickness="2px" />
            <span v-else>Create Account</span>
          </VButton>

          <div class="text-right text-sm lg:text-base">
            Already have and account?
            <VLinkButton :to="{ name: 'login' }"> Login here </VLinkButton>
          </div>
        </div>
      </form>
    </div>
  </div>

  <!-- Terms and conditions modal -->
  <VModal v-model:go-open="tacModal" :click-outside="false">
    <div class="flex flex-col gap-2 p-4">
      <h1>Terms and Conditions</h1>
      <div class="max-h-[400px] overflow-y-auto">
        Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum
        asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd
        askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd Lorem ipsum asjkdhaksdhk askdhaksjd askdhasjkhdjkasd
      </div>
      <VButton @click="tacModal = !tacModal" type="button" class="justify-center"> Close </VButton>
    </div>
  </VModal>
</template>

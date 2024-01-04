<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { toastStore } from '@/store'
import axios from 'axios'

const router = useRouter()

const tacModal = ref(false)
const isAgreeing = ref(false)
const formValues = reactive({
  email: null,
  password: null,
  confirmPassword: null,
  firstName: null,
  lastName: null,
  section: null
})
const states = reactive({
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
function submit() {
  if (formValues.password === formValues.confirmPassword) {
    axios
      .post(`${import.meta.env.VITE_API_DOMAIN}/user/create`, {
        email: formValues.email,
        password: formValues.password,
        name: formValues.firstName + ' ' + formValues.lastName,
        section: formValues.section
      })
      .then(() => {
        toastStore.add({
          msg: 'Account created successfully.',
          duration: 2000
        })

        toastStore.add({
          msg: 'Please wait for the account approval.',
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

          states.email.message = 'User already exists!'
          states.email.color = 'error'
        } else {
          toastStore.add({
            msg: err.response.message,
            duration: 4000
          })
        }
      })
  } else {
    states.password.color = 'error'
    states.confirmPassword.message = 'Passwords are not the same!'
    states.confirmPassword.color = 'error'
  }
}
</script>

<template>
  <div class="flex h-[100svh] flex-col justify-end gap-2 bg-blue-300">
    <h1 class="px-4">Signup Page</h1>
    <form @submit.prevent="submit()" class="flex w-screen flex-col gap-2 overflow-hidden rounded-t-2xl bg-blue-50 pb-4">
      <div class="flex max-h-[calc(480px-120px)] flex-col gap-2 overflow-y-auto px-4 pt-6">
        <VFormTextbox v-model="formValues.email" :color="states.email.color" :sub-label="states.email.message" label="Email" type="email" required />
        <VFormTextbox v-model="formValues.password" :color="states.password.color" label="Password" type="password" required />
        <VFormTextbox
          v-model="formValues.confirmPassword"
          :color="states.confirmPassword.color"
          :sub-label="states.confirmPassword.message"
          label="Confirm Password"
          type="password"
          required
        />
        <VFormTextbox v-model="formValues.firstName" label="First Name" type="text" required />
        <VFormTextbox v-model="formValues.lastName" label="Last Name" type="text" required />
        <VSelect v-model="formValues.section" label="Class Section" :options="['1A', '1B', '1C', '1D']" />
      </div>

      <div class="flex flex-col gap-2 px-4">
        <div class="flex flex-row gap-1 text-sm">
          <input type="checkbox" v-model="isAgreeing" />
          I Agree to the
          <VLinkButton variant="button" type="button" @click="tacModal = !tacModal"> Terms and Conditions </VLinkButton>
        </div>

        <VButton :disabled="!isAgreeing" type="submit" class="justify-center"> Create Account </VButton>

        <div class="text-right text-sm">
          Already have and account?
          <VLinkButton :to="{ name: 'login' }"> Login here </VLinkButton>
        </div>
      </div>
    </form>
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

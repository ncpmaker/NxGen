<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const tacModal = ref(false)
const isAgreeing = ref(false)

function onSubmit() {
  console.log('user created an account')
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="flex h-[100svh] flex-col justify-end gap-2 bg-blue-300">
    <h1 class="px-4">Signup Page</h1>
    <form @submit.prevent="onSubmit()" class="flex w-screen flex-col gap-2 overflow-hidden rounded-t-2xl bg-blue-50 pb-4">
      <div class="flex max-h-[calc(480px-120px)] flex-col gap-2 overflow-y-auto px-4 pt-6">
        <VFormTextbox label="Email" name="email" type="email" />
        <VFormTextbox label="Password" name="password" type="password" />
        <VFormTextbox label="Confirm Password" name="confirm_password" type="password" />
        <VFormTextbox label="First Name" name="first_name" type="text" />
        <VFormTextbox label="Last Name" name="last_name" type="text" />
        <VSelect label="Class Section" name="class_section" :options="['1A', '1B', '1C', '1D']" />
      </div>

      <div class="flex flex-col gap-2 px-4">
        <div class="flex flex-row gap-1 text-sm">
          <input type="checkbox" v-model="isAgreeing" />
          I Agree to the
          <VLinkButton variant="button" type="button" @click="tacModal = !tacModal"> Terms and Conditions </VLinkButton>
        </div>

        <VButton :disabled="!isAgreeing" class="justify-center"> Create Account </VButton>

        <div class="text-right text-sm">
          Already have and account?
          <VLinkButton :to="{ name: 'login' }"> Login here </VLinkButton>
        </div>
      </div>
    </form>
  </div>

  <!-- Terms and conditions modal -->
  <VModal v-model:go-open="tacModal" :click-outside="false">
    <div class="flex flex-col gap-2">
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

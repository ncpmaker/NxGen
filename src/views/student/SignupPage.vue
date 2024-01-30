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
    <div class="flex flex-col gap-2 overflow-hidden">
      <div class="overflow-y-auto px-4">
        <h1 class="sticky top-0 bg-blue-50 pt-4">Terms and Conditions</h1>
        <div class="flex max-h-[400px] flex-col gap-4 text-justify">
          <div>
            <h3><b>1. Acceptance of Terms</b></h3>
            <p class="pl-5">
              By accessing and utilizing the NCP WISE Web Application, you explicitly acknowledge and agree to adhere to the terms and conditions
              outlined herein. Your continued use of the NCP WISE web app indicates your acceptance and understanding of these terms, forming a legally
              binding agreement between you and the service provider. It is imperative that you carefully read and comprehend the terms before accessing
              or using the application.
            </p>
          </div>
          <div>
            <h3><b>2. User Eligibility</b></h3>
            <p class="pl-5">
              To utilize this service, it is essential that you are a currently enrolled student of Bulacan State University - College of Nursing (Main
              Campus). By engaging with the app, you confirm that you meet this criterion and possess the necessary licensing and authorization. This
              requirement ensures that the features and information provided are tailored to the specific educational context and regulatory standards
              of the College of Nursing at Bulacan State University.
            </p>
          </div>
          <div>
            <h3><b>3. Privacy Policy</b></h3>
            <div class="flex flex-col gap-4 pl-5">
              <p>
                Our privacy policy outlines how we collect, use, and protect your personal information. Please review it to understand our practices.
              </p>
              <p class="pl-5">
                Welcome to our NCP WISE web app's Privacy Policy. This document aims to explain, in clear terms, how we collect, use, and safeguard your
                personal information. We value your privacy, and by using our app, you are agreeing to the practices outlined below.
              </p>
              <ul class="list-disc pl-10">
                <li>
                  <p><b>Information we collect</b></p>
                  <p>
                    We may collect personal information such as your name, contact details, and professional credentials. This information is essential
                    to customize and enhance your experience with the care plan generator.
                  </p>
                </li>
                <li>
                  <p><b>How We Use Your Information</b></p>
                  <p>
                    Your personal information is used to tailor care plans to your specific needs and qualifications. We may also use it to improve our
                    services, send important notifications, and ensure the security of your account.
                  </p>
                </li>
                <li>
                  <p><b>Data Security</b></p>
                  <p>
                    We take the security of your information seriously. Our app employs industry-standard measures to protect against unauthorized
                    access, disclosure, alteration, and destruction of your personal data.
                  </p>
                </li>
                <li>
                  <p><b>Third-Party Services</b></p>
                  <p>
                    In some instances, we may use third-party services to enhance app functionality. These services adhere to their own privacy
                    policies, and we encourage you to review them for a comprehensive understanding.
                  </p>
                </li>
                <li>
                  <p><b>Cookie Policy</b></p>
                  <p>
                    Our app may use cookies to enhance your user experience. These cookies are small text files stored on your device that help us
                    analyze usage patterns and improve our services. You can control cookie settings in your browser.
                  </p>
                </li>
                <li>
                  <p><b>Data Retention</b></p>
                  <p>
                    We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy. You may
                    request the deletion of your account and associated data at any time.
                  </p>
                </li>
                <li>
                  <p><b>Updates to Privacy Policy</b></p>
                  <p>
                    As our app evolves, so may our Privacy Policy. We will notify you of any significant changes, but we encourage you to review this
                    policy periodically to stay informed.
                  </p>
                </li>
                <li>
                  <p><b>User Control and Choices</b></p>
                  <p>
                    You have control over the personal information you provide. You can update, correct, or delete your information by accessing your
                    account settings. If you have any concerns, please contact us through the provided channels.
                    <br /><br />
                    By using our NCP WISE web app, you acknowledge that you have read and understood this Privacy Policy. If you have any questions or
                    concerns, please contact us at [contact email]. Your privacy is of utmost importance to us, and we are committed to maintaining the
                    trust you place in our services.
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3><b>4. Accuracy of Information</b></h3>
            <p class="pl-5">
              While we make every effort to ensure the precision of the care plans generated by the app, it's important to note that these plans are not
              a replacement for professional judgment. Our goal is to provide helpful and reliable information, but users must recognize the inherent
              limitations and consider them as supplementary tools rather than exhaustive solutions.
              <br /><br />
              Users bear the responsibility of validating and interpreting the information generated by the app. This involves cross-referencing with
              current medical standards, consulting with other healthcare professionals, and applying their own clinical expertise. It is crucial to
              acknowledge that the app is a support tool, and individual patient circumstances may necessitate adjustments to the provided care plans.
              <br /><br />
              In summary, while we aim for accuracy, users play a pivotal role in the validation and interpretation process, ensuring that the generated
              care plans align with the specific needs and conditions of each patient under their care.
            </p>
          </div>
          <div>
            <h3><b>5. User Account</b></h3>
            <p class="pl-5">
              To access specific features, you'll need to create a personal account. It's important that you take responsibility for keeping your
              account information confidential. This means safeguarding your login details and not sharing them with others. If you notice any
              suspicious activity, promptly notify us to ensure the security of your account.
            </p>
          </div>
          <div>
            <h3><b>6. Prohibited Activities</b></h3>
            <p class="pl-5">
              Users are strictly prohibited from engaging in any activities that are unlawful, harmful, or in violation of ethical standards when
              utilizing the app. Such prohibited activities include, but are not limited to, any form of unauthorized access, data manipulation, or
              attempts to compromise the security of the application. Any violation of these terms may lead to the immediate termination of user access
              to the app. We emphasize the importance of using the app responsibly and ethically to maintain a secure and positive environment for all
              users.
            </p>
          </div>
          <div>
            <h3><b>7. Intellectual Property</b></h3>
            <p class="pl-5">
              The content and materials within this app, including but not limited to text, graphics, images, and software, are either owned or licensed
              by us. Users are granted a limited, non-exclusive, and non-transferable license, meaning you have permission to use the app within the
              scope of its intended purpose. This license doesn't allow you to transfer or sublicense the app to others. It's a limited, personal right
              that ensures you can access and utilize the features provided by the app for your individual use. Any unauthorized distribution,
              reproduction, or modification of the app's content is strictly prohibited.
            </p>
          </div>
          <div>
            <h3><b>8. Intellectual Property</b></h3>
            <p class="pl-5">
              We retain the right to terminate or suspend services without prior notice, for any reason deemed necessary. However, we strive to provide
              transparency and fairness in such circumstances.
            </p>
          </div>
          <div>
            <h3><b>9. Limitation of Liability</b></h3>
            <p class="pl-5">
              We want to emphasize that we cannot be held responsible for any direct, indirect, incidental, or consequential damages resulting from the
              use or inability to use the app. Users are encouraged to exercise their professional judgment alongside the app's outputs.
            </p>
          </div>
          <div>
            <h3><b>10. Modifications to Terms</b></h3>
            <p class="pl-5">
              To enhance the user experience and align with any legal developments, we may periodically update these terms. Your continued use of the
              app post-changes signifies acceptance of the updated terms.
            </p>
          </div>
          <div>
            <h3><b>11. Governing Law</b></h3>
            <p class="pl-5">
              These terms are anchored in adherence to the legal framework established by the regulations and statutes of the Bulacan State University -
              College of Nursing (Main Campus). Our commitment is to operate in alignment with the guidelines set forth by this esteemed institution,
              ensuring a harmonious integration of our services within the educational and regulatory landscape.
            </p>
          </div>
          <div>
            <h3><b>12. Contact Information</b></h3>
            <p class="pl-5">
              Should you have any questions or concerns about these terms, please reach out to us at ncpmaker@gmail.com. We value your feedback and are
              committed to addressing any inquiries promptly.
            </p>
          </div>
        </div>
      </div>
      <div class="px-4 pb-4">
        <VButton @click="tacModal = !tacModal" type="button" class="w-full justify-center"> Close </VButton>
      </div>
    </div>
  </VModal>
</template>

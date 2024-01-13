<script setup>
import { ref } from 'vue'
// import temp from '@/temp'
import axios from 'axios'
import { studentTabStore, toastStore } from '@/store'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const questionsAndAnswers = JSON.parse(import.meta.env.VITE_TEST_QUESTIONS)

// console.log(JSON.stringify(temp))
// console.log(temp)

function testScore(answers) {
  let totalCorrectItems = 0
  let correctAnswers = 0

  /*
   * This lets me check dynamically kung ilan yung total correct items sa test
   */
  questionsAndAnswers.forEach((question) => {
    question.possibleAnswers.forEach((answer) => {
      if (answer.isCorrect) {
        totalCorrectItems++
      } else if (correctAnswers > 0) {
        correctAnswers--
      }
    })
  })

  /*
   * This part is a mess
   * Yung mahabang part, ang nagagawa non eh nakukuha nya yung value ng isCorrect from
   * possibleAnswers based sa index ng answer
   */
  Object.values(answers).forEach((answer, index) => {
    if (Array.isArray(answer)) {
      answer.forEach((answer) => {
        let answerIsCorrect =
          questionsAndAnswers[index].possibleAnswers[questionsAndAnswers[index].possibleAnswers.map((e) => e.text).indexOf(answer)].isCorrect
        if (answerIsCorrect) {
          correctAnswers++
        } else if (correctAnswers > 0) {
          correctAnswers--
        }
      })
    } else {
      let answerIsCorrect =
        questionsAndAnswers[index].possibleAnswers[questionsAndAnswers[index].possibleAnswers.map((e) => e.text).indexOf(answer)].isCorrect
      if (answerIsCorrect) {
        correctAnswers++
      } else if (correctAnswers > 0) {
        correctAnswers--
      }
    }
  })

  return `${correctAnswers}/${totalCorrectItems}`
}

function formatAnswers(answers) {
  let formattedAnswers = []

  Object.values(answers).forEach((answer, index) => {
    formattedAnswers.push({
      question: questionsAndAnswers[index].question,
      answer: answer
    })
  })

  return formattedAnswers
}

const formRef = ref(null)
const isLoading = ref(false)
function submit() {
  isLoading.value = true
  const formData = new FormData(formRef.value)
  const formDataObj = {}

  //get all multiple answer type questions
  let mulTypeQuestions = []
  questionsAndAnswers.forEach((question, index) => {
    if (question.type === 'multiple') {
      mulTypeQuestions.push(index)
    }
  })

  formData.forEach((value, key) => {
    mulTypeQuestions.forEach((number) => {
      if (key === `question_${number + 1}`) {
        //check if a question has multiple answers
        formDataObj[key] = formData.getAll(key)
      } else {
        formDataObj[key] = value
      }
    })
  })

  axios
    .post(`${import.meta.env.VITE_API_DOMAIN}/test-history/create`, {
      userId: localStorage.getItem('ncp_user_id'),
      testType: route.name === 'pre-test' ? 'PRETEST' : route.name === 'post-test' ? 'POSTTEST' : '',
      answers: formatAnswers(formDataObj),
      score: testScore(formDataObj)
    })
    .then(() => {
      studentTabStore.set(0)

      if (route.name === 'pre-test') {
        localStorage.setItem('ncp_finished_pre_test', true)
        localStorage.setItem('ncp_pre_test_session', false)
        toastStore.add({
          msg: 'Pre test successfully submitted',
          duration: 4000
        })
      } else if (route.name === 'post-test') {
        localStorage.setItem('ncp_finished_post_test', true)
        localStorage.setItem('ncp_post_test_session', false)
        toastStore.add({
          msg: 'Post test successfully submitted',
          duration: 4000
        })
      }

      router.push({ name: 'home', params: { userId: localStorage.getItem('ncp_user_id') } })
    })
}
</script>

<template>
  <form @submit.prevent="submit()" ref="formRef" class="flex h-[100svh] flex-col">
    <div class="sticky top-0 z-10 bg-blue-50 px-4 pb-4 pt-6">
      <h1 v-if="$route.name === 'pre-test'">Pre Test</h1>
      <h1 v-else-if="$route.name === 'post-test'">Post Test</h1>
    </div>

    <div class="flex grow flex-col overflow-y-auto px-4 pb-4">
      <div v-for="(item, index) in questionsAndAnswers" :key="index" class="flex flex-col">
        <span>{{ `${index + 1}. ${item.question}` }}</span>
        <div clas="flex flex-col gap-1">
          <label
            v-for="(answer, subIndex) in item.possibleAnswers"
            :key="subIndex"
            class="flex cursor-pointer flex-row items-center gap-4 rounded-xl px-2 py-1 transition-colors hover:bg-blue-100"
          >
            <input v-if="item.type === 'single'" type="radio" :name="`question_${index + 1}`" required :value="answer.text" />
            <input v-else-if="item.type === 'multiple'" type="checkbox" :name="`question_${index + 1}`" :value="answer.text" />
            {{ answer.text }}.
          </label>
        </div>
        <hr class="mx-2 my-6 border-neutral-300" />
      </div>
    </div>

    <div class="p-2">
      <VButton :disabled="isLoading" type="submit" class="w-full justify-center">
        <VLoader v-if="isLoading" size="16px" thickness="2px" />
        <span v-else>Submit</span>
      </VButton>
    </div>
  </form>
</template>

<style scoped></style>

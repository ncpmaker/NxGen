import { reactive, ref } from 'vue'

export const toastStore = reactive({
  list: [],
  add(params) {
    this.list.push(params)
  }
})

export const studentTabStore = reactive({
  index: 0,
  set(number = 0) {
    this.index = number
  }
})

export const adminTabStore = reactive({
  index: 0,
  set(number = 0) {
    this.index = number
  }
})

export const goToPostTestStore = ref(false)

export const taskStore = reactive({
  preTest: false,
  postTest: false,
  caseScenario: false
})

export const scrollStore = ref(null)

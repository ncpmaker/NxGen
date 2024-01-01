import { reactive } from 'vue'

export const toastStore = reactive({
  list: [],
  add(params) {
    console.log(params)
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

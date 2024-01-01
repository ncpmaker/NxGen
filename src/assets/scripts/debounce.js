export default function debounce(mainFunction, wait = 500) {
  let timer

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      mainFunction(...args)
    }, wait)
  }
}

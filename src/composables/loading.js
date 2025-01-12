import { onMounted } from 'vue'

export const useLoading = () => {
  let overlay = null

  onMounted(() => {
    overlay = document.getElementById('global-loading-overlay')
  })

  const show = () => {
    overlay.style.display = 'flex'
  }

  const hide = () => {
    overlay.style.display = 'none'
  }

  return { show, hide }
}
